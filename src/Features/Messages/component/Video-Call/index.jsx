import { Grid } from "@mui/material";
import React from "react";

function Video(props) {
  return (
    <Grid container spacing={2} >
      <Grid item xs={5}>
        nguoi 1
      </Grid>
      <Grid item xs={5}>
        nguoi 2
      </Grid>
      <Grid item xs={12}>
        dieu khien
      </Grid>
    </Grid>
  );
}

export default Video;
