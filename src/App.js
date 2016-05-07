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
  url: http://embed.ziggeo.com/v1/applications/48e5020c4d4bf27250018a92e8d95f0a/videos/9d07913c261ed38a36abf9b251913f7a/video.mp4
}*/

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      cube: null,
    }
  }

  componentWillMount() {
    this.fbRef = new Firebase("https://glowing-heat-3729.firebaseio.com/");
    if (window) {
      this.ziggeo = window.ZiggeoApi;
      this.ziggeo.token = "48e5020c4d4bf27250018a92e8d95f0a";
    }
    this.fbRef.child('cube').on('value', snapshot => this.setState({ cube: snapshot.val() }) );
  }

  componentDidMount() {
    this.counter = 1;
    const zRecorder = this.ziggeo.Embed.embed('#z-recorder', { id: 'zRecorder', limit: 15, width: 320, height: 240, countdown: 0 });

    this.ziggeo.Events.on("submitted", (data) => {
      const newVideo = { zToken: data.video.token, url: `//${data.video.embed_video_url}.mp4` };
      let videos = this.state.videos;
      videos.push(newVideo);
      // store in state
      this.setState({ videos });
      if ( this.state.videos.length === 6 ) {
        this.fbRef.set( { cube: this.state } );
      }
      // reset recorder
      zRecorder.reset();
      // set recorded to JWPlayer
      jwplayer(`player${this.counter}`).setup({
        file: newVideo.url
      });
      this.counter++;
    });
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
						  <script async src="//cdn.embedly.com/widgets/platform.js" charSet="UTF-8"></script>
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

        <div id="z-recorder"></div>

        <div>
          <button onClick={ this._getVideo.bind(this) }>GetVideos</button>
        </div>

        <div className="cube-data">
         { `${JSON.stringify(this.state.cube)}` }
        </div>
      </div>
    );
  }

  _getVideo() {
    this.fbRef.child('cube').on("value", (snapshot) => {
      console.log(snapshot.val());
    });
  }
}
