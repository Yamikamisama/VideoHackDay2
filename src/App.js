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
      cube: {
        id: `${ Math.floor(Math.random() * (99999 - 1) + 1) }-${ Math.floor(new Date().getTime() / 1000) }`,
        videos: [],
      }
    }
  }

  componentWillMount() {
    this.fbRef = new Firebase("https://glowing-heat-3729.firebaseio.com/cubes");
    if (window) {
      this.ziggeo = window.ZiggeoApi;
      this.ziggeo.token = "48e5020c4d4bf27250018a92e8d95f0a";
    }
  }

  componentDidMount() {
    window._embedly_id=0
    this.counter = 1;
    const zRecorder = this.ziggeo.Embed.embed('#z-recorder', { id: 'zRecorder', limit: 15, width: 320, height: 240, countdown: 0 });

    this.ziggeo.Events.on("submitted", (data) => {
      const newVideo = { zToken: data.video.token, url: `//${data.video.embed_video_url}.mp4` };
      let videos = this.state.cube.videos;
      videos.push(newVideo);
      // store in state
      this.setState({ videos });
      if ( this.state.cube.videos.length === 1 ) {
        let cube = {}
        this.fbRef.push( this.state.cube );
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

        <div>
          {/* Button trigger modal */}
          <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            Add Media
          </button>
          {/* Modal */}
          <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                  <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div className="modal-body">
                  <h1>Use any URL to add content to the cube!</h1>
                  <input id="embedly-input" type="text" placeholder="Enter a URL" />
                  <div>
                    <button type="button" className="btn btn-default" onClick={ this._getEmbedly.bind(this) }>SaveToCube</button>
                  </div>
                  <hr/>
                  Or
                  <hr/>
                  <a className="button">Record Video</a>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="z-recorder"></div>

        <div>
          <input id='cubeId' type='text' />
          <button onClick={ this._getVideo.bind(this) }>GetVideos</button>
        </div>
      </div>
    );
  }

  _getEmbedly(e) {
  	const $embedlyInput = $('#embedly-input')
  	$('.back').append(`<a id="embedly${_embedly_id}"href="${$embedlyInput.val()}"></a>`)
  	var a = document.getElementById(`##{_embedly_id}`);
  	embedly('card', 'a');
  }

  _storeVid() {
    console.log(this.state.videos)
    // this.fbRef.child("location/city").on("value", (snapshot) => {
    //   console.log(snapshot.val());
    // });
  }

  _getVideo() {
    this.fbRef.on("value", (snapshot) => {
      $.each(snapshot.val(), (key, cube) => {
        console.log(key, cube);
      });
    });
  }
}
