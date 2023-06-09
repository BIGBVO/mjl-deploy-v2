// Allow us to use babel

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                use: [
                  'file-loader',
                ],
            }
        ]
    }
}