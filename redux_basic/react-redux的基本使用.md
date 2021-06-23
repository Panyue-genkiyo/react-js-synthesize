## 求和案例react_redux的基本使用
    (1):明确两个概念：
        1.ui组件:不能使用任何redux的api,只负责页面的呈现，交互等
        2.容器组件:负责和redux通信,将结果交给UI组件
    (2):如何创建一个容器组件---靠react-redux的connent函数
          connent(mapStateToProps,mapDispatchToProps)(ui组件)
          -mapStateToProps:映射状态，返回值是一个对象 --->该方法会默认传递保存在redux中的状态参数值
          -mapDispatchToProps:映射操作状态的方法，返回值是一个对象 --->该方法会默认传递分发(store.dispatch)
    (3):备注:容器组件中的store是靠props传进去的,而不是在容器组件中直接引入
            mapDispatchToProps也可以简写为一个对象,react-redux能够自动分发action

### 优化
        (1).容器组件和UI组件整合为一个文件
        (2).无需自己给容器组件传递store.给App包裹一个<Provider store={store}>即可
        (3).使用了react-redux之后再也不用自己检测redux中的状态改变了，容器组件可以自动完成这个工作
        (4).mapDispatchToProps可以简写为一个对象
        (5).一个组件要和redux打交道要经过哪几步?
            1.定义好UI组件----不暴露
            2.引入connent生成一个容器组件.并暴露,写法如下
               connenct(
                 state => ({key:value}),//映射状态
                 {key:xxxxxAction} //映射操作状态的方法
               )(UI组件)
            3.在UI组件中通过this.props.xxxxx读取和操纵状态

### 求和案例react_redux数据共享版
       (1).定义一个Person组件,和Count组件通过redux共享数据
       (2).为Person组件编写:reducer,action,和配置constant常量
       (3).重点:Person的reducer和Count的reducer要使用combineReducer进行合并
           合并后的总状态是一个对象
       (4).交给store的是总reducer，最后注意在组件中取出状态的时候，记得取到位


