"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// o bind retorna um proxy do model relacionando-o com o seu respectivo view, e as propriedades do model que devem atualizar a view
var Bind = function Bind(model, view) {
   _classCallCheck(this, Bind);

   for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      props[_key - 2] = arguments[_key];
   }

   var proxy = ProxyFactory.create(model, props, function (model) {
      return view.update(model);
   });

   view.update(model);

   // recurso interessanto do js, o qual permite um método construtor ter um retorno
   //    sendo que nesse caso o objeto do retorno é totalmente diferente do tipo da classe do construtor 
   return proxy;
};
//# sourceMappingURL=Bind.js.map