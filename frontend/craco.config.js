const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "fs": false,
        "path": false,
        "os": false,
        "crypto": false,
        "stream": false,
        "buffer": false,
        "util": false,
        "assert": false,
        "http": false,
        "https": false,
        "url": false,
        "zlib": false,
        "querystring": false,
        "net": false,
        "tls": false,
        "child_process": false,
      };

      // Add alias for pako constants
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        './constants': path.resolve(__dirname, 'node_modules/pako/lib/zlib/constants.js'),
      };

      return webpackConfig;
    },
  },
};
