console.log('start')
setImmediate(() => {
  console.log('immediate1')
})
setTimeout(() => {
  console.log('timeout1')
})
Promise.resolve().then(() => {
  console.log('promise then')
})
process.nextTick(() => {
  console.log('nextTick')
})
console.log('end')
