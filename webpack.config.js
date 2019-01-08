var path = require('path');
webpack = require('webpack');

module.exports = {

    resolve: {
        alias: {
            'masonry': 'masonry-layout',
            'isotope': 'isotope-layout'
        }
    },

    entry: {
        App: "./src/scripts/app.js",
        Vendor: "./src/scripts/vendor.js"
    },

    output: {
        path: path.resolve(__dirname, "./app/scripts"),
        filename: "[name].js"
    },

    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            },
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};