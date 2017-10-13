var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    bootstrapEntryPoints = require('./webpack.bootstrap.config');

// var isProd = process.env.NODE_ENV === "production";
// var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

const VENDOR_LIB = [
  "react", "react-router", "react-dom"
];

module.exports = {
  entry: {
    bundle: './assets/js/app.js',
    bootstrap: bootstrapEntryPoints.dev,
    vendor: VENDOR_LIB
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
    // filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?[ac]ss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        }),
        exclude: /node_modules/
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&name=fonts/[name].[ext]',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
      { 
        test: /bootstrap-sass\/assets\/javascripts\//, 
        use: 'imports-loader?jQuery=jquery' ,
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    //chunk plugin
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'bootstrap']
      // names: ['vendor', 'manifest']
    })
  ]
};
