var RestClient = require('./RestClient');



function init(username, apikey, options) {
  return new RestClient(username, apikey, options);
}


module.exports = init;
