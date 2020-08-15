import Model from '../api/Model.js';

class Product extends Model {
    constructor(){
        super('products');
    }
    getRangePrice(callback){
        let res = super.get();
        res.onsuccess = ()=>{
            let result = res.result;
            for (var i = 0, endI = result.length - 1; i < endI; i++) {
                for (var j = 0, endJ = endI - i; j < endJ; j++) {
                    if (Number(result[j]['price']) > Number(result[j + 1]['price'])) {
                        var swap = result[j];
                        result[j] = result[j + 1];
                        result[j + 1] = swap;
                    }
                }
            }
            callback(result[0], result[result.length-1]);
        }
    }
    search(valInput, filter, sort, callback){
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
            if(sort){
                switch(sort) {
                    case 'priceUp':
                        for (var i = 0, endI = result.length - 1; i < endI; i++) {
                            for (var j = 0, endJ = endI - i; j < endJ; j++) {
                                if (Number(result[j]['price']) > Number(result[j + 1]['price'])) {
                                    var swap = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = swap;
                                }
                            }
                        }
                        break;       
                    case 'priceDown':  
                        for (var i = 0, endI = result.length - 1; i < endI; i++) {
                            for (var j = 0, endJ = endI - i; j < endJ; j++) {
                                if (result[j]['price'] < result[j + 1]['price']) {
                                    var swap = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = swap;
                                }
                            }
                        }
                        break;       

                    case 'nameUp':
                        for (var i = 0, endI = result.length - 1; i < endI; i++) {
                            for (var j = 0, endJ = endI - i; j < endJ; j++) {
                                if (Number(result[j]['name']) > Number(result[j + 1]['name'])) {
                                    var swap = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = swap;
                                }
                            }
                        }
                        break;       

                    case 'nameDown':
                        for (var i = 0, endI = result.length - 1; i < endI; i++) {
                            for (var j = 0, endJ = endI - i; j < endJ; j++) {
                                if (result[j]['name'] < result[j + 1]['name']) {
                                    var swap = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = swap;
                                }
                            }
                        }
                        break;       

                  }
            }
            callback(result);
        }
    }
}

export default new Product;