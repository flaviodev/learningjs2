var stores = ['negociacoes'];
var currentVersion = 1;
var dbName = 'aluraframe';

var migrations = [];
migrations[1] = { version: 1, migration: connection => stores.forEach(store => conection.createObjectStore(store))};

class ConnectionFactory {

    constructor() {
    
        throw new Error('Não é possível criar uma instância de Connection Factory');
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName,currentVersion);

            openRequest.onupgradeneeded = e => {
                
                console.log('Cria ou altera banco existente!');
                
                let onupgradeneededConnection = e.target.result;
                migrations[currentVersion].migration(onupgradeneededConnection);
            };
  
            openRequest.onsuccess = e => {

                resolve.apply(e.target.result);
            };
    
            openRequest.onerror = e => {
    
                reject.apply(e.target.console.error)
            };
        });
    }

}