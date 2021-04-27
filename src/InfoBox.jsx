import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { prettyPrintStats } from "./util";
import "./InfoBox.css";

function InfoBox({
  onCardClick,
  title,
  cases,
  total,
  active,
  isRed,
  isGreen,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${isRed && "infoBox--red"} ${
        active && "infoBox--selected"
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${isGreen && "infoBox--green"}`}>
          +{prettyPrintStats(cases)}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {prettyPrintStats(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
