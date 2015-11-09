var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
//var request = require('request');
var debug = require('debug')('fortysixelks-node:lib:index');
var path = require('path');

var apiBaseUrl = 'https://api.46elks.com';
var apiBasePath = '/a1/'


module.exports = RestClient;


function RestClient(username, apikey, options) {
  'use strict'
  options = options || {};

  this.account = {
    username: username,
    apikey: apikey
  };
  //account handling
  //Exposed methods
  this.sendSms = (options.testing && options.testing === true) ? testSendSms: sendSms;
}


function sendSms(message, toNumber, fromNubmer, cb) {

  var reqeustOptions = {
    uri: 'https://api.46elks.com/a1/SMS',
    method: 'POST',
    auth: {
      user: this.account.username,
      pass: this.account.apikey
    },
    form: {
      from: fromNubmer,
      to: toNumber,
      message: message
    }
  };

  debug('Sending SMS' );
  request(reqeustOptions).then(function(result) {
    cb && typeof cb === 'function' && cb(null, result.body);
  });

}

function buildBasicAuthUrl(username, apikey, url) {
  return url.replace('https://', 'https://' + username + ':' + apikey + '@');
}

// Testing methods
function testSendSms(message, toNumber, fromNubmer, cb) {
  console.log('Testing on. \n  Seding SMS to ' + toNumber + ', \n  from: ' + fromNubmer + ', \n  message: ' + message);
}
