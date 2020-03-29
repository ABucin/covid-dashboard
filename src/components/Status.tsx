import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RemoveIcon from '@material-ui/icons/Remove';
import './Panel.css';

import React from "react";

const red = '#ff7f7f';
const yellow = '#efdea4';
const green = '#009090';

const computeIcon = (diff: number) => {
  let icon;

  if (diff > 0) {
    icon = <ArrowDropUpIcon htmlColor={red} />;
  } else if (diff < 0) {
	icon = <ArrowDropDownIcon htmlColor={green} />;
  } else {
    icon = <RemoveIcon htmlColor={yellow} />;
  }

  return icon;
};

function Status(props: any) {
  const diff: number = props.currentCount - props.previousCount || 0;
  // truncate to 1 decimal
  const percent: number = Math.trunc(diff * 100 / props.previousCount * 10) / 10;
  const sign: string = diff > 0 ? '+' : '';
  const numberColor: string = diff > 0 ? red : green;

  return (
	  <span className={'label status'}>
		{props.text}: {props.currentCount} (<span style={{color: numberColor}}>{sign}{diff} / {sign}{percent}%</span>)
		{computeIcon(diff)}
	  </span>
  );
}

export default Status;
