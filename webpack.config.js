const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: '/src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module:{
    rules:[
      {
        test:/\.css/i,
        use:["style-loader","css-loader"]
      }
    ]
  },
  mode:"development",
  plugins: [new HtmlWebpackPlugin()],
};