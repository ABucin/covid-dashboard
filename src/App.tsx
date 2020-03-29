import React from 'react';
import './App.css';
import Panel from "./components/Panel";

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error);
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    // confirmed, recovered, deaths
    const responseConfirmed: any = await fetch('https://api.covid19api.com/country/romania/status/confirmed/live');
    const responseRecovered: any = await fetch('https://api.covid19api.com/country/romania/status/recovered/live');
    const responseDeaths: any = await fetch('https://api.covid19api.com/country/romania/status/deaths/live');
    const dataConfirmed: any = await responseConfirmed.json();
    const dataRecovered: any = await responseRecovered.json();
    const dataDeaths: any = await responseDeaths.json();

    const data = dataConfirmed.map((d: any, i: number) => {
      const result = Object.assign({}, d);
      result.Confirmed = d.Cases;
      result.Recovered = dataRecovered[i].Cases;
      result.Deaths = dataDeaths[i].Cases;

      return result;
    });

    this.setState({data});
  }

  render() {
    return (
        <div className="App">
          <Panel data={this.state.data} />
        </div>
    );
  }
}
