import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Components/HomeScreen";
import Board from "./Components/BoardScreen";
import Score from "./Components/ScoreScreen";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: 0,
      columns: 0,
      steps: 0
    };
  }

  setBoard = (row, column) => {
    this.setState({
      rows: row,
      columns: column
    });
  }

  setTotalSteps = (steps) => {
    this.setState({ steps: steps });
  }

  renderHome = () => <Home setBoard={this.setBoard} {...this.state} />;
  renderBoard = () => <Board setTotalSteps={this.setTotalSteps} {...this.state} />;
  renderScore = () => <Score {...this.state} />;

  render() {
    return (
      <Router>
        <div>
          <Route path="/" render={this.renderHome} exact />
          <Route path="/board" render={this.renderBoard} />
          <Route path="/score" render={this.renderScore} />
        </div>
      </Router>
    );
  }
}

export default App;

