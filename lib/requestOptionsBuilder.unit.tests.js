var should = require('should')();
var RequestOptionsBuilder = require('./requestOptionsBuilder');


describe('RequestOptionsBuilder', function(){

  describe('Querystring building', function(){

    describe('Start date', function(){

      it('should have property name start', function(){
        var ob = new RequestOptionsBuilder();
        ob.addFromDate(new Date());
        ob.options.qs.start.should.be.ok();
      });

      it('should have correct date format', function(){
        var ob = new RequestOptionsBuilder();
        ob.addFromDate(new Date('2012-02-21T14:15:30.427'));
        ob.options.qs.start.should.equal('2012-02-21T14:15:30.427');
      });

      it('should have correct propert yname and date format with indata in the constructor', function(){
        var ob = new RequestOptionsBuilder({foo: 'bar', bag: {prop: 'val'}});
        ob.addFromDate(new Date('2012-02-21T14:15:30.427'));
        ob.options.qs.start.should.be.ok();
        ob.options.qs.start.should.equal('2012-02-21T14:15:30.427');
      });

    });
  })
});
