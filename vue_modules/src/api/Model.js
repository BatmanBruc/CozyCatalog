import Store from './Store.js';



class Model{
    constructor(nameStore){
        this.store = new Store(nameStore);
    }
    get(id){
        let res;
        if(id)
            res = this.store.get(id);
        else
            res = this.store.getAll();
        return res;
    }
    set(val){
        let res = this.store.set(val);
        res.onsuccess = ()=>{
            console.log(res.result)
        }
    }
    change(id,val){
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
                    console.log(res.result)
                }
            }
            if(!find)
                console.log('Не наидено продукта');
        }
    }
}

export default Model;