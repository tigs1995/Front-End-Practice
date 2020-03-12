import React from "react";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
import DateFormatter from "./DateFormatter";

export default class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    this.state = {
      start: start,
      end: end,
      latitude: "",
      longitude: "",
      radius: ""
    };

    this.applyCallback = this.applyCallback.bind(this);
  }


  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate
    });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let startDate = DateFormatter(this.state.start);
    let endDate = DateFormatter(this.state.end);
    this.props.history.push(
      `Map/${this.state.radius}/${this.state.latitude}/${this.state.longitude}/${startDate}/${endDate}`
    );
  };

  render() {

    let startDisplay = new Date(this.state.start);
    let endDisplay = new Date(this.state.end);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    // let end = moment(start)
    //   .add(1, "days")
    //   .subtract(1, "seconds");
    let local = {
      format: "DD-MM-YYYY HH:mm",
      sundayFirst: false
    };
    let maxDate = moment(start).add(24, "hour");

    return (
      <div>
        <DateTimeRangeContainer
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
        >
          <button>Select a timerange</button>
          <br />
          Start: <input name="start" type="text" value={startDisplay}></input>
          <br />
          End: <input name="end" type="text" value={endDisplay}></input>
          <br />
        </DateTimeRangeContainer>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
          step='0.01'
            type="number"
            min="-90"
            max="90"
            name="latitude"
            placeholder="Latitude: -90° to 90°"
            onChange={this.handleChange}
          ></input>
          <input
                    step='0.01'
            type="number"
            min="-180"
            max="180"
            name="longitude"
            placeholder="Longitude: 49° to 60°"
            onChange={this.handleChange}
          ></input>
          <input
            type="number"
            min="0"
            max="10"
            name="radius"
            placeholder="Radius (km)"
            onChange={this.handleChange}
          ></input>
          <button>Search</button>
        </form>
      </div>
    );
  }
}


