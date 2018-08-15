var ConnectionFactory = (function() {
    let stores = ['negociacoes'];
    let currentVersion = 1;
    let dbName = 'aluraframe';

    let migrations = [];
    migrations[1] = { version: 1, migration: connection => stores.forEach(store => {
            if(connection.objectStoreNames.contains(store)) 
                connection.deleteObjectStore(store);

            connection.createObjectStore(store, { autoIncrement: true });
        })};

    let connection = null;

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

                    if(!connection) connection = e.target.result;
                    resolve(connection);
                };
        
                openRequest.onerror = e => {
        
                    reject(e.target.console.error.name);
                };
            });
        }

    }
})();