// require('dotenv').config();
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MinifyPlugin = require("babel-minify-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require('brotli-webpack-plugin');
module.exports = env => {
  return {
    entry: {
      main: ["./src/main.js"],
      payments: ["./src/scripts/stripe.js"]
    },
    mode: "production",
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "../dist"),
      publicPath: "/"
    },
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.js$/,
        use: [{
          loader: "babel-loader"
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: "css-loader"
        }
        ]
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              config: {
                path: './config/postcss.config.js'
              }
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },

      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            attrs: ["img:src"]
          }
        }]
      },
      {
        test: /\.pug$/,
        use: [{
          loader: "pug-loader"
        }]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]"
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      }

      ]
    },
    plugins: [
      new OptimizeCssAssetsPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env.NODE_ENV)
        }
      }),
      new MinifyPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    }
  }
}