var vine = require('./lib/vine.js');

var user = new vine.VineUser('matehegedus19@gmail.com','temanike7');

user.login(function(err, res) {
  user.popular(function(err, res) {
    console.log(res);
  });
});
