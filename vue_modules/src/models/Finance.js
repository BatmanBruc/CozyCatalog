import Model from '../api/Model.js';

class Finance extends Model {
    constructor(){
        super('products');
    }
    get(callback){
        let res = super.get();
        res.onsuccess = ()=>{
            let assocMonths = {};
            let months = [];
            for (let index = 0; index < res.result.length; index++) {
                let element = res.result[index];
                if(!assocMonths[element.update_at]){
                    assocMonths[element.update_at]= {};
                    assocMonths[element.update_at]['finance'] = 0;
                    assocMonths[element.update_at]['list'] = [];
                }
                assocMonths[element.update_at]['month'] = new Date(1594737244615).getMonth();
                assocMonths[element.update_at]['list'].push(
                    {
                        name: element.name,
                        price: element.price,
                        img: element.file
                    }
                )
                assocMonths[element.update_at]['finance'] = assocMonths[element.update_at]['finance'] + Number(element.price);
            }
            for (let key in assocMonths) {
                months.push(assocMonths[key]);
            }
            console.log(months);
            callback(months);
        }
    }
}

export default new Finance;