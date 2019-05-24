var RequestOptionsBuilder = require("./requestOptionsBuilder");

describe("RequestOptionsBuilder", function() {
  describe("Constructor", function() {
    it("should not mess up inserted litteral", function() {
      var baseConf = {
        foo: "bar",
        url: "http://hardcoded.se",
        form: {
          who: "is this"
        }
      };

      var ob = new RequestOptionsBuilder(baseConf);
      expect(ob.options).toEqual(baseConf);
    });
  });

  describe("Querystring building", function() {
    describe("Start date", function() {
      it("should have property name start", function() {
        var ob = new RequestOptionsBuilder();
        ob.addFromDate(new Date());
        expect(ob.options.qs.start).toBeTruthy();
      });

      it("should have correct date format", function() {
        var ob = new RequestOptionsBuilder();
        ob.addFromDate(new Date("2012-02-21T14:15:30.427"));
        expect(ob.options.qs.start).toMatch(/\d{4}-\d(2)-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/gi); //("2012-02-21T14:15:30.427");
      });

      it("should have correct propert yname and date format with indata in the constructor", function() {
        var ob = new RequestOptionsBuilder({
          foo: "bar",
          bag: {
            prop: "val"
          }
        });
        ob.addFromDate(new Date("2012-02-21T14:15:30.427"));
        expect(ob.options.qs.start).toBeTruthy();
        expect(ob.options.qs.start).toMatch(/\d{4}-\d(2)-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/gi);
      });

      it("should build on existing literal", function() {
        var ob = new RequestOptionsBuilder({
          url: "https://api.46elks.com/a1/SMS",
          method: "GET",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
          },
          auth: {
            user: "freak",
            pass: "on"
          }
        });

        expect(ob.addFromDate("2012-12-12").options).toEqual({
          url: "https://api.46elks.com/a1/SMS",
          method: "GET",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
          },
          auth: {
            user: "freak",
            pass: "on"
          },
          qs: {
            start: "2012-12-12T00:00:00.000"
          }
        });
      });
    });
  });
});
