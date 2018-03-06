

const devConfig = require('./webpack.config.js');
const path = require('path');

var prodConfig = devConfig;

prodConfig.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
};

module.exports = prodConfig;
