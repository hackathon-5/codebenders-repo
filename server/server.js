var express = require('express');
var app = express();
var request = require('request');
var _ = require('lodash');

app.use(express.static(__dirname + '/../public', { index: 'index.html' }));

app.get('/api/disasters', function(req, res) {
  request.get('http://api.rwlabs.org:80/v1/disasters?limit=1000&profile=full&preset=latest', { json: true }, function(e, r, b) {
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
          }
        };
      })
      .value();
    res.send(data);     
  });
});
app.listen(process.env.PORT || 3000);
