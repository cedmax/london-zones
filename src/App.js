import React, { Component } from "react";
import stationsObj from "./stations.json";

const stations = stationsObj.stations;

export default class App extends Component {
  state = {
    value: "",
  };

  render() {
    const { value } = this.state;
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ height: "25vh", display: "flex" }}>
          <label
            for="station"
            style={{
              margin: "auto auto 0",
              display: "block",
              width: "90%",
              maxWidth: 500,
            }}
          >
            <h3 style={{ padding: 0, margin: "0 0 5px" }}>Station:</h3>
            <input
              id="station"
              onChange={e => this.setState({ value: e.target.value })}
              value={value}
              placeholder="Kentish Town"
              style={{
                fontSize: 20,
                width: "100%",
                display: "block",
              }}
            />
          </label>
        </div>
        <div style={{ height: "75vh" }}>
          {value && (
            <ol
              style={{
                margin: "0 auto",
                maxWidth: 500,
                width: "90%",
                listStyle: "none",
                padding: "3px 0",
              }}
            >
              {stations
                .filter(({ name }) =>
                  name.toLowerCase().startsWith(value.toLowerCase())
                )
                .map(station => (
                  <li
                    style={{
                      padding: "3px 0",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    key={station.name + station.zone}
                  >
                    {station.name}{" "}
                    <em style={{ fontSize: 14 }}>
                      {station.zone === "unknown"
                        ? `no zone, but you can use the oyster`
                        : `zone ${station.zone}`}
                    </em>
                  </li>
                ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}
