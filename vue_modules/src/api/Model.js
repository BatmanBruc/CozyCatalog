import DB from './DB.js';



class Model{

    constructor(){
        this.db = new DB();
    }
    get(id){
        let res;
        if(id)
            res = this.db.get(id);
        else
            res = this.db.getAll();
        return res;
    }
    set(val){
        let res = this.db.set(val);
        res.onsuccess = ()=>{
            console.log(res.result)
        }
    }
    change(id,val){
        let res = this.db.getAll();
        res.onsuccess = ()=>{
            let items = res.result;
            let find = false;
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                if(id == element['id']){
                    let resDel = this.db.delete(id);
                    resDel.onsuccess = ()=>{
                        val.id = id
                        res = this.db.set(val);
                        res.onsuccess = ()=>{
                            console.log(res.result)
                        }
                    }
                    find = true;
                }
            }
            if(!find)
                console.log('Не наидено продукта');
        }
    }
}

export default Model;