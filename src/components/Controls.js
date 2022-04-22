import { Button, Grid} from "@mui/material";
import { React } from "react";
import * as API from "../util/api";

export const Controls = (props) => {
  console.log("Loading logs for node", props.node);

  const startTimer = () => {
    API.startTimer(props.node.ip);
  };

  const setTimer= () => {
    API.setTimer(props.node.ip);
  };

  const stopTimer = () => {
    API.stopTimer(props.node.ip);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <Button onClick={setTimer}>Set 20 sec timer</Button>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Button onClick={startTimer}>Start</Button>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Button onClick={stopTimer}>Stop</Button>
      </Grid>
    </Grid>
  );
};
