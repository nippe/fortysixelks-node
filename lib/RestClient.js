var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
//var request = require('request');
var debug = require('debug')('fortysixelks-node:lib:index');
var urljoin = require('url-join');
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
  this.sendSms = (options.testing && options.testing === true) ? testSendSms : sendSms;
  this.sendMessage = (options.testing && options.testing === true) ? testSendSms : sendSms;
  this.listSms = (options.testing && options.testing === true) ? testListSms : listSms;
  this.listMessages = (options.testing && options.testing === true) ? testListSms : listSms;
}


function sendSms(message, toNumber, fromNubmer, cb) {

  var reqeustOptions = {
    uri: urljoin(apiBaseUrl, apiBasePath, 'SMS'),
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

  debug('Sending SMS');
  // Supporting both callbacks and promises
  return request(reqeustOptions)
    .then(function(result) {
      if(result.statusCode !== 200) throw new Error(result.body);
      return Promise.resolve(JSON.parse(result.body));
    })
    .asCallback(cb)
    .catch(console.log.call(console));
}

function listSms(cb) {
  var reqeustOptions = {
    uri: urljoin(apiBaseUrl, apiBasePath, 'SMS'),
    method: 'GET',
    auth: {
      user: this.account.username,
      pass: this.account.apikey
    }
  };

  return request(reqeustOptions).then(function(result) {
    if(result.statusCode !== 200) throw new Error(result.body);
    return Promise.resolve(JSON.parse(result.body));
  }).asCallback(cb).catch(console.log.call(console));
}

// Testing methods
function testSendSms(message, toNumber, fromNubmer, cb) {
  Promise.resolve({})
  console.log('Testing on. \n  Seding SMS to ' + toNumber + ', \n  from: ' + fromNubmer + ', \n  message: ' + message);
}
