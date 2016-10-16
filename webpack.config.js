// this object is the common configuration for webpack whether it is
// used in production or development
const commonConfig = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: './server/public/'
  },
  module: {
    loaders: [
    {
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel'
    }
  ]
}
}

// this is the dev setup we want our webpack to have 
const devConfig = {
  devtool: 'source-maps',
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './server/public/'
  }
}

const config = {};

// this is how we can see if webpack should be used in production mode
// or if it should be used in a developer mode
// if TARGET is 'build' -> production mode
// if TARGET is 'dev' -> development mode
const TARGET = process.env.npm_lifecycle_event;
switch (TARGET) {
  case 'dev' :
    Object.assign(config, commonConfig, devConfig);
    break;
  default : 
    Object.assign(config, commonConfig);
} 

module.exports = config;

