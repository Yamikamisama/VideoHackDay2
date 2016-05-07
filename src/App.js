import React, { Component } from 'react';

export default class App extends Component {

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
        <div className="wrap" id="container">
          <div className="cube" id="container2">
            <div className="front" id="front">
              <div id="player1" />
              <a className="embedly-card" href="https://www.youtube.com/watch?v=RrLAaDCPc3I">Card</a>
						<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>
            </div>
            <div className="back">
              <div id="player2" />
            </div>
            <div className="top">
              <div id="player3" />
            </div>
            <div className="bottom">
              <div id="player4" />
            </div>
            <div className="left">
              <div id="player5" />
            </div>
            <div className="right">
              <div id="player6" />
            </div>
          </div>
        </div>
        <a className="embedly-button" href="http://embed.ly/code">Embed</a>
      </div>
    );
  }
}
