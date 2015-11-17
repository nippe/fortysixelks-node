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
    url: urljoin(this.getBaseUrl(), servicePath),
    method: method || 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache'
    },
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
  debug('Doing request');
  debug(dataObject);
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
  this.sendFlashSms = sendFlashSms;

  this.sendMms = sendMms;

  this.listNumbers = listNumbers;
  this.getNumberDetail = getNumberDetail;
  this.allocateNewNumber = allocateNewNumber;
  this.deallcoateNumber = deallcoateNumber;
  this.incomingPhoneNumbers = listNumbers;

  this.setSmsUrl = setSmsUrl;

  this.listCalls = listCalls;
  this.makeCall = makeCall;

  this.listAccounts = listAccounts;
  this.addSubaccount = addSubaccount;
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

function sendFlashSms(message, toNumber, from, cb) {
  return sendSms.call(this, message, toNumber, from, 'yes', cb);
}

function sendSms(message, toNumber, from, flashsms, cb) {
  var restClient = this;

  if(typeof flashsms === 'function') {
    cb = flashsms;
    flashsms = undefined;
  }

  var formData = {
    from: from,
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

function sendMms(message, toNumber, from, imageUrl, cb) {
  var formData = {
    from: from,
    to: toNumber,
    message: message,
    image: imageUrl
  };

  return this.doRequest(this.generate('POST', 'MMS', formData)).asCallback(cb);
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

function allocateNewNumber(country, smsUrl, mmsUrl, voiceStart, cb) {
  debug('Allocating new number');
  var formData = {
    country: country,
    sms_url: smsUrl || '',
    mms_url: mmsUrl || '',
    voice_start: voiceStart || ''
  };

  return this.doRequest(this.generate('POST', '/Numbers', formData)).asCallback(cb);
}

function deallcoateNumber(numberId, cb) {
  return this.doRequest(this.generate('POST', '/Numbers/' + numberId, {active: 'no'}))
    .asCallback(cb);
}

function setSmsUrl(numberId, smsUrl, cb) {
  debug('Setting SMS url');
  return this.doRequest(this.generate('POST', '/Numbers/' + numberId, {sms_url: smsUrl})).asCallback(cb);
}

function getNumberDetail(numberId, cb) {
  debug('Listing Incoming Numbers');
  return this.doRequest(this.generate('GET', '/Numbers/' + numberId)).asCallback(cb);
}

// Accounts 
function listAccounts(cb) {
  debug('Listing sub accounts');
  return this.doRequest(this.generate('GET', '/Subaccounts')).asCallback(cb);
}

function addSubaccount(name, cb) {
  debug('Adding subaccount ' + name);
  var formData = {name: name};
  return this.doRequest(this.generate('POST', '/Subaccounts', formData)).asCallback(cb);
}

function removeSubaccount(accountId, cb) {
  var formData = {name: name};
  return this.doRequest(this.generate('DELETE', '/Subaccounts/' + accountId)).asCallback(cb);
}

// Calls

function listCalls(cb) {
  debug('Listing Calls');
  return this.doRequest(this.generate('GET', '/Calls')).asCallback(cb);
}

function makeCall(toNumber, fromNumber, voice_start, whenhangup, cb) {
  var formData = {
    to: toNumber,
    from: fromNumber,
    voice_start: JSON.stringify(voice_start),
    whenhangup: whenhangup ? whenhangup : ''
  };
  console.log(formData);
  return this.doRequest(this.generate('POST', '/Calls', formData)).asCallback(cb);
}
