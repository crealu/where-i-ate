
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ejs = require('ejs');

const app = express();

var url = 'mongodbUrl';
var db;
MongoClient.connect(url, (err, database) => {
  if (err) {return console.log(err);}
  db = database;
  app.listen(4000, function() {
    console.log('live on 4000');
  })
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// render ejs
app.get('/', function(req, res) {
  db.collection('things').find().toArray(function(err, results) {
    if (err) {return console.log(err);}
    res.render('index.ejs', {things: results});
  })
});

//submit
app.post('/things', (req, res) => {
  db.collection('things').save(req.body, (err, result) => {
    if (err) {return console.log(err);}
    console.log('saved to database');
    res.redirect('/');
  })
});

app.put('/things', (req, res) => {
  db.collection('things')
    .findOneAndUpdate({restaurant: 'Great India'}, {
      $set: {
        restaurant: 'Cafe Enchante',
        location: 'Also geary'
      }
    }, {
      sort: {_id: 1},
      upsert: true
    }, (err, result) => {
      if (err) {return res.send(err)}
      res.send(result);
    }
  )
});

app.delete('/things', (req, res) => {
  db.collection('things').findOneAndDelete({restaurant: req.body.restaurant},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send({message: 'delete cafe'})
  })
})

/*app.delete('/things', (req, res) => {
  db.collection('things').findOneAndDelete({ thing: req.body.thing1[0]},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send({message: 'first thing deleted'})
  })
})

app.delete('/things', (req, res) => {
  db.collection('things').findOneAndDelete({ location: req.body.location[0]},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send({message: 'first location deleted'})
  })
})*/
