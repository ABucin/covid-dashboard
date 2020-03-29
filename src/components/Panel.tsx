import React, {ReactText} from "react";
import moment from "moment";
import './Panel.css';
import {ResponsiveBar} from '@nivo/bar'

const isMobile = window.innerWidth < 750;
const chartLayout = isMobile ? 'horizontal' : 'vertical';
const textColor = '#c5c5c5';
const chartHeight = isMobile ? window.innerHeight / 2 : 300;
const barSize = isMobile ? 2 : undefined;
const labelAngle = isMobile ? 90 : 45;
const chartMargins = isMobile
	? {top: 15, right: 10, bottom: 35, left: -20}
	: {top: 15, right: 30, bottom: 35, left: 0};
const formatDate = (d: ReactText) => {
  return moment(d).format('DD.MM');
};
const red = '#ff7f7f';
const yellow = '#efdea4';
const green = '#009090';

const renderLabel = (d: any) => {
  return d.value || '';
};

const generateMarker = (value: string, stroke: string, legend: string): any => ({
  axis: 'x',
  value,
  lineStyle: {stroke, strokeWidth: 1},
  legend,
  textStyle: {fill: textColor, fontSize: 12, textShadow: '1px 1px 1px #111'},
});

function Panel(props: any) {

  // @ts-ignore
  return (
	  <div className={'chartContainer'}>
		<h3>2020 Romanian COVID-19 cases</h3>
		<ResponsiveBar
			data={props.data}
			keys={['Recovered', 'Deaths', 'Confirmed']}
			colors={[green, red, yellow]}
			indexBy={'Date'}
			layout={chartLayout}
			labelSkipHeight={15}
			margin={{top: 50, right: 130, bottom: 50, left: 60}}
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
			  grid: {
				line: {
				  stroke: textColor,
				  strokeWidth: 1,
				  strokeDasharray: "5 5"
				}
			  },
			}}
			axisBottom={{
			  tickRotation: 45,
			  format: formatDate,
			}}
			markers={[
			  generateMarker('2020-03-04T00:00:00Z', green, 'First recoveries'),
			  generateMarker('2020-03-16T00:00:00Z', yellow, 'Emergency state'),
			  generateMarker('2020-03-22T00:00:00Z', red, 'First deaths'),
			  generateMarker('2020-03-25T00:00:00Z', yellow, 'Full lockdown'),
			]}
		/>

		{/*<ResponsiveContainer width={'100%'} height={chartHeight}>*/}
		{/*  <ComposedChart*/}
		{/*	  data={props.data}*/}
		{/*	  margin={chartMargins}*/}
		{/*	  style={{*/}
		{/*		fontSize: isMobile ? 10 : 12,*/}
		{/*		color: textColor,*/}
		{/*		fontWeight: isMobile ? 300 : 400,*/}
		{/*		letterSpacing: 0.2,*/}
		{/*	  }}>*/}
		{/*	<XAxis dataKey="Date" tickFormatter={formatDate} interval={0} angle={labelAngle} textAnchor={'start'}*/}
		{/*		   stroke={textColor} />*/}
		{/*	<YAxis stroke={textColor} />*/}
		{/*	<Tooltip labelFormatter={formatDate}*/}
		{/*			 contentStyle={{color: textColor, background: '#373737'}}*/}
		{/*			 isAnimationActive={false} />*/}
		{/*	<CartesianGrid stroke={textColor} strokeDasharray={'4 4'} vertical={false} />*/}
		{/*	<Legend verticalAlign={'bottom'} wrapperStyle={{bottom: 0}} />*/}
		{/*	<Bar dataKey={'Recovered'} fill={green} stackId={'a'} barSize={barSize}>*/}
		{/*	  <LabelList dataKey={'Recovered'} position={'insideTop'} className={'label-white'}*/}
		{/*				 content={renderLabel} />*/}
		{/*	</Bar>*/}
		{/*	<Bar dataKey={'Deaths'} fill={red} stackId={'a'} barSize={barSize}>*/}
		{/*	  <LabelList dataKey={'Deaths'} position={'outside'} className={'label-white'}*/}
		{/*				 content={renderLabel} />*/}
		{/*	</Bar>*/}
		{/*	<Bar dataKey={'Confirmed'} fill={yellow} stackId={'a'} barSize={barSize}>*/}
		{/*	  <LabelList dataKey={'Confirmed'} position={'insideTop'} className={'label'}*/}
		{/*				 content={renderLabel} />*/}
		{/*	</Bar>*/}
		{/*	<ReferenceLine x={29} stroke={yellow} label="Full lockdown" className={'label-reference'} />*/}
		{/*	<ReferenceLine x={26} stroke={red} label="First deaths" className={'label-reference'} />*/}
		{/*	<ReferenceLine x={20} stroke={yellow} label="Emergency state" className={'label-reference'} />*/}
		{/*	<ReferenceLine x={8} stroke={green} label="First recoveries" className={'label-reference'} />*/}
		{/*	/!*<Line type="monotone" dataKey="Cases" stroke="#009090" />*!/*/}
		{/*  </ComposedChart>*/}
		{/*</ResponsiveContainer>*/}
	  </div>
  );
}

export default Panel;
