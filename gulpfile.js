var gulp = require('gulp');

if ( process.env.TI_ENV === 'prod' ) {
  require('./tasks/prod')(gulp);
} else {
  require('./tasks/dev')(gulp);
}