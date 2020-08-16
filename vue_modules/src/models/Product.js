import Model from '../api/Model.js';

class Product extends Model {
    constructor(){
        super('products');
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
                                    console.log(swap);
                                    console.log(result[j + 1]);
                                    result[j] = result[j + 1];
                                    result[j + 1] = swap;
                                    console.log('result[0]: ' + result[0]['price']);
                                    console.log('result[1]: ' + result[1]['price']);
                                    console.log('result[2]: ' + result[2]['price']);
                                    console.log('result[3]: ' + result[3]['price']);
                                }
                            }
                        }
                        console.log('result[0]: ' + result[0]['price']);
                        console.log('result[1]: ' + result[1]['price']);
                        console.log('result[2]: ' + result[2]['price']);
                        console.log('result[3]: ' + result[3]['price']);
                        console.log(result);            
                    case 'priceDown': 
                        console.log('priceDown');
                        // for (var i = 0, endI = result.length - 1; i < endI; i++) {
                        //     for (var j = 0, endJ = endI - i; j < endJ; j++) {
                        //         if (result[j]['price'] < result[j + 1]['price']) {
                        //             var swap = result[j];
                        //             result[j] = result[j + 1];
                        //             result[j + 1] = swap;
                        //         }
                        //     }
                        // } 
                    case 'nameUp':

                    case 'nameDown':

                  }
            }
            console.log('==========')
            console.log('result[0]: ' + result[0]['price']);
            console.log('result[1]: ' + result[1]['price']);
            console.log('result[2]: ' + result[2]['price']);
            console.log('result[3]: ' + result[3]['price']);
            callback(result);
        }
    }
}

export default new Product;