var HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html-webpack-plugin插件
const path = require('path');// 引入全局路径  require是commonjs语法  引入模块等价es6 import
// module.exports = {
//   //entry: './a.js',  //表示现在要被打包的文件,只打包一个文件
//   entry:['./a.js','./b.js'], //打包多个文件到一个文件，多对一的情况
//   output: {
//     filename: 'bundle.js',  // 表示打包后生成的文件名
//     path: path.resolve(__dirname, 'dist') // 表示打包后生成的文件的输出路径  该路径直接指向当前的项目目录
//   }
// };
module.exports = {
  entry:{     //打包多个文件到多个文件，一对一的情况，下面对象的键值可以自己命名，对应下面的name
    a: './a.js',
    b: './b.js',
    c: './c.js'
  },
  output: {
    filename: '[name].bundle.js',  // 表示打包后生成的文件名，[name]固定写法
    path: path.resolve(__dirname, 'dist') // 表示打包后生成的文件的输出路径  该路径直接指向当前的项目目录
  },
  module: {
    rules: [ //数组包对象，定义多个loader规则
      {
        test: /\.css$/, //定义.css文件规则
        use: [
          {
            loader: 'style-loader' 
          },
          {
            loader: 'css-loader' 
          }
        ]
      },
      {
        test: /\.scss|.sass$/,  //定义.scss和.sass文件规则
        use: [ 'style-loader', 'css-loader','sass-loader']
      },
      {
        test: /\.less$/,  //定义.less文件规则
        use: [ 'style-loader', 'css-loader','less-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/, //定义.png/.jpg/.gif/.svg文件规则
        use: [
          {
            loader: 'file-loader',
            options: {
              //name:'mc03.jpg', //将打包图片定义为一个固定文件名，如果是多个图片则按照引用顺序，最后一个图片将之前的图片全部替换掉
              name: '[name].[ext]', // 自定义了打包生成后的文件名,[name]表示之前的文件名   [hash]表示随机生成的hash值   [ext]表示文件的扩展名
              outputPath: 'img/' // 我们可以自定义打包后文件的输出路径
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //每个页面都需要实例化一下此插件重新定义
    new HtmlWebpackPlugin({  //使用此插件，无需将js文件在模板文件进行引入，此插件可以自定义引入哪些js，默认是所有
      title: '测试首页', //定义页面title
      filename: 'html/index.html', //定义打包后文件的名称及目录
      template: './index.html',   //定义模板文件，即要打包的文件
      inject: 'head', //默认将引入文件放到body中，也可以设置到head中，四个值true | head | body | false
      //chunks: ['a','b'], //仅允许添加一些块
      excludeChunks: ['c'], //允许跳过一些块，也就是不加载某些js
      minify: false   //定义压缩方式，默认为true，定义为false则不进行压缩
    }),
    new HtmlWebpackPlugin({
      title: '列表页', //定义页面title
      filename: 'html/list.html', //定义打包后文件的名称及目录,此目录是针对output的目录来创建的目录
      template: './list.html',   //定义模板文件，即要打包的文件
      chunks:['a']
    })
  ]
};
