// var mongo = require("mongodb").MongoClient

// var url = 'mongodb://localhost:27017/myapp'
// mongo.connect(url, (err, db) => {
//     if(err) throw err
//     var collection = db.collection('comics')
//     collection.find({
//         num: 1
//     }).toArray((err, data) => {
//         if(err) throw err
//         console.log(data)
//     })
//     db.close()
// })

var db = require("./ComicDB")

db.count(console.log)