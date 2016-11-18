var createInjector = require('./injector')

function nomnom() {
  console.log('Nom Nom');
}

function Burger(name) {
  this.selection = name
}

Burger.prototype.followSmell = function() {
  this._followSmell = true
}

Burger.prototype.checkState = function() {
  this._checkState = true
}

Burger.prototype.eat = function() {
  if (this._checkState) {
    nomnom()
  }
}

function hungryMode(toBurgerKing) {
  toBurgerKing.followSmell()
  toBurgerKing.checkState()
  toBurgerKing.eat()
}

var injector = createInjector()
injector.service('toBurgerKing', Burger)
injector.constant('name', nomnom)
injector.invoke(hungryMode)
