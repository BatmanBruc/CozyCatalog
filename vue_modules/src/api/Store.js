import config from './config';
import stores from './stores'

this.name = config['name'];
this.version = config['version'];

let openRequest = indexedDB.open(this.name, this.version);
let db;
openRequest.onupgradeneeded = function() {
    db = openRequest.result;
    for (let i = 0; i < stores.length; i++) {
        const store = stores[i];
        if (!db.objectStoreNames.contains(store['name'])) {
            db.createObjectStore(store['name'], {keyPath: store['keyPath'], autoIncrement: store['autoIncrement']});
        }
    }
    
};
openRequest.onerror = function() {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
    db = openRequest.result;
};

class Store{
    constructor(name) {
        this.name = name;
    }
    set(value){
        let transaction = db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.add(value);
        return request;
    }
    getAll(){
        let transaction = db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.getAll();
        return request;
    }
    get(id){
        let transaction = db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.get(id);
        return request;
    }
    delete(id){
        let transaction = db.transaction(this.name, "readwrite");
        let items = transaction.objectStore(this.name);
        let request = items.delete(id);
        return request;
    }
}

export default Store;