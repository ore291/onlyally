const webpack = require("webpack");

'use strict';


var rootCas = require('ssl-root-cas').create();

rootCas
  .addFile(__dirname + '/intermediate.pem')
  
 
// will work with all https requests will all libraries (i.e. request.js)
require('https').globalAgent.options.ca = rootCas;

module.exports = {
  
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos','cms.onlyally.com','cp.playjor.com','stackdiary.com', 'playjor.ams3.digitaloceanspaces.com'],
  },
}
