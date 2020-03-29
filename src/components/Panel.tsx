import React, {ReactText} from "react";
import moment from "moment";
import './Panel.css';
import {ResponsiveBar} from '@nivo/bar'

const isMobile = window.innerWidth < 750;
const chartLayout = isMobile ? 'horizontal' : 'vertical';
const chartWidth = isMobile ? window.innerWidth : undefined;
const chartMargins = isMobile
	? {top: 20, right: 10, bottom: 30, left: 40}
	: {top: 50, right: 130, bottom: 80, left: 60};
const formatDate = (d: ReactText) => {
  return moment(d).format('DD.MM');
};
const red = '#ff7f7f';
const yellow = '#efdea4';
const green = '#009090';
const darkGrey = '#333';
const textColor = '#c5c5c5';

const generateMarker = (value: string, stroke: string, legend: string): any => ({
  axis: isMobile ? 'y' : 'x',
  value,
  lineStyle: {stroke, strokeWidth: 1},
  legend,
  textStyle: {fill: textColor, fontSize: 12, textShadow: '1px 1px 1px #111'},
});

const chartTooltip = (t: any) => {
  return (<div>
	<p>{formatDate(t.data.Date)}</p>
	<p style={{color: yellow}}>Confirmed: {t.data.Confirmed}</p>
	<p style={{color: red}}>Deaths: {t.data.Deaths}</p>
	<p style={{color: green}}>Recovered: {t.data.Recovered}</p>
  </div>);
};

const labelTextColor = (c: any) => c.data.id === 'Confirmed' ? darkGrey : 'white';
const axisBottom = isMobile ? undefined : {
  tickRotation: 45,
  format: formatDate,
};
const axisTop = isMobile ? {} : undefined;
const axisLeft = isMobile ? {
  tickRotation: 45,
  format: formatDate,
} : undefined;

function Panel(props: any) {

  // @ts-ignore
  return (
	  <div style={{height: 600, width: chartWidth}}>
		<h3>2020 Romanian COVID-19 cases</h3>
		<ResponsiveBar
			data={props.data}
			keys={['Recovered', 'Deaths', 'Confirmed']}
			colors={[green, red, yellow]}
			indexBy={'Date'}
			layout={chartLayout}
			labelSkipHeight={10}
			labelSkipWidth={10}
			enableGridX={isMobile}
			enableGridY={!isMobile}
			margin={chartMargins}
			theme={{
			  axis: {
				ticks: {
				  line: {
					stroke: textColor,
				  },
				  text: {
					fill: textColor,
					fontFamily: 'Oswald',
				  },
				},
			  },
			  labels: {
				text: {
				  fontFamily: 'Oswald',
				  textShadow: '1px 1px 1px #111',
				}
			  },
			  legends: {
				text: {
				  textShadow: '1px 1px 1px #111',
				  fontFamily: 'Oswald',
				},
			  },
			  grid: {
				line: {
				  stroke: textColor,
				  strokeWidth: 1,
				  strokeDasharray: "5 5"
				}
			  },
			  tooltip: {
				container: {
				  background: darkGrey,
				  border: `1px solid ${textColor}`,
				  fontSize: 12,
				  textShadow: '1px 1px 1px #111',
				},
			  },
			}}
			axisBottom={axisBottom}
			axisLeft={axisLeft}
			axisTop={axisTop}
			labelTextColor={labelTextColor}
			markers={[
			  generateMarker('2020-03-04T00:00:00Z', green, 'First recoveries'),
			  generateMarker('2020-03-16T00:00:00Z', yellow, 'Emergency state'),
			  generateMarker('2020-03-22T00:00:00Z', red, 'First deaths'),
			  generateMarker('2020-03-25T00:00:00Z', yellow, 'Full lockdown'),
			]}
			tooltip={chartTooltip}
			legends={[
			  {
			    itemTextColor: textColor,
				dataFrom: 'keys',
				anchor: 'bottom',
				direction: 'row',
				translateX: 0,
				translateY: 70,
				itemsSpacing: 0,
				itemWidth: 80,
				itemHeight: 20,
				itemDirection: 'left-to-right',
				itemOpacity: 0.85,
				symbolSize: 10,
				effects: [
				  {
					on: 'hover',
					style: {
					  itemOpacity: 1
					}
				  }
				]
			  }
			]}
		/>
	  </div>
  );
}

export default Panel;
