const path = require('path')
const Dotenv = require('dotenv-webpack')
const minimist = require('minimist')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const dotenv = require('dotenv')
const BabelConfig = require('./babel.config')
const packageJson = require('./package.json')

const OUTPUT_PATHS = {
  dev: 'dist-dev',
  staging: 'dist-staging',
  production: 'dist-production',
}

const ENV_PATHS = {
  dev: '.env.dev',
  staging: '.env.staging',
  production: '.env.production',
}

const OUTPUT_PUBLIC_PATH = 'output-public-path'

module.exports = (env) => {
  const argv = minimist(process.argv.slice(2), {
    default: {
      [OUTPUT_PUBLIC_PATH]: '/',
    },
  })

  const publicPath = argv[OUTPUT_PUBLIC_PATH]
  //eslint-disable-next-line
  const outputPath = OUTPUT_PATHS[(env && env.env) || ''] || 'dist'
  //eslint-disable-next-line
  const envPath = ENV_PATHS[(env && env.env) || ''] || '.env'
  dotenv.config({ path: envPath })

  const plugins = [
    ...[
      new OptimizeCSSAssetsPlugin(),
      new CopyPlugin([
        {
          from: './static/.well-known/**/*',
          to: './.well-known/',
          flatten: true,
        },
      ]),
      new Dotenv({
        path: envPath,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../bundle-size.html',
        openAnalyzer: false,
      }),
    ],
    ...(argv.mode === 'development'
      ? [
          new HtmlWebpackPlugin({
            template: './src/index.html',
          }),
        ]
      : []),
  ]

  return {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, outputPath),
      publicPath,
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          use: [
            {
              loader: 'babel-loader',
              options: BabelConfig,
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg|mp4|ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: (url) => {
                  if (argv.mode !== 'development') {
                    return `${
                      process.env.MICRO_FRONTEND_URL
                    }/${packageJson.name.replace('-micro-frontend', '')}/${url}`
                  } else {
                    return `/${url}`
                  }
                },
              },
            },
          ],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, './assets'),
        components: path.resolve(__dirname, './src/components'),
        constants: path.resolve(__dirname, './src/constants'),
        config: path.resolve(__dirname, './src/config'),
        generated: path.resolve(__dirname, './generated'),
        hooks: path.resolve(__dirname, './src/hooks'),
        pages: path.resolve(__dirname, './src/pages'),
        router: path.resolve(__dirname, './src/router'),
        theme: path.resolve(__dirname, './src/theme'),
        utils: path.resolve(__dirname, './src/utils'),
      },
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../node_modules'),
        'node_modules',
      ],
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devServer: {
      contentBase: './dist',
      port: 1234,
      historyApiFallback: {
        index: '/',
      },
    },
    plugins,
    stats: 'minimal',
  }
}
