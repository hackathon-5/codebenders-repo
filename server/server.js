var express = require('express');
var app = express();
var request = require('request');
var _ = require('lodash');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.use(express.static(__dirname + '/../public', { index: 'index.html' }));

app.get('/api/disasters', function(req, res) {
  request.get('http://api.rwlabs.org:80/v1/disasters?limit=500&profile=full&preset=latest', { json: true }, function(e, r, b) {
    if(e) { return res.status(500).send(e); }
    var data = _.chain(b.data)
      .pluck('fields')
      .map(function(d) {
        return {
          name: d.name,
          description: d.description,
          type: d.primary_type,
          location: {
            lat: d.primary_country.location ? d.primary_country.location[1] : null,
            long: d.primary_country.location ? d.primary_country.location[0] : null,
            country: d.primary_country ? d.primary_country.name : null
          },
          date: d.date.created
        };
      })
      .value();
    res.send(data);
  });
});

app.get('/api/getTweets', function (req, res) {
  client.get('search/tweets', {q: req.query.from}, function(error, tweets, response) {
    if (error) {
      res.send({error: error});
    } else {
      res.send(tweets);
    }
  });
});

app.listen(process.env.PORT || 3000);
