import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, total }) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <Typography>{total} Total</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default InfoBox;
