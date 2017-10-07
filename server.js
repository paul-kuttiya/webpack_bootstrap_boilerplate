const app = require('express')();
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

//dev server
const open = require('open');
const port = 3000;

app.use(webpackMiddleware(webpack(webpackConfig)));
app.listen(port, () => open(`http://localhost:${port}`));
