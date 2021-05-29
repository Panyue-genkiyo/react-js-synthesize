///配置代理服务器
//代理到本地5000
const  proxy = require('http-proxy-middleware')

module.exports = function (app){
    app.use(
       proxy ('/api1',
        {
           target:'http://localhost:5000',
            changeOrigin:true,
            pathRewrite:{'^/api1':''}
        }
    ));
}
