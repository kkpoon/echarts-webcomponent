const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        main: './src/index.js',
        bundled: './src/bundle.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: "EChartsWebComponent",
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: ["babel-loader"]
        }]
    }
};
