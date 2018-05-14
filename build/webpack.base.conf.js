var path = require('path'),
    webpack = require('webpack');

var rootPath = path.resolve(__dirname, '..'),
    src = path.join(rootPath, 'src'),
    env = process.env.NODE_ENV.trim();

var commonPath = {
    rootPath: rootPath,
    dist: path.join(rootPath, 'dist'),
    indexHTML: path.join(src, 'index.html'),
    staticDir: path.join(rootPath, 'static')
};

module.exports = {
    entry: {
        app: path.join(src, 'app.js')
    },
    output: {
        path: path.join(commonPath.dist, 'static'),
        publicPath: '/dist/static'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            COMPONENT: path.join(src, 'components'),
            ACTION: path.join(src, 'redux/actions'),
            REDUCER: path.join(src, 'redux/reducers'),
            STORE: path.join(src, 'redux/store'),
            SERVICE: path.join(src, 'redux/services'),
            NODE_MODULES: path.join(src, 'node_modules')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: (function () {
                    var _loaders = ['babel-loader?' + JSON.stringify({
                        cacheDirectory: true,
                        plugin: [
                            'transform-runtime',
                            'transform-decorators-legacy'
                        ],
                        presets: ['es2015', 'react', 'stage-0'],
                        env: {
                            production: {
                                presets: ['react-optimize']
                            }
                        }
                    })];
                    if (env === 'development') {
                        _loaders.unshift('react-hot-loader');
                    }
                    return _loaders;
                })(),
                include: src,
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __DEV__: env === 'development',
            __PROD__: env === 'production',
            __COMPONENZT_DEVTOOLS__: false,
            __WHY_DID_YOU_UPDATE__: false
        })
    ]
};

