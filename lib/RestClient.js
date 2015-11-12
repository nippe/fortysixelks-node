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

RestClient.prototype.doRequest = function(dataObject, cb) {
  return request(dataObject)
    .then(parseJsonReslut)
    //.asCallback(cb)
    .catch(console.log.call(console));
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
  this.incomingPhoneNumbers = listNumbers;

  this.sendFlashSms = sendFlashSms;

  this.listCalls = listCalls;
}


function parseJsonReslut(result) {
  return new Promise(function(resolve, reject) {
    if (result.statusCode === 200) {
      resolve(JSON.parse(result.body));
    } else {
      var err = new Error(result.body);
      err.number = err.statusCode;
      reject(err);
    }
  });
}

function sendFlashSms(message, toNumber, fromNubmer, cb) {
  return sendSms.call(this, message, toNumber, fromNubmer, 'yes', cb);
}

function sendSms(message, toNumber, fromNubmer, flashsms, cb) {
  var restClient = this;

  if(typeof flashsms === 'function') {
    cb = flashsms;
    flashsms = undefined;
  }

  var formData = {
    from: fromNubmer,
    to: toNumber,
    message: message,
    flashsms: flashsms || 'no'
  };

  debug('Sending SMS');
  // Supporting both callbacks and promises
  return request(restClient.generate('POST', 'SMS', formData))
    .then(parseJsonReslut)
    .asCallback(cb)
    .catch(console.log.call(console));
}

function listSms(cb) {
  var restClient = this;
  debug('Listing SMS Messages');

  return request(restClient.generate('GET', 'SMS')).then(parseJsonReslut)
    .asCallback(cb)
    .catch(console.log.call(console));
}

function listNumbers(cb) {
  debug('Listing Incoming Numbers');
  return this.doRequest(this.generate('GET', '/Numbers')).asCallback(cb);
}

function listCalls(cb) {
  debug('Listing Calls');
  return this.doRequest(this.generate('GET', '/Calls')).asCallback(cb);
}
