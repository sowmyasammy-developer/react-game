import React, { Component } from "react";

class GreenMushroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
      cellWidth: this.props.cellWidth,
      cellHeight: this.props.cellHeight
    };
  }

  render() {
    const styles = {
      width: this.state.cellWidth + "px",
      height: this.state.cellHeight + "px",
      marginTop: ((this.state.x * (this.state.cellHeight + 2)) + 1) + "px",
      marginLeft: ((this.state.y * (this.state.cellWidth + 2)) + 1) + "px"
    };
    return (
      <div style={{ position: 'absolute' }}>
        <div className="boardItem greenmushroom" style={styles} />
      </div>
    );
  }
}

export default GreenMushroom;