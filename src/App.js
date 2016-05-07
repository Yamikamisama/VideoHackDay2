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
    	const cubeId = window.location.href.split('?')[1];
    	this._getCube(cubeId);
    }
  }

  componentDidMount() {
  	new Clipboard('.btn');
    this.zRecorder = this.ziggeo.Embed.embed('#z-recorder', { limit: 15, width: 320, height: 240, countdown: 0 });

    this.ziggeo.Events.on("submitted", (data) => {
      const newVideo = { zToken: data.video.token, url: `//${data.video.embed_video_url}.mp4`, thumbnail: `//${data.video.embed_image_url}` };
      let videos = this.state.cube.videos;
      videos.push(newVideo);
      // store in state
      this.setState({ videos });
      if ( this.state.cube.videos.length === 6 ) {
        this.fbRef.push( this.state.cube );
        history.pushState(null, null, `?${this.state.cube.id}`);
      }
      // set recorded to JWPlayer
      jwplayer(`player${this.state.counter}`).setup({
        file: newVideo.url,
        image: newVideo.thumbnail,
        autostart: false
      });
      this.setState({counter: this.state.counter += 1});
      // close modal
      $('#myModal').modal('toggle');
      // reset recorder
      this.zRecorder.reset();
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

        <div className="button-c">

        	{/* Button 1 */}
	        <div>
	          {/* Button trigger modal */}
	          <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
	            Add Media/Video
	          </button>
	          {/* Modal */}
	          <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
	            <div className="modal-dialog" role="document">
	              <div className="modal-content">
	                <div className="modal-header text-center">
	                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	                  <h4 className="modal-title" id="myModalLabel">Your DreamBox</h4>
	                </div>
	                <div className="modal-body text-center">
	                  <h4>Use any URL to add content to the cube!</h4>
	                  <input id="embedly-input" type="text" placeholder="Enter a URL" />
	                  <div>
	                    <button className="button" onClick={ this._getEmbedly.bind(this) }>Add To DreamBox</button>
	                  </div>
	                  <hr/>
	                  Or
	                  <hr/>
	                  <h4>Record a video Live!</h4>
	                  <button className="button" onClick={ this._openRecorder.bind(this) }>Record Video</button>
	                  <div id="z-recorder" className={ this.state.openRecorder ? '' : 'hide' }></div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>


	      	{/* Button 2 */}
	        <div>
	          {/* Button trigger modal */}
	          <button type="button" onClick={this._addShareLink.bind(this)}className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal2">
	            Share DreamBox
	          </button>
	          {/* Modal */}
	          <div className="modal fade" id="myModal2" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
	            <div className="modal-dialog" role="document">
	              <div className="modal-content">
	                <div className="modal-header text-center">
										<h4 className="modal-title" id="myModalLabel">Share the DreamBox</h4>
	                </div>
	                <div className="modal-body text-center">
	                	<input id="foo" value="https://github.com/zenorocha/clipboard.js.git"/>

	                	<button className="btn" data-clipboard-target="#foo">
	                	    <img className="icon-size" src="https://cdn0.iconfinder.com/data/icons/thin-text-editing/24/thin-0254_copy-128.png" alt="Copy to clipboard"/>
	                	</button>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>

	      	{/* Button 3 */}
	        <div className='random-btn-c'>
	          <button className="btn btn-primary btn-lg" onClick={ this._getRandomCube.bind(this) }>Random Cube!
	          </button>
	        </div>

        </div>

      </div>
    );
  }

  _addShareLink(){
  	$('#foo').val(window.location.href);
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
	  $('#myModal').modal('toggle');
  }

  _getVideo() {
    const targetId = $('#cubeId').val();

    this.fbRef.on("value", (snapshot) => {
      const targetCube = _.find(snapshot.val(), (cubes, key) => cubes.id === targetId );

      this._populateCube(targetCube);
    });
  }

  _getCube(targetId) {
    if ( targetId ) {
      this.fbRef.on("value", (snapshot) => {
        const targetCube = _.find(snapshot.val(), (cubes, key) => cubes.id === targetId );

        this._populateCube(targetCube);
        this.setState({counter: 7});
      });
    }
  }

  _populateCube(cube) {
    const { videos }= cube;

    _.each(videos, (v, i) => {
      jwplayer(`player${i+1}`).setup({
        file: v.url,
        image: v.thumbnail,
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

      this._populateCube(randomCube);
      history.pushState(null, null, `?${randomCube.id}`);
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
