import React, { Component } from "react";
import styled from "styled-components";
import JsonFunction from "json-function";
import sortDeepObjectArrays from "sort-deep-object-arrays";

import { flights } from "../fares";
import Flights from "./Flights";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: " ",
      arrival: " ",
      all: "",
      filter: "fast"
    };
  }
  onCheckChange(e) {
    console.log(e.target.value);
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log(this.state.filter);
  };

  onSubmit = e => {
    e.preventDefault();
    const form = {
      departure: this.state.departure,
      arrival: this.state.arrival,
      filter: this.state.filter
    };
    //console.log("form departure is" + form.departure);
    //console.log("form Arrival is" + form.arrival);
    //console.log("form Filter is" + form.filter);

    const result = JsonFunction.where({
      arrival: form.arrival
      // departure: form.departure
    })
      .select([
        "cost",
        "reference",
        "arrival",
        "departure",
        "duration",
        "transport",
        "discount"
      ])
      //.orderBy("transport", "DESC")
      //.limit(2)
      .get(flights);
    let results = JsonFunction.where({ departure: form.departure }).get(result);
    // Cheapest
    if (form.filter == "cheap") {
      results = JsonFunction.where({ departure: form.departure })
        .orderBy("cost", "ASC")
        .get(result);
    }

    // Fastest
    if (form.filter == "fast") {
      results = sortDeepObjectArrays(results);

      //console.log(JSON.stringify(mySortedObject, null, 2));
      //results = JSON.stringify(mySortedObject, null, 2);

      // let x = 0;
      // const SortHours = results
      //   .sort((a, b) => a.duration.h - b.duration.h)
      //   .map(ren => {
      //     let hours = ren.duration.h;
      //     let minutes = ren.duration.m;
      //     let h = hours * 60;
      //     let m = minutes * 60;
      //     let totalTime = h + m;
      //     x = x + 1;
      //  console.log("sad" + hours + totalTime);
      //   });
      // const SortMinutes = results
      //   .sort((a, b) => a.duration.m - b.duration.m)
      //   .map(een => {
      //  console.log("XXX" + een);
      // });

      //console.log("x" + x);
    }

    //console.log("res" + result);

    this.setState({
      ["all"]: results
    });
    //this.state.all = ali;
    //  console.log(form);
  };

  render() {
    //console.log(this.props);
    const { flights } = this.props;
    function getUnique(arr, comp) {
      const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e])
        .map(e => arr[e]);

      return unique;
    }

    //console.log(getUnique(flights, "departure"));
    let Departures = getUnique(flights, "departure");
    const DepartureList = Departures.map(transport => {
      //console.log(transport.transport);
      return <option>{transport.departure}</option>;
    });
    let Arrivals = getUnique(flights, "arrival");
    const ArrivalList = Arrivals.map(transport => {
      //console.log(transport.transport);
      return <option>{transport.arrival}</option>;
    });
    let ress = this.state.all;

    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="form-row ">
              <div className="form-group col-md-3">
                <label for="inputCity">Departure</label>
                <select
                  id="inputState"
                  name="departure"
                  value={this.state.departure}
                  onChange={e => this.handleChange(e)}
                  className="form-control"
                >
                  <option value="">Select Departure</option>
                  {DepartureList}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label for="inputState">Arrival</label>
                <select
                  id="inputState"
                  name="arrival"
                  value={this.state.arrival}
                  onChange={e => this.handleChange(e)}
                  className="form-control"
                >
                  <option value="">Select Arrival</option>
                  {ArrivalList}
                </select>
              </div>
              <div className="form-group col-md-3">
                <div class="radio-group">
                  <input
                    type="radio"
                    id="option-one"
                    name="filter"
                    value="fast"
                    checked={this.state.filter === "fast"}
                    onChange={e => this.handleChange(e)}
                  />
                  <label for="option-one">Fastest</label>
                  <input
                    type="radio"
                    id="option-two"
                    name="filter"
                    value="cheap"
                    checked={this.state.filter === "cheap"}
                    onChange={e => this.handleChange(e)}
                  />
                  <label for="option-two">Cheapest</label>
                </div>
              </div>

              <div className="form-group col-md-2 m-32">
                <button
                  onClick={e => this.onSubmit(e)}
                  className="btn btn-primary w-h"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <Flights fro={this.state.all} />
        </div>
      </React.Fragment>
    );
  }
}

const SpanRight = styled.span`
  float: right;
`;
const ProductWrapper = styled.div`
  margin: 20px;
  text-align: center;
`;
