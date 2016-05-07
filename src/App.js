import React, { Component } from 'react';
import Firebase from 'firebase';
import _ from 'lodash';

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
      counter: 1,
      cube: {
        id: `${ Math.floor(Math.random() * (99999 - 1) + 1) }-${ Math.floor(new Date().getTime() / 1000) }`,
        videos: [],
      },
      openRecorder: false,
    }
  }

  componentWillMount() {
    this.fbRef = new Firebase("https://glowing-heat-3729.firebaseio.com/cubes");
    if (window) {
      this.ziggeo = window.ZiggeoApi;
      this.ziggeo.token = "48e5020c4d4bf27250018a92e8d95f0a";
    	const cube = window.location.href.split('?')[1]
    	this._getCube(cube)
    }
  }

  componentDidMount() {
    this.zRecorder = this.ziggeo.Embed.embed('#z-recorder', { limit: 15, width: 320, height: 240, countdown: 0 });

    this.ziggeo.Events.on("submitted", (data) => {
      const newVideo = { zToken: data.video.token, url: `//${data.video.embed_video_url}.mp4` };
      let videos = this.state.cube.videos;
      videos.push(newVideo);
      // store in state
      this.setState({ videos });
      if ( this.state.cube.videos.length === 6 ) {
        this.fbRef.push( this.state.cube );
      }
      // reset recorder
      zRecorder.reset();
      // set recorded to JWPlayer
      jwplayer(`player${this.state.counter}`).setup({
        file: newVideo.url,
        autostart: false
      });
      this.setState({counter: this.state.counter += 1});
    });
  }

  render() {
    return (
      <div id="container">
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
                  <button className="button" onClick={ this._openRecorder.bind(this) }>Record Video</button>
                  <div id="z-recorder" className={ this.state.openRecorder ? '' : 'hide' }></div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='random-btn-c'>
          <p className='random-btn-label'>Random Cube!</p>
          <button className="btn btn-default random-btn" onClick={ this._getRandomCube.bind(this) }>
            <img src="/assets/images/dice.png" alt=""/>
          </button>
        </div>
      </div>
    );
  }

  _getEmbedly() {
  	if(this.state.counter < 7) {
	  	const $embedlyInput = $('#embedly-input')
	  	$(`#player${ this.state.counter }`).append(`<a id="embedly${this.state.counter}"href="${$embedlyInput.val()}"></a>`)
	  	const a = $(`#embedly${this.state.counter}`);
	  	embedly('card', 'a');
	  	this.setState({counter: this.state.counter += 1});
  		const newVideo = { zToken: null, url: $embedlyInput.val() };
  		let videos = this.state.cube.videos;
  		videos.push(newVideo);
  		// store in state
  		this.setState({ videos });
  		if ( this.state.cube.videos.length === 6 ) {
  		  this.fbRef.push( this.state.cube );
	  	}
	  }
	  $('.modal').modal('toggle');
  }

  _getVideo() {
    const targetId = $('#cubeId').val();

    this.fbRef.on("value", (snapshot) => {
      const targetCube = _.find(snapshot.val(), (cubes, key) => cubes.id === targetId );

      this._populateCube(targetCube);
    });
  }

  _getCube(targetId) {
    this.fbRef.on("value", (snapshot) => {
      const targetCube = _.find(snapshot.val(), (cubes, key) => cubes.id === targetId );

      this._populateCube(targetCube);
    });
    this.setState({counter: 7});
  }

  _populateCube(cube) {
    const { videos }= cube;

    _.each(videos, (v, i) => {
      jwplayer(`player${i+1}`).setup({
        file: v.url,
        autostart: false
      });
    });
  }

  _openRecorder() {
    this.setState({openRecorder: true});
  }

  _getRandomCube() {
    this.fbRef.on("value", (snapshot) => {
      const randomCube = this._randomPick(snapshot.val());
      console.log(`random cube: ${randomCube.id}`);
      this._populateCube(randomCube);
    });
  }

  _randomPick(obj) {
    let result;
    let count = 0;
    _.each(Object.keys(obj), (key, i) => {
      if (Math.random() < 1/++count) {
        result = obj[key];
      }
    });
    return result;
  }
}
