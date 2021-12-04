import { React, useEffect, useState } from "react";
import logo from "./Title.png";
import * as API from "../util/api";
import {
  Paper,
  AppBar,
  Typography,
  Avatar,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { Logs } from "../components/Logs";
import { Controls } from "../components/Controls";

export const Dash = () => {
  const [nodes, setNodes] = useState([]);
  const [nodeStatesLoading, setNodeStatesLoading] = useState(false);
  const [filteredNodes, setFilteredNodes] = useState(
    nodes.filter((node) => !node.state.includes("LOST"))
  );

  console.log("Filtered nodes after state set:", filteredNodes);

  useEffect(() => {
    async function fetchData() {
      let result = await API.getAllIps();
      console.log("Got all nodes with status", result.data);
      setNodes(result.data);
    }
    fetchData();
  }, [nodeStatesLoading]);

  useEffect(() => {
    setFilteredNodes(nodes.filter((node) => !node.state.includes("LOST")));
  }, [nodes]);

  const toggleLoadStateLoading = () => {
    setNodeStatesLoading((oldState) => {
      if (oldState) {
        return false;
      }
      API.refreshActiveNodes().then((result) => {
        console.log("Finished refreshing nodes", result)
        toggleLoadStateLoading();
      });
      return true;
    });
  };

  const conditionalColor = (n) => {
    if (n.state.includes("LOST")) {
      return (
        <font color="red">
          <h3>
            <s>{n.ip}</s>
          </h3>
        </font>
      );
    } else {
      return (
        <font color="green">
          <h3>{n.ip}</h3>
        </font>
      );
    }
  };

  const LoadingRender = (props) => {
    if (props.isLoading) {
      return <CircularProgress />;
    } else {
      return <Button onClick={toggleLoadStateLoading}>Verify Nodes</Button>;
    }
  };

  console.log("Filtered:", filteredNodes);

  return (
    <div>
      <AppBar>
        <Grid container>
          <Grid item xs={12} lg={1}>
            <Avatar src={logo} />
          </Grid>
          <Grid item xs={12} lg={10}>
            <Typography variant="h3">Raspi</Typography>
          </Grid>
        </Grid>
      </AppBar>
      <br />
      <br />
      <Paper>
        <h2>Connected Nodes</h2>
        <LoadingRender isLoading={nodeStatesLoading}/>
        {nodes.map((n) => {
          return conditionalColor(n);
        })}
      </Paper>
      <Grid container spacing={2} direction="row">
        {filteredNodes.map((filteredNode) => {
          return (
            <Grid item lg={6} xs={12}>
              <Grid container spacing={2} direction="column">
                <Grid item xs={6} lg={6}>
                  <Controls node={filteredNode} />
                </Grid>
                <Grid item xs={6} lg={6}>
                  <Logs node={filteredNode} />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
