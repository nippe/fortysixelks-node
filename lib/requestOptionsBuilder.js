module.exports = RequestOptionsBuilder;

function RequestOptionsBuilder(options) {
    this.options = options || {};
    return this;
};


RequestOptionsBuilder.prototype.addFromDate = function(fromDate) {
    if (fromDate) {
      var date = new Date(fromDate);
      var reqObj = this.options;
      this.options = Object.assign(this.options, {
        qs: {
          start: date.toISOString().substr(0, 23)
      }
    });
  }
  return this;
}
