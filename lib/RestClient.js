var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var debug = require('debug')('fortysixelks-node:lib:index');
var urljoin = require('url-join');
var RequestOptionsBuilder = require('./requestOptionsBuilder');

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
  this.sendSms = sendSms;
  this.sendMessage = sendSms;
  this.listSms = listSms;
  this.listMessages = listSms;
  this.listMessagesFrom = listSmsFromDate
  this.listSmsFrom = listSmsFromDate
  this.sendFlashSms = sendFlashSms;

  this.sendMms = sendMms;

  this.listNumbers = listNumbers;
  this.getNumberDetail = getNumberDetail;
  this.allocateNewNumber = allocateNewNumber;
  this.deallcoateNumber = deallcoateNumber;
  this.incomingPhoneNumbers = listNumbers;

  this.setSmsUrl = setSmsUrl;

  this.listCalls = listCalls;
  this.listCallsFromDate = listCallsFromDate;

  this.listAccounts = listAccounts;
  this.addSubaccount = addSubaccount;
}

RestClient.prototype.getBaseUrl = function() {
  return urljoin('https://api.46elks.com', '/a1/');
}

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

  var op = new RequestOptionsBuilder(requestOptions);
  return op;
}

RestClient.prototype.doRequest = function(dataObject, cb) {
  debug('Doing request');
  debug(dataObject);
  return request(dataObject)
    .then(parseJsonReslut)
    .catch(console.log.call(console));
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
  return request(restClient.generate('POST', 'SMS', formData).options)
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

  return request(restClient.generate('GET', 'SMS').options)
    .then(parseJsonReslut)
    .asCallback(cb)
    .catch(console.log.call(console));
}

function listSmsFromDate(fromDate, cb) {
  if(!fromDate) {
    return listSms;
  }
  var restClient = this;
  debug('Listing SMS Messages From Date %s', fromDate);

  return request(
    restClient.generate('GET', 'SMS')
      .addFromDate(fromDate)
      .options
    )
    .then(parseJsonReslut)
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

  return this.doRequest(this.generate('POST', '/Numbers', formData).options).asCallback(cb);
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
  return this.doRequest(this.generate('GET', '/Numbers/' + numberId).options).asCallback(cb);
}

function listCalls(cb) {
  debug('Listing Calls');
  return this.doRequest(this.generate('GET', '/Calls').options).asCallback(cb);
}

function listCallsFromDate(fromDate, cb) {
  if(typeof fromDate === 'function') {
    return listSms;
  }
  var restClient = this;
  debug('Listing calls From Date %s', fromDate);
  return request(
    restClient.generate('GET', 'Calls')
      .addFromDate(fromDate)
      .options
    )
    .then(parseJsonReslut)
    .asCallback(cb)
    .catch(console.log.call(console));
}

function listAccounts(cb) {
  debug('Listing sub accounts');
  return this.doRequest(this.generate('GET', '/Subaccounts').options).asCallback(cb);
}

function addSubaccount(name, cb) {
  debug('Adding subaccount ' + name);
  var formData = {name: name};
  return this.doRequest(this.generate('POST', '/Subaccounts', formData).options).asCallback(cb);
}

function removeSubaccount(accountId, cb) {
  var formData = {name: name};
  return this.doRequest(this.generate('DELETE', '/Subaccounts/' + accountId).options).asCallback(cb);
}
