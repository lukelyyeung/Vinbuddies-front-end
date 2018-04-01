const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel'
      }, {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader' // Run both loaders
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=25000'
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};