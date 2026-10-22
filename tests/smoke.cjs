const createInjector = require("../injector");

const injector = createInjector();
injector.constant("answer", 42);

injector.factory("double", (answer) => answer * 2);

let seen;
injector.invoke(function double(double) {
  seen = double;
}, null);

if (seen !== 84) {
  throw new Error(`expected 84, got ${seen}`);
}
