const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve:{
   extensions: ['.js','.jsx'],
   alias: {
    '@atoms': path.resolve(__dirname, 'src/components/atoms/'),
    '@molecules': path.resolve(__dirname, 'src/components/molecules/'),  
    '@templates': path.resolve(__dirname, 'src/components/templates/'),  
    '@styles': path.resolve(__dirname, 'src/styles/'),
    '@views': path.resolve(__dirname, 'src/views/'),
    '@services': path.resolve(__dirname, 'src/utils/services/'),
    '@hooks': path.resolve(__dirname, 'src/utils/hooks/'),
    '@icon': path.resolve(__dirname, 'src/assets/icon/'),
    '@images': path.resolve(__dirname, 'src/assets/images/'),
    '@context': path.resolve(__dirname, 'src/context/'),


  }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: 
        {
            loader: 'html-loader',
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/icon"),
          to: "assets/icon"
        },
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    })

  ],
  devServer: {
    host: '0.0.0.0',
    static: 
        {
            directory: path.join(__dirname, 'dist'),
        },
    compress: true,
    port: 3006
    },
};