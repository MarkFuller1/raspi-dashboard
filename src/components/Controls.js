import { Button, Grid} from "@mui/material";
import { React } from "react";
import * as API from "../util/api";

export const Controls = (props) => {
  console.log("Loading logs for node", props.node);

  const startTimer = () => {
    API.startTimer(props.node);
  };

  const setTimer= () => {
    API.setTimer(props.node);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <Button onClick={setTimer}>Set 20 sec timer</Button>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Button onClick={startTimer}>Start</Button>
      </Grid>
    </Grid>
  );
};
