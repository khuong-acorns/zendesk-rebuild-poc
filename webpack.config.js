const path = require('path')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')

const Dotenv = require('dotenv-webpack')
const minimist = require('minimist')

const ejs = require('ejs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DEVELOPMENT_MODE = 'development'

const PRODUCTION_MODE = 'production'

const OUTPUT_PUBLIC_PATH = 'output-public-path'

module.exports = (env, args) => {
  const argv = minimist(process.argv.slice(2), {
    default: {
      [OUTPUT_PUBLIC_PATH]: '/',
    },
  })

  const { stage = '' } = args
  const envPath = stage ? `./.env.${stage}` : './.env'
  const publicPath = argv[OUTPUT_PUBLIC_PATH]

  return {
    mode: process.env.BUILD_ENV === PRODUCTION_MODE ? PRODUCTION_MODE : DEVELOPMENT_MODE,
    entry: {
      client: './src/index.tsx',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: publicPath,
      libraryTarget: 'umd',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader',
          options: {
            configFile: 'tsconfig.json',
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg|ttf|eot|woff|woff2)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ]
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ],
        }
      ]
    },
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js']
    },
    devServer: {
      contentBase: './dist',
      port: 1234,
      historyApiFallback: {
        index: '/'
      },
      disableHostCheck: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new Dotenv({
        path: envPath,
      }),
      new CopyPlugin([
        {
          from: './src/index.html',
          transform: (contents, filename) => {
            return ejs.render(contents.toString(), {
              publicPath: publicPath,
              process: {
                env: process.env,
              },
            }, {
              cache: true,
              filename,
            })
          }
        },
        {
          from: './src/assets/favicon.ico'
        },
      ]),
      new HtmlWebpackPlugin({
       template: 'src/index.html',
       templateParameters: {
         publicPath
        }
     }),
    ],
  };
}
