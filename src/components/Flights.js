import React, { Component } from "react";
import styled from "styled-components";

export default class Flights extends Component {
  render() {
    const { fro } = this.props;
    if (fro != "") {
      const DepartureListt = fro.map(zen => {
        return (
          <div className="py-2">
            <div className="container">
              <div className="card ">
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>{zen.departure}</strong> to{" "}
                    <strong>{zen.arrival}</strong>
                    {(() => {
                      switch (zen.discount) {
                        case 0:
                          return (
                            <React.Fragment>
                              <SpanRight className="pull-right">
                                EUR {zen.cost}
                              </SpanRight>
                            </React.Fragment>
                          );
                        default:
                          return (
                            <React.Fragment>
                              <SpanRight className="pull-right">
                                EUR {zen.cost}
                              </SpanRight>
                              <p className="card-text">
                                <SpanRightText className="pull-right">
                                  <i> discount : Eur {zen.discount} </i>
                                </SpanRightText>
                              </p>
                            </React.Fragment>
                          );
                      }
                    })()}
                  </h5>
                  <p className="card-text">
                    <b>{zen.transport}</b> <i> {zen.reference}</i> for{" "}
                    {zen.duration.h} {zen.duration.m}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      });

      return <React.Fragment>{DepartureListt}</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          {" "}
          <div className="py-2">
            <div className="container">
              <div className="card">
                <div className="card-body al-c">
                  <h5 className="card-title">No root found</h5>
                  <p className="card-text">No root found</p>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

const ProductWrapper = styled.div`
  margin: 20px;
  text-align: center;
`;
const SpanRight = styled.span`
  float: right;
`;
const SpanRightText = styled.span`
  float: right;
  font-size: 14px;
  color: green;
  padding-top: 10px;
`;
