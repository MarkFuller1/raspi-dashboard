import {
  Paper,
  Typography,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { React, useEffect, useState } from "react";

import * as API from "../util/api";

export const Logs = (props) => {
  console.log("Loading logs for node", props.node);

  const [nodeData, setNodeData] = useState([]);

  const cols = [
    { field: "timestamp", headerName: "Time Stamp", width: "200" },
    { field: "state", headerName: "State" },
    {
      field: "timerDurationLeft",
      headerName: "Timer Duration Left",
      width: "200",
    },
    { field: "message", headerName: "Message", width: "250" },
  ];

  useEffect(() => {
    async function fetchData() {
      let result = await API.getNodeLogs(props.node.ip);
      console.log("returned from API call", result.data);

      result.data.forEach((log) => {
        log["id"] = log["node_payload_id"];
      });

      setNodeData(result.data);
    }
    // fetchData();
    const timeout = setTimeout(() => {
      fetchData();
    }, 5000);
  });

  return (
    <Paper style={{ maxHeight: "30vh", overflow: "auto" }}>
      <Typography variant="h5">{props.node.ip}</Typography>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            {cols.map((col) => {
              return <TableCell align="right">{col.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {nodeData.map((node) => (
            <TableRow key={node.id}>
              {cols.map((col) => (
                <TableCell component="th" scope="row">
                  {node[col.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Paper>
  );
};
