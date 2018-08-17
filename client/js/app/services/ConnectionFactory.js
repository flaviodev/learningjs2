'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// module pattern -> isola os atritubos das função, pois uma vez que es6 não possui variaveis 
//    estáticas essa é a forma de criar variáveis acessíveis em um escopo estático de forma isolada
var ConnectionFactory = function () {
    var stores = ['negociacoes'];
    var currentVersion = 1;
    var dbName = 'aluraframe';

    var migrations = [];
    migrations[1] = { version: 1, migration: function migration(connection) {
            return stores.forEach(function (store) {
                if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

                connection.createObjectStore(store, { autoIncrement: true });
            });
        } };

    var connection = null;
    var close = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error('Não é possível criar uma instância de Connection Factory');
        }

        _createClass(ConnectionFactory, null, [{
            key: 'getConnection',
            value: function getConnection() {

                // exemplo de como criar uma promisse
                return new Promise(function (resolve, reject) {

                    var openRequest = window.indexedDB.open(dbName, currentVersion);

                    openRequest.onupgradeneeded = function (e) {

                        console.log('Cria ou altera banco existente!');
                        migrations[currentVersion].migration(e.target.result);
                    };

                    openRequest.onsuccess = function (e) {

                        if (!connection) {
                            connection = e.target.result;
                            close = connection.close.bind(connection);

                            // monkey patch -> override da função
                            connection.close = function () {
                                throw new Error('Você não pode fechar a conexão diretamente');
                            };
                        }
                        resolve(connection);
                    };

                    openRequest.onerror = function (e) {

                        reject(e.target.console.error.name);
                    };
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {

                if (connection) {

                    close();
                    connection = null;
                    close = null;
                }
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map