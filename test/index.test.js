(async () => {
  const Lq = require('../index')
  const lq = new Lq(async (data) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(data)
        resolve()
      }, 2000)
    })
  })

  lq.add(1)
  lq.add(2)
  lq.add(3)
  await new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, 10000)
  })
  lq.add(4)
  lq.close()
  lq.add(5)
})()