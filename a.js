//commonjs的引入写法
//const css = require('./css.css'); //js中引入css，需要安装css-loader和style-loader
//const css = require('style-loader!css-loader!./index.css'); //执行顺序，由右至左，先将css文件通过css-loader进行解析，然后用style-loader解析，如果顺序写反会报错，一般不在这里配置，在webpack.config.js中进行配置
//es6 import的引入写法，推荐使用此种引入方法
 //相对路径，./表示当前目录，../表示父级目录，/表示根目录绝对路径
import css from './css/css.css';
function a(){
    console.log('hello world');
}
a();