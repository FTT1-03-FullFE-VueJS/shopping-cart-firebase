const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/pages/home/script.js',
    login: './src/pages/login/script.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: './src/pages/home/index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'login/index.html',
      template: './src/pages/login/index.html',
      chunks: ['login']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 3.Inject styles into DOM
          'css-loader',   // 2.Turns css into commonjs
          'sass-loader'   // 1.Turns sass into css
        ]
        // "css-loader" khi nó tìm thất file css thì nó sẽ biên dịch file css đó thành file javascript
        // và sau đó nó được inject vào dome thông qua "style-loader"
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images"
          }
        }
      },
    ]
  }
}
