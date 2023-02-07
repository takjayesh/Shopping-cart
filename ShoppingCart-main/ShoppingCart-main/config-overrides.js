// module.exports = {
//     resolve : {
//          fallback : {
//                 "zlib": require.resolve("browserify-zlib") ,
//                 "querystring": require.resolve("querystring-es3"),
//                 "crypto": require.resolve("crypto-browserify"),
//                 "stream": require.resolve("stream-browserify"),
//                 "http": require.resolve("stream-http"),
//                 "path": require.resolve("path-browserify"),
//                 "url": require.resolve("url"),
//                 "buffer": require.resolve("buffer"),
//                 "util": require.resolve("util")
//                 // "zlib": false ,
//                 // "querystring": false,
//                 // "crypto": false,
//                 // "stream": false,
//                 // "http": false,
//                 // "path": false,
//                 // "url": false,
//                 // "buffer": false,
//                 // "util": false
//         }
//     }
// };


const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "zlib": require.resolve("browserify-zlib") ,
                "querystring": require.resolve("querystring-es3"),
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                "http": require.resolve("stream-http"),
                "path": require.resolve("path-browserify"),
                "url": require.resolve("url"),
                "buffer": require.resolve("buffer"),
                "util": require.resolve("util"),
                "assert": require.resolve("assert/")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}