'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('DateHelper', DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    throw new Error('Esta classe não pode ser instanciada');
                }

                _createClass(DateHelper, null, [{
                    key: 'textoParaData',
                    value: function textoParaData(dataTexto) {

                        if (!/\d{4}-\d{2}-\d{2}/.test(dataTexto)) throw new Error('Deve estar no formato aaaa-mm-dd');

                        // spread (esparrama) operator -> cada item do array passa a ser um parametro para o new Date
                        //    ex: o split devolve 3 elementos no array, o spread faz com que cada item do array seja 
                        //    um argumento da chamada de função -> new f(...a) = new f(a[0],a[1],a[2])
                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(dataTexto.split('-').map(function (item, i) {
                            return item - i % 2;
                        })))))();
                    }
                }, {
                    key: 'dataParaTexto',
                    value: function dataParaTexto(data) {

                        return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                    }
                }]);

                return DateHelper;
            }());

            _export('DateHelper', DateHelper);
        }
    };
});
//# sourceMappingURL=DateHelper.js.map