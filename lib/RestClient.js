var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
//var request = require('request');
var debug = require('debug')('fortysixelks-node:lib:index');
var urljoin = require('url-join');

module.exports = RestClient;

RestClient.prototype.getBaseUrl = function() {
  return urljoin('https://api.46elks.com', '/a1/');
}

// Request object generator. Move to other file later
// TODO: Should this return promise?
RestClient.prototype.generate = function(method, servicePath, formData) {
  var requestOptions = {
    uri: urljoin(this.getBaseUrl(), servicePath),
    method: method || 'GET',
    auth: {
      user: this.account.username,
      pass: this.account.apikey
    }
  };

  if (formData) {
    requestOptions.form = formData;
  }
  return requestOptions;
}

function RestClient(username, apikey, options) {
  'use strict'
  options = options || {};

  this.account = {
    username: username,
    apikey: apikey
  };
  //account handling
  //Exposed methods
  this.sendSms = sendSms;
  this.sendMessage = sendSms;

  this.listSms = listSms;
  this.listMessages = listSms;

  this.listNumbers = listNumbers;
}


function sendSms(message, toNumber, fromNubmer, cb) {
  var restClient = this;
  var formData = {
    from: fromNubmer,
    to: toNumber,
    message: message
  };
  debug('Sending SMS');

  // Supporting both callbacks and promises
  return request(restClient.generate('POST', 'SMS', formData))
    .then(function(result) {
      if (result.statusCode !== 200) throw new Error(result.body);
      return Promise.resolve(JSON.parse(result.body));
    })
    .asCallback(cb)
    .catch(console.log.call(console));
}

function listSms(cb) {
  var restClient = this;
  debug('Listing SMS Messages');

  return request(restClient.generate('GET', 'SMS')).then(function(result) {
    if (result.statusCode !== 200) throw new Error(result.body);
    return Promise.resolve(JSON.parse(result.body));
  })
  .asCallback(cb)
  .catch(console.log.call(console));
}

function listNumbers(cb) {
  var restClient = this;


  throw new Error('Not implemented');
}
