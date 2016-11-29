var extend = require('util-extend');
module.exports = RequestOptionsBuilder;

function RequestOptionsBuilder(options) {
    this.options = options || {};
    return this; //TODO: What if I change this to return this.options
};


RequestOptionsBuilder.prototype.addFromDate = function(fromDate) {
    if (fromDate) {
      var date = new Date(fromDate);
      var reqObj = this.options;
      this.options = extend(this.options, {
        qs: {
          start: date.toISOString().substr(0, 23)
      }
    });
  }
  return this;
}
