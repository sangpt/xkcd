var express = require('express');
var router = express.Router();
var xkcd = require("../xkcd")
var db = require("../ComicDB")

var comics = []
const max = 1845; // lastest comic id
/* GET home page. */

// Toan bo comment trong file nay su dung xkcd api, da duoc thay the bang mongodb
router.get('/', function(req, res, next) {
  // xkcd.get(random(1, max), function(error, response) {
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     res.render('index', response);
  //   }
  // })
  // for(var i=0; i<10; i++){
  //   xkcd.get(random(1, max), function(error, response) {
  //     if (error) {
  //       console.error(error)
  //     } else {
  //       comics.push(response)
  //     }
  //   })
  // }
  db.get(random(1, max), function(data) {
      res.render('index', data)
  })
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
  // xkcd.get(random(1, max), function(error, response) {
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     comics.push(response)
  //   }
  // })
  db.get(random(1, max), function(data) {
    comics.push(data)
    // console.log(data)
  })
})

router.post('/search', function(req, res) {
  var id = +req.body.id
  if(Number.isInteger(id) && id > 0 && id <= max){
    // xkcd.get(id, function(error, response) {
    //   if (error) {
    //     console.error(error)
    //   } else {
    //     res.send(response)
    //   }
    // })
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