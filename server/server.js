var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../public', { index: 'index.html' }));

app.listen(process.env.PORT || 3000);
