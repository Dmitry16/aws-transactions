let path = require('path');
let util = require('util');
let http = require('http');

function HttpError(status, message) {
  // console.log('error/index::HttpError:::')
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || 'Error';
}

util.inherits(HttpError, Error);
HttpError.prototype.name = HttpError;

exports.HttpError = HttpError;