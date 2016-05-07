var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var twilio = require('twilio');
const path = require('path');
const express = require('express');
const app = express();

const indexPath = path.join(__dirname, '/index.html');
const publicPath = express.static(path.join(__dirname, '../static'));
const port = (process.env.PORT || 3000);

app.use('/public', publicPath);

app.get('/', function (req, res) {
  res.sendFile(indexPath);
});

require('dotenv').config();

const client = new twilio.RestClient('ACccfad5c5365b389034ce961ec2c3c33b', process.env.TwilioAPIKEY);
// client.sendSms({
//     to:'+18565626606',
//     from:'+17573245262',
//     body:'ahoy hoy! Testing Twilio and node.js'
// }, function(error, message) {
//     if (!error) {
//         console.log('Success! The SID for this SMS message is:');
//         console.log(message.sid);
//         console.log('Message sent on:');
//         console.log(message.dateCreated);
//     } else {
//         console.log('Oops! There was an error.');
//     }
// });
if (process.env.NODE_ENV !== 'production') {
  // const webpack = require('webpack')
  // const webpackDevMiddleware = require('webpack-dev-middleware')
  // const webpackHotMiddleware = require('webpack-hot-middleware')
  // const config = require('../webpack.dev.config.js')
  // const compiler = webpack(config)

  // app.use(webpackHotMiddleware(compiler))
  // app.use(webpackDevMiddleware(compiler, {
  //   noInfo: true,
  //   publicPath: config.output.publicPath
  // }))

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
  });
} else {
  app.listen(port);
  console.log(`Listening at http://localhost:${port}`);
}

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true
// }).listen(3000, 'localhost', function (err, result) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('Listening at http://localhost:3000/');
// });
