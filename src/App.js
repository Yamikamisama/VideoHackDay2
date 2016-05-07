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
    window._embedly_id=0
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
    const videoUrl = this.ziggeo.Videos.source('9d07913c261ed38a36abf9b251913f7a');
  }
}
