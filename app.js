var createInjector = require('./injector')

function goToEat() {
  console.log('Nom nom')
}

function hungryPerson(decision) {
  this.action = decision
}

hungryPerson.prototype.followSmell = function() {
  this._hungry = true
}

hungryPerson.prototype.backToWork = function() {
  this._hungry = false
}

hungryPerson.prototype.eat = function() {

  if (this._hungry) {

    this.action()

  }
  
}

function hungryMode(person) {
  person.followSmell()
  person.eat()
  person.backToWork()
}


var injector = createInjector()
injector.service('person', hungryPerson)
injector.constant('decision', goToEat)
injector.invoke(hungryMode)
