import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
      	<script src="//content.jwplatform.com/libraries/DbXZPMBQ.js"></script>
      	<script src="//cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
      	<script src="assets/js/modernizr.js"></script>
      	<script src="assets/js/cube.js"></script>
        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
        <div className="wrap" id="container">
          <div className="cube" id="container2">
            <div className="front" id="front">
              <div id="player1" />
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
      </div>
    );
  }
}
