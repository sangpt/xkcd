var xkcd = require("./myapp/xkcd")
var mongo = require("mongodb").MongoClient

var url = 'mongodb://localhost:27017/myapp'
var start = 750,
    end = 1000;
var i = 1000;

while(i < 1250){
  setTimeout(function() {
    console.log('insert ' + i)
    get(i)
  }, 100)
  i++
}

var getMax = function() {
  xkcd.latest(function(error, response) {
    if (error) {
      console.error(error);
    } else {
      return response.num;
    }
  });
}

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