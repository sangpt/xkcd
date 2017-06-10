var express = require('express');
var router = express.Router();
var xkcd = require("../xkcd")
var db = require("../ComicDB")

var comics = []
const max = 1848; // lastest comic id
/* GET home page. */

router.get('/', function(req, res, next) {
  db.get(random(1, max), function(data) {
      res.render('index', data)
  })
});

router.post('/random', function(req, res) {
  res.send(comics.shift())
  db.get(random(1, max), function(data) {
    comics.push(data)
  })
})

router.post('/search', function(req, res) {
  var id = +req.body.id
  if(Number.isInteger(id) && id > 0 && id <= max){
    db.get(id, function(data) {
      res.send(data)
    })
  } else {
    res.send('error')
  }
})

module.exports = router;

function random(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomComic() {
  xkcd.get(random(1, max), function(error, response) {
    if (error) {
      console.error(error)
    } else {
      return response
    }
  })
}