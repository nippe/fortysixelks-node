var RestClient = require('./RestClient');



function init(username, apikey, options) {
  console.log('Init-ing');
  return new RestClient(username, apikey, options);
}


module.exports = init;
