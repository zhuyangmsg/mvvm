# mvvm
是根据vue源码，编写的双向绑定框架
原理：第一步所有dom操作都在内存进行（fragment）。   第二步模板编译，把v-model和{{}}编译成数据     第三步数据劫持，当数据改变的时候模板发生变化（这里用到发布-订阅模式，当数据获取的时候，订阅消息，当改变数据的时候，发布消息）
