// var client = require('./index')('uf3825590e470ade3790e9fa74ae735cd', 'CBE033613F29D3013854292132F020D7', {testing: true});




describe('Client tests', function() {
  it('should be able to instatiate client', function() {
    var client = require('../index')('uf3825590e470ade3790e9fa74ae735cd', 'CBE033613F29D3013854292132F020D7');
  });
});


// SEND SMS

//client.sendSms('NONON ' + new Date(), '+46704943607', '+46766861032').then(function(res){ console.log(res);});
//
// client.sendSms('NONON ' + new Date(), '+46704943607', '+46766861032', function(err, res){
//   if(err) console.log(':(');
//   console.log(res);
// });


// List SMS
//client.listSms().then(function(res) {console.log(res);});
// client.listSms(function(err, res){
//   console.log(res);
// });

// List Numbers
// client.listNumbers().then(function(res){ console.log(res);});
// client.listNumbers().then(function(res) {console.dir(res);});
//client.getNumberDetail('n420bc6ec80e29c48282ec3415bdacaa5').then(function(res) {console.dir(res);});
// client.setSmsUrl('nd51066f1746006c917aebb91dc506e58', 'http://hardcoded.se/incoming_sms')
//   .then(function(res) {console.dir(res);});
// client.allocateNewNumber('se', 'http://hardcoded.se', null, null).then(function(res) {console.dir(res);});


// Flash SMS
// client.sendFlashSms('PIN: 123456', '+46704943607', '+46766861426').then(function(res){ console.log(res);});
// client.sendFlashSms('PIN: 123456', '+46704943607', '+46766861032', function(err, res){
//   if(err) console.error(':( Error! ' + err.message);
//   console.log(res);
// });

// Calls
// client.listCalls().then(function(res) { console.log(res); });
// client.listCalls(function(err, res) {
//   if(err) console.error(':( Error! ' + err.message);
//   console.log(res);
// });

//MMS
// client.sendMms('Check this out!', '+46704943607', '+46766861032', 'http://46elks.se/icons/github-43x43.png');

// client.addSubaccount('Niklas Test').then(function(res){ console.log(res);});
// client.listAccounts().then(function(res){ console.log(res);});

// Make call
// client.makeCall('+46704943607', '+46766861426', {'play': 'http://www.clayloomis.com/Sounds/lovetrek4.wav'}, null)
//   .then(function(res){console.log(res);});


// Litteral client
//var lClient = require('./litteral')('uf3825590e470ade3790e9fa74ae735cd', 'CBE033613F29D3013854292132F020D7');
//lClient.sendMessage({
//  body: 'Hey!',
//  to: '+46704943607',
//  from: ''
//});
