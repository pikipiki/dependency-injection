var createInjector = () => {

  var instanceCache = {}
  var providerCache = {}

  var constant = (name, value) => {
    instanceCache[name] = value
  }

  var factory = (name, factoryFn) => {
    providerCache[name] = factoryFn
  }

  var service = (name, Constructor) => {

    factory(name, () => {

      var instance = Object.create(Constructor.prototype)
      invoke(Constructor, instance)
      return instance

    })
    
  }

  var invoke = (fn, self) => {

    var argsString = fn.toString().match(/^\s*[^\(]*\(([^\)]*)\)/)[1];

    var argNames = argsString.split(',').map((argName) =>
      argName.replace(/\s*/g, ''))

    var args = argNames.map((argName) => {

      if (instanceCache.hasOwnProperty(argName)) {

        return instanceCache[argName]

      }

      if (providerCache.hasOwnProperty(argName)) {

        var provider = providerCache[argName]
        var instance = invoke(provider)

        instanceCache[argName] = instance
        return instance

      }

    })

    return fn.apply(self, args)

  }

  return {

    constant: constant,
    factory: factory,
    service: service,
    invoke: invoke

  }
}

module.exports = createInjector
