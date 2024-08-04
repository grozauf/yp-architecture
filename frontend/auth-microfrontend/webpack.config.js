const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
    output: {
        publicPath: 'auto',
    },
    mode: 'development',
    devServer: {
        port: 3002,
        contentBase: path.join(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // if you're using React
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
                test: /\.svg$/,
                type: "asset/inline",
                // Inline assets with the "inline" query parameter.
                resourceQuery: /inline/,
            },
            {oneOf: [
                {
                    test: /\.svg$/,
                    type: "asset/inline",
                    // ...
                },
                {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource'
                    // ...
                },
            ]},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './Register': './src/components/Register',
                './Login': './src/components/Login',
                './InfoTooltip': './src/components/InfoTooltip'
            },
            shared: { 
                "react": { singleton: true }, 
                "react-dom": { singleton: true }, 
                "react-router-dom": { singleton: true }
            },
        })
    ]
};