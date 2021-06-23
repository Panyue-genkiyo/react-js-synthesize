const { createProxyMiddleware } = require('http-proxy-middleware');
//跨域代理
module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8083',
        changeOrigin: true,
        pathRewrite: {'^/api':''}
    }))
};
