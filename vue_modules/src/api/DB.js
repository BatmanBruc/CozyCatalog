import config from './config';
import stores from './stores'

class DB{
    constructor() {
        this.name = config['name'];
        this.version = config['version'];
        
        let openRequest = indexedDB.open(this.name, this.version);
        this.db;
        let cntx = this;
        openRequest.onupgradeneeded = function() {
            cntx.db = openRequest.result;
            for (let i = 0; i < config.length; i++) {
                const store = array[i];
                if (!cntx.db.objectStoreNames.contains(store['name'])) {
                    cntx.db.createObjectStore(store['name'], {keyPath: store['keyPath'], autoIncrement: store['autoIncrement']});
                }
            }
            
        };
        openRequest.onerror = function() {
            console.error("Error", openRequest.error);
        };
        
        openRequest.onsuccess = function() {
            cntx.db = openRequest.result;
        };
    }
    
    set(value){
        let transaction = this.db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.add(value);
        return request;
    }
    getAll(){
        let transaction = this.db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.getAll();
        return request;
    }
    get(id){
        let transaction = this.db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.get(id);
        return request;
    }
    delete(id){
        let transaction = this.db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.delete(id);
        return request;
    }
}

export default DB;