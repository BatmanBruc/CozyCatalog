import Model from '../api/Model.js';

class Product extends Model {
    constructor(){
        super('products');
    }
    search(valInput, filter, callback){
        let res = super.get();
        res.onsuccess = ()=>{
            let result = res.result;
            if(valInput){
                let products = [];
                for (let index = 0; index < result.length; index++) {
                    let element = result[index];
                    if(element['name'].indexOf(valInput) != -1){
                        products.push(element);
                        continue;
                    }else if(element['id'] == valInput){
                        products.push(element);
                    }
                }
                result = products;
            }
            if(filter){
                let products = [];
                for (let index = 0; index < result.length; index++) {
                    let element = result[index];
                    let skip = true;
                    for (let i = 0; i < filter.length; i++) {
                        let property = filter[i];
                        let key = property.split('=')[0];
                        let value = property.split('=')[1];
                        if(element[key] == value){
                            skip = false;
                            break;
                        }               
                    }
                    if(skip)
                        continue;
                    else
                        products.push(element);
                }
                result = products;
            }
            callback(result);
            
            
        }
    }
}

export default new Product;