var express = require('express');
var app = express();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || '46UYSI4I1Kds9kaqetgewr1Lg',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '1tIvwvVFGqHBv1HKMqSnBBjt4ZjoeVElbpGLOSU1nrrI5wZNMV',
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || '28005349-lL50cbIoDkUQm6Qi5iN95UL15sSnrjKkupIukZdhz',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'c6nsKwWddMk0S5OWz2bpGXuosiqHQOm9Lw5kJVSmuni3e'
});

app.use(express.static(__dirname + '/../public', { index: 'index.html' }));

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
