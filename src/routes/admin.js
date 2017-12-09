var express = require('express');
var router = express.Router();
var winston = require('winston');

var queryLogger = new (winston.Logger)({
    level:"info",
    transports: [
    new (winston.transports.File)({ filename: 'query_trace.log'})
  ]
});

router.get('/query1', function(req, res, next) {
  queryLogger.info("select * from flight_transaction where destination_city in (select destination_city from flight_transaction where booking_amount > (select avg (booking_amount ) from flight_transaction)) order by destination_city");

});

router.get('/query2', function(req, res, next) {
  queryLogger.info("select kayak_database_t.car_transaction.user_id as user_id1, user_id as userid2, a.src_city from kayak_database_t.car_transaction , kayak_database_t.car_transaction  where kayak_database_t.car_transaction.user_id <> kayak_database_t.car_transaction.user_id and a.src_city=b.src_city order by a.src_city");
});

router.get('/query3', function(req, res, next) {
  queryLogger.info("select * from flight_transaction where destination_city in (select destination_city from flight_transaction where booking_amount > (select avg(booking_amount) from flight_transaction)) order by destination_city");
});

router.get('/indexgenerator', function(req, res, next){
    const options = {
      until: new Date(),
      order: 'desc',
      fileds:["message"]
    };

    queryLogger.query(options, function (err, results) {
      if(err){
        res.status(401).json({result:[]})
      }
      results.file.map((data)=>{
        console.log(data);
      });
      res.status(201).json({result:results});
      });

});



module.exports = router;
