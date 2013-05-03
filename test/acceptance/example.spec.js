(function () {
    "use strict";

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    var webdriver = require('selenium-webdriver'),
        driver;

    var resetApp = function () {
        var deferred = webdriver.promise.defer();
        driver.get('http://localhost:8000/reset').then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    };

    var openApp = function () {
        var deferred = webdriver.promise.defer();
        driver.get('http://localhost:8000').then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    };

    var flow = webdriver.promise.controlFlow();

    var finish = function (done) {
        driver.quit().then(function () {
            done();
        });
    };

    var error = function (e) {
        driver.quit().then(function () {
            console.log('\n');
            console.error('ACCEPTANCE TESTS ERROR');
            console.error(e);
        });
    };

    describe("Normal users", function () {

      beforeEach(function () {

        driver = require('../rtd/webdrivers/selenium-server.js')(webdriver, {
          browserName: 'chrome',
          seleniumProtocol: 'WebDriver',
          'chrome.switches': ['--window-size=1366,768'] // this is being ignored
        });

        driver.manage().timeouts().setScriptTimeout(5000);
        driver.manage().timeouts().implicitlyWait(5000);

        resetApp().
          then(openApp);
      });

      var authenticate = function () {
        var name = 'Normal User',
            email = 'normal@example.com',
            password = 'apple1',
            deferred = webdriver.promise.defer();

        driver.findElement(webdriver.By.id('login-email')).sendKeys(email);
        driver.findElement(webdriver.By.id('login-password')).sendKeys(password);
        driver.findElement(webdriver.By.id('login-buttons-password')).click();
        driver.findElement(webdriver.By.id('display-name-link')).getText()
          .then(function (value) {
            var expected = name;
            if (value.indexOf(expected) !== 0) {
              deferred.reject(new Error(value + ' did not contain ' + expected));
            } else {
              deferred.resolve();
            }
          });
          
        return deferred.promise;
      };


      var verifyOnStartPage = function () {
        console.log('verifyOnStartPage');
        var mainDefer = webdriver.promise.defer();
        driver.findElement(webdriver.By.tagName('h2')).then(function (h2) {
            h2.getText().then(function (value) {
                expect(value).toBe("Start Page");
                mainDefer.resolve();
            });
        });
        return mainDefer.promise;
      };

      it("can log in",
        function (done) {
          authenticate().
            then(verifyOnStartPage).
            then(finish(done), error);
        });

    });  // end normal user

})();
