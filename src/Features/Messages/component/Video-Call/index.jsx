import { Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import storageKeys from "../../../../constants/storage-keys";
import "./index.scss";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
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

  // const [closeStream,setCloseStrem]=useState(false)

  //video logic
  let myVideo = useRef();
  let userVideo = useRef();
  let connectionRef = useRef();
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
    peer.on("signal", (data) => {
      (async () => {
        const id1 = localStorage.getItem(storageKeys.USER);
        const response = await messengerApi.getUser(JSON.parse(id1));
        socketRef.current.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: JSON.parse(id1),
          name: response.data.user.name,
        });
      })();
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socketRef.current.on("callAccepted", (signal) => {
      setTextCalling("");
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }

  const answerCall = () => {
    setCallAccepted(true);
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

  function muteMic() {
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
  }

  function muteCam() {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
  }

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#fff" }}>WeChat</h3>
      <div className="video_container">
        <div className="video video_user1">
          <VideocamIcon className="icon-media icon-video" onClick={muteCam} />
          <KeyboardVoiceIcon
            className="icon-media icon-micro"
            onClick={muteMic}
          />
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
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                Kết thúc
              </Button>
            ) : !receivingCall && showPhone ? (
              <>
                <IconButton
                  color="primary"
                  aria-label="call"
                  onClick={() => {
                    setTextCalling("Dang goi.....");
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
          {!callAccepted && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                socketRef.current.emit("callEnded");
                window.location.reload();
              }}
            >
              Rời khỏi
            </Button>
          )}
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Video;
