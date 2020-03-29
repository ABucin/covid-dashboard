import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RemoveIcon from '@material-ui/icons/Remove';
import './Panel.css';

import React from "react";

const red = '#ff7f7f';
const yellow = '#efdea4';
const green = '#009090';
const isMobile = window.innerWidth < 750;

const computeIcon = (diff: number, reverse: boolean) => {
  let icon;

  if (diff > 0) {
	icon = <ArrowDropUpIcon htmlColor={reverse ? green : red} />;
  } else if (diff < 0) {
	icon = <ArrowDropDownIcon htmlColor={reverse ? red : green} />;
  } else {
	icon = <RemoveIcon htmlColor={yellow} />;
  }

  return icon;
};

const computeNumberColor = (diff: number, reverse: boolean) => {
  let numberColor: string = '';

  if (diff > 0) {
	numberColor = reverse ? green : red;
  } else if (diff < 0) {
	numberColor = reverse ? red : green;
  }

  return numberColor;
};

const statusStyle = isMobile ? {
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
} : {margin: 5};

function Status(props: any) {
  const diff: number = (props.currentCount - props.previousCount) || 0;
  // truncate to 1 decimal
  const percent: number = (Math.trunc(diff * 100 / props.previousCount * 10) / 10) || 0;
  const sign: string = diff > 0 ? '+' : '';

  return (
	  <span className={'status'} style={statusStyle}>
		{props.text}: {props.currentCount} (<span style={{color: computeNumberColor(diff, props.reverse)}}>{sign}{diff} / {sign}{percent}%</span>)
		{computeIcon(diff, props.reverse)}
	  </span>
  );
}

export default Status;
