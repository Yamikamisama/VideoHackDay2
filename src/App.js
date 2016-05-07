import React, { Component } from 'react';
import Firebase from 'firebase';

/*{
  title: "Hello World!",
  author: "Firebase",
  location: {
    city: "San Francisco",
    state: "California",
    zip: 94103
  }
  vid: 9d07913c261ed38a36abf9b251913f7a
}*/

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: {}
    }
  }

  componentWillMount() {
    this.fbRef = new Firebase("https://glowing-heat-3729.firebaseio.com/");
    if (window) {
      this.ziggeo = window.ZiggeoApi;
      this.ziggeo.token = "48e5020c4d4bf27250018a92e8d95f0a";
    }
  }

  componentDidMount() {
    // this.ziggeo.Events.on("submitted", (data) => {
    //   console.log(data);
    //   // this.setState({ videos: { video1: data.video.token } });
    // });
    const embedding = this.ziggeo.Embed.get("test");
    console.log(embedding);
  }

  componentWillUpdate(nextProps, nextState) {
    // if (nextState.currentVideo !== this.state.currentVideo) {
    //   this.ziggeo.Embed.embed("#player", { video: nextState.currentVideo });
    // }
  }

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

        <div className="recorder">
           <ziggeo
            ziggeo-id='test'
            ziggeo-limit='15'
            ziggeo-width='320'
            ziggeo-height='240'>
          </ziggeo>
        </div>

        <div>
          <button onClick={ this._storeVid.bind(this) }>SaveToCube</button>
        </div>

        <div>
          <button onClick={ this._getVideo.bind(this) }>GetVideos</button>
        </div>
      </div>
    );
  }

  _storeVid() {
    console.log(this.state.videos)
    // this.fbRef.child("location/city").on("value", (snapshot) => {
    //   console.log(snapshot.val());
    // });
  }

  _getVideo() {
    const videoUrl = this.ziggeo.Videos.source('9d07913c261ed38a36abf9b251913f7a');
  }
}
