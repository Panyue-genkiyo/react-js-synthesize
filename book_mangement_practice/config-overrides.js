const {override, addDecoratorsLegacy, addBabelPlugin} = require('customize-cra');

module.exports = override(
    // 开启babel装饰器插件的两种方法
    // 直接使用 addDecoratorsLegacy() 或 使用 addBabelPlugin() 添加
    addDecoratorsLegacy()

    // addBabelPlugin 用来配置添加babel插件的
    // 这里以 @babel/plugin-proposal-decorators 插件为例， 这个插件是用来支持 es7 装饰器语法的
    // addBabelPlugin(
    //   ["@babel/plugin-proposal-decorators", { "legacy": true }]
    // )
)
