import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Score extends Component {
  constructor(props) {
    super(props);

    if (!this.props.steps) {
      this.props.history.push("/");
    }
  }

  render() {

    return (
      <div>
        <h2>
          <p> Steps taken to complete: {this.props.steps || 0}</p>
        </h2>
        <br />
        <Link className="btn flat" to="/">
          Home
        </Link>
      </div>
    );
  }
}

export default withRouter(Score);
