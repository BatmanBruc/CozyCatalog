import Model from '../api/Model.js';

class Product extends Model {
    constructor(){
        super('products');
    }
    search(valInput, callback){
        let res = super.get();
        res.onsuccess = ()=>{
            if(valInput){
                let products = [];
                for (let index = 0; index < res.result.length; index++) {
                    let element = res.result[index];
                    if(element['name'].indexOf(valInput) != -1){
                        products.push(element);
                        continue;
                    }else if(element['id'] == valInput){
                        products.push(element);
                    }
                }
                callback(products);
            }else{
                callback(res.result);
            }
            
        }
    }
}

export default new Product;