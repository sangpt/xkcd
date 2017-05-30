var mongo = require("mongodb").MongoClient

var url = 'mongodb://localhost:27017/myapp'

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

