/**
 * observe.js
 */
function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(key => {
    definePrototype(data, key, data[key])
  })
}

function definePrototype(object, key, value) {
  observe(value)
  var dep = new Dep()
  Object.defineProperty(object, key, {
    set: (newVal) => {
      if (value === newVal) return
      value = newVal
      console.log('val is changed')
      // 添加订阅者
    },
    get: () => {
      dep.notify()
      return 'it is' + value 
    }
  })
}

/**
 * 收集订阅者
 */
function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub: (sub) => this.subs.push(sub),
  notify: () => {
    this.subs.forEach(sub => sub.update())
  }
}

/**
 * watcher.js
 */
function Watcher(vm,exp,cb) {
  this.cb = cb
  
}





var test = {name: 'leon'}
observe(test)