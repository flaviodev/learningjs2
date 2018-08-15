var ConnectionFactory = (function() {
    const stores = ['negociacoes'];
    const currentVersion = 1;
    const dbName = 'aluraframe';

    const migrations = [];
    migrations[1] = { version: 1, migration: connection => stores.forEach(store => {
            if(connection.objectStoreNames.contains(store)) 
                connection.deleteObjectStore(store);

            connection.createObjectStore(store, { autoIncrement: true });
        })};

    let connection = null;
    let close = null;

    return class ConnectionFactory {

        constructor() {
        
            throw new Error('Não é possível criar uma instância de Connection Factory');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName,currentVersion);

                openRequest.onupgradeneeded = e => {
                    
                    console.log('Cria ou altera banco existente!');
                    migrations[currentVersion].migration(e.target.result);
                };
    
                openRequest.onsuccess = e => {

                    if(!connection) { 
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Você não pode fechar a conexão diretamente');
                        }
                    }
                    resolve(connection);
                };
        
                openRequest.onerror = e => {
        
                    reject(e.target.console.error.name);
                };
            });
        }

        static closeConnection(){

            if(connection){

                close();
                connection = null;
                close = null;
            }
        }

    }
})();