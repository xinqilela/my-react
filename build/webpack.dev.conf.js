var path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowerSyncPlugin = require('browser-sync-webpack-plugin');

var rootPath = path.resolve(__dirname, '..'),
    src = path.join(rootPath, 'src');

config.output.filename = '[name].[id]';
config.output.chunkFilename = '[id].js';

//热重载依赖代码
config.entry.app = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

config.output.publicPath = '/';

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'body',
        template: path.join(src, 'index.html'),
        chunksSortMode: 'node'
    }),
    new BrowerSyncPlugin({
        host: '127.0.0.1',
        port: 8088,
        proxy: 'http://127.0.0.1:9000/',
        logConnections: false,
        notify: false
    }, {
        reload: false
    })
);

module.exports = config;
