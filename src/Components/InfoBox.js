import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, todayCases }) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          {cases !== undefined ? (
            <Typography>{cases} Active Cases</Typography>
          ) : (
            <></>
          )}
          <h2>+{todayCases}</h2>
          <Typography>{total} Total</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default InfoBox;
