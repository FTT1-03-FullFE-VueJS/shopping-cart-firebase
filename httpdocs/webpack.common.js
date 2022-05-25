const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/pages/home/script.js',
    login: './src/pages/login/script.js',
    listPost: './src/pages/admin/post/list/script.js',
    createPost: './src/pages/admin/post/create/script.js',
    editPost: './src/pages/admin/post/edit/script.js',
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
    new HtmlWebpackPlugin({
      title: 'List Post',
      filename: 'admin/post/list/index.html',
      template: './src/pages/admin/post/list/index.html',
      chunks: ['listPost']
    }),
    new HtmlWebpackPlugin({
      title: 'Create Post',
      filename: 'admin/post/create/index.html',
      template: './src/pages/admin/post/create/index.html',
      chunks: ['createPost']
    }),
    new HtmlWebpackPlugin({
      title: 'Edit Post',
      filename: 'admin/post/edit/index.html',
      template: './src/pages/admin/post/edit/index.html',
      chunks: ['editPost']
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
