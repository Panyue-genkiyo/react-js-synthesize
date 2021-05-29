//注意这个配置代理文件的文件名不能改动
const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        //只要你的请求里面带有api1，请求就会进行转发
        proxy('/api1',{//遇见api1前缀的请求就会触发该代理配置
            target:'http://localhost:5000',//target代表请求转发的目的地址
            changeOrigin:true,//默认值false，控制器服务器收到的请求中host字段的值
            pathRewrite:{
                '^/api1':''
            } //重写请求路径(必须要重写请求路径注意)
        }),
        proxy('/api2',{
            target:'http://localhost:5001',
            changeOrigin:true,
            pathRewrite:{
                '^/api2':''
            }
        })
    )
}
