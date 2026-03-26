import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const VideoTile = ({ name }) => {
  return (
    <Card
      style={{
        width: "300px",
        height: "200px",
        backgroundColor: "black",
        color: "white",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default VideoTile;