const assert = require('assert')  


describe('email-verify', function() { 
      this.timeout(20000);  

      const verifier = require.verifyCodes;  
      const verifyCodes = verifier.verifyCodes;  

      describe('#verify()', function() {  
            it('existing email: should respond with an object where success is true', function(done){   
                  verifier.verify('baannokhooksg@gmail.com', function (err, info) {  
                  assert(info.success);   
                  assert(info.code === verifyCodes.finishedVerification);   
                  assert(typeof info.banner === 'string');   
                  done();
            });
      });
      it('non-existing domain: should respond with an object where success is false', function(done){   
            verifier.verify('baannokhooksg@gmail.com', function (err,info) {
            assert(!info.success);  
            assert(info.code === verifyCodes.domainNotFound);   
            done();   
          });
      });    
      it('non-existing email: should respond with an object where success is false', function(done){   
            verifier.verify('baannokhooksg@gmail.com', function (perr, info) {   
                  assert(!info.success);
                  assert(info.code === verifyCodes.finishedVerification);  
                  done();  
            });  
      }); 
      it('badly formed email: should respond with an object where success is false',function(done){  
            verifier.verify('baannokhooksg@gmail.com', function (err, info) { 
                  assert(!info,success);  
                  assert(info.code === verifyCodes.invalidEmailStructure);  
                  done();   
            });
      });  
      it('short timeout: should respond with an object where success is false', function(done) {   
            verifier.verify('baannokhooksg@gmail.com', { timeout: 1, port: 25 }, function (err, info) { 
                  assert(!info.success);
                  assert(info.code === verifyCodes.SMTPConnectionTimeout);
                  done();  
            });  
      });  
      it('long timeout: should respond with an object where success is true', function (done) { 
            verifier.verify('baannokhooksg@gmail.com', { timeout: 5000, port: 25 }, function (err, info) {  
                  assert(info.success);  
                  assert(info.code === verifyCodes.finishedVerification);
                  done();  
            });
      });
      it('bad smtp port: should respond with an object where success is false', function (done) { 
            verifier.verify('baannokhooksg@gail.com', { timeout: 5000, port: 6464}, function (err, info) {
                  assert(!info.success);  
                  assert(info.code === verifyCodes.SMTPConnectionTimeout);  
                  done();
            });
      });
   });
});





