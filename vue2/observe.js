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
      dep.notify() // 数据变化 通知订阅者
    },
    get: () => {
      if (Dep.target) {
        dep.addSub(Dep.target) // 添加一个订阅者
      }
      return value 
    }
  })
}

Dep.target = null

/**
 * 收集订阅者
 */
function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  notify: function() {
    this.subs.forEach(sub => sub.update())
  }
}

/**
 * watcher.js
 */
function Watcher(vm,exp,cb) {
  this.cb = cb
  this.vm = vm
  this.exp = exp
  this.value = this.get()
}

Watcher.prototype = {
  update: function() {
    this.run()
  },
  run: function() {
    var value = this.vm.data[this.exp]
    var oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  },
  get: function() {
    Dep.target = this
    var value = this.vm.data[this.exp]
    Dep.target = null
    return value
  }
}

function seed(data,el,exp) {
  this.data = data
  observe(data)
  el.innerHTML = this.data[exp]
  new Watcher(this, exp, function(value) {
    el.innerHTML = value
  })
  return this
}