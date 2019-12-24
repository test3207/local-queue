# 本地队列

## 介绍

基于内存的本地任务队列，适用于简单的单例项目；如果有多副本的需求，请考虑使用redis的[bull](https://github.com/OptimalBits/bull)（或者对bull的一个[简单封装](https://github.com/test3207/queue-manager)）

## 用法

### 安装

```bash
npm install local-queue
```

### 样例

```javascript
const Lq = require('local-queue')
const processor = async (data) => {
  // 自定义的任务函数
}
const lq = new Lq(processor) // 初始化队列实例

lq.add('testdata1') // 通过add为队列添加任务，添加的内容将会传入processor作为data参数
lq.add('testdata2')
lq.add('testdata3')

// lq.close() // 关闭队列，不推荐，毕竟也没想到什么场景下会需要关闭，没有考虑边界问题
```
