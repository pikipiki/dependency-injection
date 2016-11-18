function createInjector() {
  var instanceCache = {}
  var providerCache = {}

  function constant(name, value) {
    instanceCache[name]= value;
  }

  function factory(name, factoryFn) {
    providerCache[name] = factoryFn;
  }

  function service(name, Constructor) {
    factory(name, function() {
      var instance = Object.create(Constructor.prototype);
      invoke(Constructor, instance);
      return instance;
    });
  }

  function invoke(fn, self) {
    var argsString = fn.toString()
      .match(/^function\s*[^\(]*\(([^\)]*)\)/)[1];
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

  return { constant, factory, service, invoke, }
}

module.exports = createInjector
