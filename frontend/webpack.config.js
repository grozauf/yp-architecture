const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'auto',
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png', 'svg', 'ico', 'json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                auth: 'auth@http://localhost:3002/remoteEntry.js',
                profile: 'profile@http://localhost:3003/remoteEntry.js',
                cards: 'cards@http://localhost:3004/remoteEntry.js',
            },
            shared: { 
                react: { singleton: true }, 
                "react-dom": { singleton: true }, 
                "react-router-dom": { singleton: true } 
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/**/*.jpg",
                    to: "[name][ext]",
                },
                {
                    from: "public/**/*.png",
                    to: "[name][ext]",
                },
                {
                    from: "public/manifest.json",
                    to: "[name][ext]",
                },
                {
                    from: "public/favicon.ico",
                    to: "[name][ext]",
                },
            ],
        }),
    ]
};