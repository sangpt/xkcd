var xkcd = require("./xkcd")
var mongo = require("mongodb").MongoClient

var url = 'mongodb://localhost:27017/myapp'

// lay tat ca comic tu i -> n
var getComic = (i, n) => {

    setInterval(function() {
      get(i)
      console.log('insert ' + i)
      i++
      if(i == n) clearInterval(this)
    }, 20)
}

getComic(1, 1850)

// lay gia tri max cua comic
function getMax() {
  xkcd.latest(function(error, response) {
    if (error) {
      console.error(error);
    } else {
      // console.log(response.num) ;
      return response.num;
    }
  });
}

// lay comic thu i va nhet vao db
var get = function(i){
  xkcd.get(i, function(error, response) {
    if (error) {
      console.error(error)
    }
    else {
      mongo.connect(url, function(err, db) {
        if (err) throw err;
        var comics = db.collection('comics')
        comics.update(response, response, {
          upsert: true
        }, function(err, data) {
          if (err) throw err
          // console.log('insert ' + i)
        })
        db.close()
      })
    }
  })
}

var count = function(){
  mongo.connect(url, function(err, db) {
    if(err) return console.error('error')
    // console.log('connect success')
    
    var collection = db.collection('comics')
    collection.count({
      
    }, function(err, data) {
      if (err) throw err
      console.log(data)
    })
    db.close()
  })
}