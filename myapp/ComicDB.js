var xkcd = require("./xkcd")
var mongo = require("mongodb").MongoClient

var url = 'mongodb://localhost:27017/myapp'

module.exports = {
    // lay comic co id la num roi thuc hien callback
    get : function(num, callback) {
        mongo.connect(url, (err, db) => {
            if(err) throw err
            var collection = db.collection('comics')
            collection.find({
                num: num
            }).toArray((err, data) => {
                if(err) throw err
                // console.log(data)
                callback(data[0])
            })
            db.close()
        })
    },
    // thong ke so comic trong mongodb
    count : function(callback) {
        mongo.connect(url, function(err, db) {
            if(err) return console.error('error')
            // console.log('connect success')
              
            var collection = db.collection('comics')
            collection.count({
                
            }, function(err, data) {
                if (err) throw err
                callback(data)
            })
            db.close()
        })
    }
}