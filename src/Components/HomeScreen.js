import React, { Component } from "react";
import { withRouter } from "react-router";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: undefined,
      height: undefined
    };
  }

  playGame = () => {
    this.props.setBoard(
      parseInt(this.state.width, 10),
      parseInt(this.state.height, 10)
    );
    this.props.history.push("/board");
  };

  isInputValid() {
    this.setState({
      isValid:
        this.state.width > 0 &&
        this.state.height > 0
    });
  }

  handleChangeWidth = e => {
    this.setState(
      {
        width: e.target.value
      },
      () => {
        this.isInputValid();
      }
    );
  };

  handleChangeHeight = e => {
    this.setState(
      {
        height: e.target.value
      },
      () => {
        this.isInputValid();
      }
    );
  };

  render() {
    return (
      <div>
        <p>Enter width and height for board!!</p>
        <input
          type="number"
          min="1"
          className="flat"
          onChange={this.handleChangeWidth}
          placeholder="Width"
        />
        <input
          type="number"
          min="1"
          className="flat"
          onChange={this.handleChangeHeight}
          placeholder="Height"
        />
        <br />
        <button
          className="btn flat"
          onClick={this.playGame}
          disabled={!this.state.isValid}
        >
          Play
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
