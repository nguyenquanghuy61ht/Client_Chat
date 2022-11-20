import { Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import storageKeys from "../../../../constants/storage-keys";
import "./index.scss";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";

import messengerApi from "../../../../api/messengerApi";

function Video({ userId2, socketRef, open2 }) {
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [TextCalling, setTextCalling] = useState("");
  const [showPhone, setshowPhone] = useState(true);
  const [onOfVideo, setOnOfVideo] = useState(true);
  const [onOfMic, setOnOfMic] = useState(true);

  // const [closeStream,setCloseStrem]=useState(false)

  //video logic
  let myVideo = useRef();
  let userVideo = useRef();
  let connectionRef = useRef();
  let TimeFeedBack = useRef();
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;

        // socketRef.current.on("me", (id) => {
        //   setMe(id);
        // });

        socketRef.current.on("callUser", (data) => {
          if (data) {
            TimeFeedBack.current = setTimeout(async () => {
              const id1 = localStorage.getItem(storageKeys.USER);
              const response = await messengerApi.getUser(JSON.parse(id1));
              socketRef.current.emit(
                "feedback",
                `${response.data.user.name} Không nghe máy`
              );
              window.location.reload();
            }, 15000);
          }
          setReceivingCall(true);
          setCaller(data.from);
          setName(data.name);
          setCallerSignal(data.signal);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUserMedia();
  }, []);

  function callUser(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", async (data) => {
      const id1 = localStorage.getItem(storageKeys.USER);
      const response = await messengerApi.getUser(JSON.parse(id1));
      socketRef.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: JSON.parse(id1),
        name: response.data.user.name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socketRef.current.on("callAccepted", (signal) => {
      setTextCalling("");
      setCallAccepted(true);
      peer.signal(signal);
    });

    socketRef.current.on("feedback", (about) => {
      setTextCalling(about);
    });

    connectionRef.current = peer;
  }

  const answerCall = () => {
    setCallAccepted(true);
    socketRef.current.emit("feedback", "");
    clearTimeout(TimeFeedBack.current); //neu nguoi dung nhan chap nhan cuoc goi thi phai tat hen gio di
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log(data);
      socketRef.current.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    console.log(caller);
    socketRef.current.emit("callEnded");
    setTextCalling("");
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  useEffect(() => {
    socketRef.current.on("callEnded", (data) => {
      console.log(data);
      setTextCalling("");
      setCallEnded(true);
      connectionRef.current.destroy();
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await messengerApi.getUser(userId2);
      setName(response.data.user.name);
    })();
  }, [userId2]);

  function muteMic() {
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setOnOfMic(!onOfMic);
  }

  function muteCam() {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setOnOfVideo(!onOfVideo);
  }

  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          color: "#51C332",
          marginBottom: 0,
          marginRight: "17px",
        }}
      >
        WeChat
      </h3>
      <div className="video_container">
        <div className="video video_user1">
          {onOfVideo ? (
            <VideocamIcon className="icon-media icon-video" onClick={muteCam} />
          ) : (
            <VideocamOffIcon
              className="icon-media icon-video"
              onClick={muteCam}
              sx={{ color: "red" }}
            />
          )}
          {onOfMic ? (
            <KeyboardVoiceIcon
              className="icon-media icon-micro"
              onClick={muteMic}
            />
          ) : (
            <MicOffIcon
              className="icon-media icon-micro"
              onClick={muteMic}
              sx={{ color: "red" }}
            />
          )}

          <span style={{ fontWeight: 500 }}>Bạn</span>
          <br />
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "280px" }}
          />
        </div>
        <div className="video video_user2">
          {callAccepted && !callEnded ? (
            <>
              <span style={{ fontWeight: 500 }}>{name}</span>
              <br />
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "280px" }}
              />
            </>
          ) : null}
        </div>
      </div>
      <div className="container">
        <div className="myId">
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="error" onClick={leaveCall}>
                Kết thúc
              </Button>
            ) : !receivingCall && showPhone ? (
              <>
                <IconButton
                  color="primary"
                  aria-label="call"
                  onClick={() => {
                    setTextCalling(`Đang gọi cho ${name}.....`);
                    socketRef.current.emit("OpenForm", {
                      to: userId2,
                    });
                    callUser(userId2);
                    setshowPhone(false);
                  }}
                >
                  <PhoneIcon fontSize="large" />
                </IconButton>
              </>
            ) : (
              <>
                {" "}
                <br />
                <span>{TextCalling}</span>
              </>
            )}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <h2>{name} đang gọi đến...</h2>
          ) : null}
          <div className="controller">
            {!callAccepted && (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  socketRef.current.emit("callEnded");
                  window.location.reload();
                }}
              >
                Rời khỏi
              </Button>
            )}
            {receivingCall && !callAccepted ? (
              <div className="caller">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ ml: 2 }}
                  onClick={answerCall}
                >
                  Chấp nhận
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
