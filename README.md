#### Issue  
* cannot extract bootstrap to its own css, will be in bootstrap.bundle.js.  
If use extractText to extract style.css to own file, will load before bootstrap css in bootstrap.bundle.js.  
** fixed config all extractStyles: true in .bootstraprc

## Webpack boiler plate for Front-End projects

* `bundle.js` includes all react components and js in `./assets/js/*`.  
* `bundle.css` includes all stylesheets in `./assets/css/*`  
* `vendor.js` includes bootstrap, jquery, react, react-dom and react-router
* loader for `sass`, `css` and `scss`  

## Scripts
* Run `npm run build` to compile files  
* Run `npm start` to start webpack-dev server  

```js
var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'), //find template for inserting bundled file
    ExtractTextPlugin = require('extract-text-webpack-plugin'), //extract css to itself
    bootstrapEntryPoints = require('./webpack.bootstrap.config'); //load bootstrap

var isProd = process.env.NODE_ENV === "production";
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

//define libary for vendor in array
const VENDOR_LIBS = [
  bootstrapConfig, "react", "react-router", "react-dom"
];

module.exports = {
  //specify entry file
  entry: {
    bundle: './assets/js/app.js', //bundle.js for components and js files
    vendor: VENDOR_LIBS //vendor.js for libaray files
  },
  //output file
  output: {
    path: path.join(__dirname, 'public'), //output path
    filename: '[name].[hash].js' //output file name in hash
  },
  //loaders; work at file level; precompile, transpile, etc..
  module: {
    rules: [
      //bable transpile
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
      //sass, scss, css compiler, load from right to left
        test: /\.s?[ac]ss$/,
        use: ExtractTextPlugin.extract({
          loader: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        }),
        exclude: /node_modules/
      },
      //font file loader
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      //svg file loader
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      //import jquerys for bootstrap
      { 
        test: /bootstrap-sass\/assets\/javascripts\//, 
        use: 'imports-loader?jQuery=jquery' 
      },
    ]
  },
  //webpack plugins; work at the end of bundle or chunk level
  plugins: [
    //extract css to itself instead of including in bundle.js
    new ExtractTextPlugin('[name].css'),
    //create manifest and check for cashed bundled files  
    //check duplication code from bundle.js and vendor.js and refactor to remain only in vendor.js   
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    //tracks and auto insert bundled file using template
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    //binds jquery to webpack
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};

```