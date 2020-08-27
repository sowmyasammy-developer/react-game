import React, { Component } from "react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: Math.floor(this.props.board.columns / 2),
      y: Math.floor(this.props.board.rows / 2)
    };
  }

  steps = 0;

  addStepPosition = arrow => {
    switch (arrow) {
      case 37:
        this.setState({
          x: this.state.x,
          y: this.state.y - 1
        });
        this.steps += 1;
        break;
      case 38:
        this.setState({
          x: this.state.x - 1,
          y: this.state.y
        });
        this.steps += 1;
        break;
      case 39:
        this.setState({
          x: this.state.x,
          y: this.state.y + 1
        });
        this.steps += 1;
        break;
      case 40:
        this.setState({
          x: this.state.x + 1,
          y: this.state.y
        });
        this.steps += 1;
        break;
      default:
        return;
    }

    const crossMushrooms = this.props.mushrooms.find(
      mushroom =>
        mushroom.y === this.state.y &&
        mushroom.x === this.state.x &&
        mushroom.exists
    );
    if (crossMushrooms) {
      this.props.attackMushroom(crossMushrooms, this.steps);
    }
  };

  movePlayer = e => {
    const arrow = e.keyCode || e;
    const { y, x } = this.state;
    const columnLimit = this.props.board.columns - 1;
    const rowLimit = this.props.board.rows - 1;

    let moveFlag = false ;

    if (y > rowLimit - 1 && arrow === 39) {
        moveFlag = true;
       } else if (x > columnLimit - 1 && arrow === 40) {
         moveFlag = true;
       } else if (x < 1 && arrow === 38) {
         moveFlag = true;
       } else if (y < 1 && arrow === 37) {
         moveFlag = true;
       } else {
         moveFlag = false;
       }

    if (!moveFlag) {
      this.addStepPosition(arrow);
    }
  };

  componentDidMount() {
    window.onkeydown = this.movePlayer;
  }

  render() {
    const styles = {
      height: this.props.board.cellHeight + "px",
      width: this.props.board.cellWidth + "px",
      marginTop: ((this.state.x * (this.props.board.cellHeight + 2)) + 1) + "px",
      marginLeft: ((this.state.y * (this.props.board.cellWidth + 2)) + 1) + "px"
    };
    return (
      <div style={{ position: 'absolute' }}>
        <div className="boardItem player" style={styles} />
      </div>
    );
  }
}

export default Player;
