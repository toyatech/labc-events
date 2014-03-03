
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile(__dirname + '/../public/index.html');
};
