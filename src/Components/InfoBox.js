import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";
import "./infoBox.css";

function InfoBox({ title, cases, total, todayCases }) {
  return (
    <>
      <Card className="infoBox">
        <CardContent>
          {/* Title */}
          {/* <Typography className="info__title" color="textSecondary"> */}
          <h1 className="info__title">{title}</h1>
          {/* </Typography> */}
          {/* Ternary Operator for Showing active cases in only first card */}
          {cases !== undefined ? (
            <Typography>
              <CountUp start={0} end={cases} duration={2.75} separator="," />{" "}
              Active Cases
            </Typography>
          ) : (
            <></>
          )}
          {/* Today's Cases */}
          <h2 className="info__cases">
            +
            <CountUp start={0} end={todayCases} duration={2.75} separator="," />
          </h2>
          {/* Total Cases */}
          <Typography className="info__total">
            <CountUp start={0} end={total} duration={2.75} separator="," />{" "}
            Total
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default InfoBox;
