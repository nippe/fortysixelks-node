# fortysixelks-node
A node.js wrapper of the 46elks API (http://46elks.com)

**This is still a early alfa under development, that means the api is not done and WILL change. It also means not all functionality is in place and refactorings will be perfomed.** Please leave feedback inte issues if you find something missing, broke or have feedback.

## Installation

npm soon!

## API
Everything hangs off a Client object:
```
var client = require('fortysixelks-node')('<username>', '<password>');
```


### Send SMS
Using promises
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.sendSms('Test ' + new Date(), '+461234567', '+461234567')
  .then(function(res){
    console.log(res);
  });
```

Using callbacks
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.sendSms('Test' + new Date(), '+46123456', '+46123456', function(err, res){
  if(err) console.log(':(');
  console.log(res);
});
```

Response format (JSON)
```
{
  direction: 'outgoing',
  from: '+46123456',
  created: '2015-11-11T14:10:38.496470',
  to: '+467123345',
  cost: 3500,
  message: 'Test from fortysixelks-node Wed Nov 11 2015 15:10:38 GMT+0100 (CET)',
  id: 's1bd965cc067fcaba9b09c128a555c815'
}
```

### List SMS
Using Promises
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.listSms().then(function(res) { console.log(res); });
```

Using Callbacks
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.listSms(function(err, res){
  console.log(res);
})
```
Response format
```
{ data:
   [ { status: 'delivered',
       delivered: '2015-11-11T14:10:40.854000',
       direction: 'outgoing',
       from: '+46123456',
       created: '2015-11-11T14:10:38.496000',
       to: '+46123456',
       cost: 3500,
       message: 'NONON Wed Nov 11 2015 15:10:38 GMT+0100 (CET)',
       id: 's1bd965cc067fcaba9b09c128a555c801' },
     { status: 'delivered',
       delivered: '2015-11-09T12:05:31.454000',
       direction: 'outgoing',
       from: '+46123456',
       created: '2015-11-09T12:05:28.128000',
       to: '+46123456',
       cost: 3500,
       message: 'NONON Mon Nov 09 2015 13:05:28 GMT+0100 (CET)',
       id: 'sbb8f7da6dd8830b2ee0db4694fd27fe8' },
     { status: 'delivered',
       delivered: '2015-11-09T11:29:35.322000',
       direction: 'outgoing',
       from: 'tk',
       created: '2015-11-09T11:29:33.042000',
       to: '+46123456',
       cost: 3500,
       message: 'Hoho',
       id: 'sd334f449791a00f1352df8d22519b52a' },
     { status: 'delivered',
       delivered: '2015-11-09T06:48:02.040000',
       direction: 'outgoing',
       from: '+46123456',
       created: '2015-11-09T06:47:58.990000',
       to: '+46123456',
       cost: 3500,
       message: 'testing...',
       id: 'sf0a416264bbd36f507d047c877849c04'
    } ]
}
```

### Flash SMS
Using Promises
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.sendFlashSms('PIN. 123456', '+46123456', '+46123456').then(function(res){ console.log(res);});
```

Callback
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.sendFlashSms('PIN: 123456', '+46123456', '+46123456', function(err, res){
  if(err) console.error(':( Error! ' + err.message);
  console.log(res);
});
```

Response
```
{
  direction: 'outgoing',
  from: '+46123456',
  created: '2015-11-11T20:06:18.251418',
  flashsms: 'yes',
  to: '+467123456',
  cost: 3500,
  message: 'PIN: 123456',
  id: 's68c992f33df7903ffbfd721926fe7207'
}
```

#### Set SMS url
The url that gets called when 46elks gets a incoming sms to your allocated number.
Using Promises
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.setSmsUrl('nd51066f1746006c917aebb9sdfdsde58', 'http://hardcoded.se/incoming_sms')
  .then(function(res) {console.dir(res);});
```

Callback
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.setSmsUrl('nd51066f1746006c917aebb9sdfdsde58', 'http://hardcoded.se/incoming_sms', function(err, res) {
  if(err) console.error(':( Error! ' + err.message);
  console.log(res);
});
```

Response
```
{
  category: 'mobile',
  country: 'se',
  expires: '2015-12-12T14:56:07',
  number: '+46123456',
  capabilities: [ 'sms', 'voice' ],
  active: 'yes',
  sms_url: 'http://hardcoded.se/incoming_sms',
  id: 'nd51066f1746006c917aebb9sdfdsde58'
}
```


### MMS
**I've added functions for MMS but they are not tested, I did not have a MMS enabled number and could not find in the docs how-to send an MMS.**


### Numbers
#### List Numbers

```
var client = require('fortysixelks-node')('<username>', '<password>');
client.listNumbers().then(function(res) {
  console.log(res);
});
```

Response
```
{
  "data": [
    {
      "category": "mobile",
      "country": "se",
      "expires": "2015-12-12T14:56:07",
      "number": "+46123456",
      "capabilities": [
        "sms",
        "voice"
      ],
      "active": "yes",
      "sms_url": "http://hardcoded.se/sms_hook",
      "id": "nd510a4a4a446006c917aebb91dc506e58"
    },
    {
      "category": "mobile",
      "country": "se",
      "number": "+46123456",
      "capabilities": [
        "sms",
        "voice"
      ],
      "active": "no",
      "sms_url": "http://hardcoded.se/sms_hook",
      "id": "n420baa4a40e29c48282ec3415bdacaa5"
    }
  ]
}
```

### Detail on one number
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.getNumberDetail('nd510a4a4a446006c917aebb91dc506e58').then(function(res) {
  console.log(res);
});
```

Response
```
{
  "category": "mobile",
  "country": "se",
  "expires": "2015-12-12T14:56:07",
  "number": "+46123456",
  "capabilities": [
    "sms",
    "voice"
  ],
  "active": "yes",
  "sms_url": "http://hardcoded.se/sms_hook",
  "id": "nd510a4a4a446006c917aebb91dc506e58"
}
```

### Allocate Numbers
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.allocateNewNumber('country (se)', 'sms url', 'mms url', 'voice start url').then(function(res) {
  console.log(res);
});
```
**Only country is mandatory!**

Response
```
{
  "category": "mobile",
  "country": "se",
  "expires": "2015-12-12T14:56:07",
  "number": "+46123456",
  "capabilities": [
    "sms",
    "voice"
  ],
  "active": "yes",
  "sms_url": "http://hardcoded.se/sms_hook",
  "id": "nd510a4a4a446006c917aebb91dc506e58"
}
```

### Deallocate / inactivate number
**Reminder: You cannot get a deactivated number back.**
```
var client = require('fortysixelks-node')('<username>', '<password>');
client.deallocateNumber('nd510a4a4a446006c917aeb1vvdc506e58').then(function(res) {
  console.log(res);
});
```
**Only country is mandatory!**

Response
```
{
  "category": "mobile",
  "country": "se",
  "expires": "2015-12-12T14:56:07",
  "number": "+46123456",
  "capabilities": [
    "sms",
    "voice"
  ],
  "active": "no",
  "sms_url": "http://hardcoded.se/sms_hook",
  "id": "nd510a4a4a446006c917aeb1vvdc506e58"
}
```

### Calls
#### List Calls
Coming...


### Accounts
#### List Subaccounts

#### Create Subaccounts

## Aliases
These names end you up in the same place.

|Method name | Other method name|
|------------|------------------|
| sendSms    | sendMessage      |
| listSms    | listMessages     |
