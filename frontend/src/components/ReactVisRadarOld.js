// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from "react";

import RadarChart from "react-vis/dist/radar-chart";
import CircularGridLines from "react-vis/dist/plot/circular-grid-lines";
import "react-vis/dist/style.css";

const DATA = [
  {
    explosions: 7,
    wow: 10,
    dog: 8,
    sickMoves: 9,
    nice: 7
  }
];

const DOMAIN = [
  { name: "nice", domain: [0, 100], tickFormat: t => t.toFixed(2) },
  { name: "explosions", domain: [6.9, 7.1] },
  { name: "wow", domain: [0, 11] },
  { name: "dog", domain: [0, 16] },
  { name: "sickMoves", domain: [0, 20] }
];

export default class AnimatedRadar extends Component {
  state = {
    data: DATA
  };

  render() {
    const { dataset, attackSummary } = this.props;
    // console.log(dataset);
    // console.log(attackSummary);
    let domain = attackSummary.map((item, i) => ({
      name: dataset.statistical[i].axis,
      domain: [0, item["value"]]
    }));
    // console.log(domain);
    let data = {};
    dataset.statistical.map(item => {
      data[item["axis"]] = item["value"];
    });

    // console.log(data);

    return (
      <div className="centered-and-flexed">
        <RadarChart
          animation
          data={[data]}
          domains={domain}
          style={{
            polygons: {
              fillOpacity: 0.5,
              strokeWidth: 2
            },
            axes: {
              text: {
                fontSize: 10,
                fill: "#B5B5B5"
              }
            },
            labels: {
              textAnchor: "middle",
              fontSize: 10,
              fill: "#6F6F7A"
            }
          }}
          margin={{
            left: 50,
            top: 40,
            bottom: 40,
            right: 50
          }}
          tickFormat={t => ""}
          width={230}
          height={230}
          startingAngle={0}
        >
          <CircularGridLines
            tickValues={[...new Array(6)].map((v, i) => i / 6 - 1)}
            style={{ fill: "none", stroke: "#E0E0E0", fontSize: 10 }}
          />
        </RadarChart>
      </div>
    );
  }
}