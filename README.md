# local-queue

[简体中文](https://github.com/test3207/local-queue/blob/master/README.zh-CN.md)

## Introduction

A simple local-queue based on memory which suits simple single instance project.

If replicas interest you,consider [bull](https://github.com/OptimalBits/bull) based on redis.(Or a [package](https://github.com/test3207/queue-manager) based on bull?)

## Usage

### Installation

```bash
npm install local-queue
```

### Example

```javascript
const Lq = require('local-queue')
const processor = async (data) => {
  // Customized function
}
const lq = new Lq(processor) // Init queue instance

lq.add('testdata1') // Add jobs for the queue by this add function.Param here will pass to processor later.
lq.add('testdata2')
lq.add('testdata3')

// lq.close() // Close the queue.Not recommended since I can't imagine the situation.Potential problems might happen.
```
