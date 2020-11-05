import Store from './Store.js';



class Model{
    constructor(nameStore){
        this.store = new Store(nameStore);
    }
    async get(id){
        let res;
        if(id)
            res = await this.store.get(id);
        else
            res = await this.store.getAll();
        return res;
    }
    set(val){
        let res = this.store.set(val);
        return res;
    }
    change(id, val, callback){
        let res = this.store.get(id);
        res.onsuccess = ()=>{
            let item = res.result;
            for (let key in item){
                if(val.hasOwnProperty(key)){
                    item[key] = val[key];
                }
            }
            let resDel = this.store.delete(id);
            resDel.onsuccess = ()=>{
                val.id = id
                res = this.store.set(item);
                res.onsuccess = ()=>{
                    if(callback)
                        callback();
                }
            }
            if(!find)
                console.log('Не наидено продукта');
        }
    }
}

export default Model;