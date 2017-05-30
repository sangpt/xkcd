var express = require('express');
var router = express.Router();
var xkcd = require("../xkcd")


var comics = []
/* GET home page. */
router.get('/', function(req, res, next) {
  xkcd.get(random(1, 1800), function(error, response) {
    if (error) {
      console.error(error)
    } else {
      res.render('index', response);
    }
  })
  for(var i=0; i<10; i++){
    xkcd.get(random(1, 1800), function(error, response) {
      if (error) {
        console.error(error)
      } else {
        comics.push(response)
      }
    })
  }
});

router.post('/random', function(req, res) {
  // xkcd.get(random(1, 1800), function(error, response) {
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     res.send(response);
  //   }
  // })
  
  res.send(comics.shift())
  xkcd.get(random(1, 1800), function(error, response) {
    if (error) {
      console.error(error)
    } else {
      comics.push(response)
    }
  })
})

router.post('/search', function(req, res) {
  var id = +req.body.id
  if(Number.isInteger(id) && id > 0 && id < 1800){
    xkcd.get(id, function(error, response) {
      if (error) {
        console.error(error)
      } else {
        res.send(response)
      }
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
  xkcd.get(random(1, 1800), function(error, response) {
    if (error) {
      console.error(error)
    } else {
      return response
    }
  })
}