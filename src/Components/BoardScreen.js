import React, { Component } from "react";
import { withRouter } from "react-router";

import Player from "./Player";
import GreenMushroom from "./GreenMushroom";

class Board extends Component {
  constructor(props) {
    super(props);

    if (!(this.props.rows || this.props.columns)) {
        this.props.history.push("/");
    }

    this.state = {
      cellWidth: 30,
      cellHeight: 30,
      mushrooms: [],
      score: 0
    };

    const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const playerXvalue = Math.floor(this.props.columns / 2);
    const playerYvalue = Math.floor(this.props.rows / 2);

    while (this.state.mushrooms.length < this.totalMushrooms) {
      let xValue = getRandomValue(0, this.props.columns - 1);
      let yValue = getRandomValue(0, this.props.rows - 1);
      const flag = this.state.mushrooms.find((item) => {
        return item.x === xValue && item.y === yValue;
      });
      const playerFlag = xValue === playerXvalue && yValue === playerYvalue;
      if (!flag && !playerFlag) {
        this.state.mushrooms.push({
          key: this.state.mushrooms.length,
          x: xValue,
          y: yValue,
          exists: true
        });
      }
    }
  }

  totalMushrooms = Math.round(
    (this.props.rows + this.props.columns) / 2
  );

  attackMushroom = (mushroom, steps) => {
    const updatedMushrooms = [...this.state.mushrooms];
    updatedMushrooms[mushroom.key].exists = false;
    this.setState({
      mushrooms: updatedMushrooms,
      score: this.state.score + 1
    });

    if (this.totalMushrooms === this.state.score) {
      this.props.setTotalSteps(steps);
      this.props.history.push("/score");
    }
  };

  render() {
    const styles = {
      width: this.props.columns * this.state.cellWidth + "px",
      height: this.props.rows * this.state.cellHeight + "px"
    };
    const cellStyle = {
      width: this.state.cellWidth + "px",
      height: this.state.cellHeight + "px",
      border: '1px solid black'
    };
    let rows = [];
    for (var i = 0; i < this.props.rows; i++) {
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < this.props.columns; idx++) {
        let cellID = `cell${i}-${idx}`
        cell.push(<div key={cellID} id={cellID} style={cellStyle}></div>)
      }
      rows.push(<div key={i} id={rowID}>{cell}</div>)
    }

    return (
      <div>
        <p>Use Arrow keys to move!!</p>
        <div className="board" style={styles}>
          {rows}
          <Player
            board={{
              cellWidth: this.state.cellWidth,
              cellHeight: this.state.cellHeight,
              rows: this.props.rows,
              columns: this.props.columns
            }}
            mushrooms={this.state.mushrooms}
            attackMushroom={this.attackMushroom}
          />
          {this.state.mushrooms
            .filter(mushroom => {
              return mushroom.exists;
            })
            .map(mushroom => {
              return (
                <GreenMushroom
                  key={mushroom.key}
                  x={mushroom.x}
                  y={mushroom.y}
                  cellWidth={this.state.cellWidth}
                  cellHeight={this.state.cellHeight}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default withRouter(Board);
