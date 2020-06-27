class DB{
    constructor(name, version, keyPath, autoIncrement) {
        this.name = name;

        let openRequest = indexedDB.open(this.name, version);
        this.db;
        let cntx = this;
        openRequest.onupgradeneeded = function() {
            cntx.db = openRequest.result;
            switch(cntx.db.version) {
                case 0:
                    console.log('Иницилизация');
                case 1:
                    console.log('Обновление');
            }
            if (!cntx.db.objectStoreNames.contains(cntx.name)) {
                cntx.db.createObjectStore(cntx.name, {keyPath: keyPath, autoIncrement: autoIncrement});
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