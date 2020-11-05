import Model from '../api/Model.js';

class Finance extends Model {
    constructor(){
        super('products');
    }
    async get(callback){
        let res = await super.get();
        res.onsuccess = ()=>{
            let assocMonths = {};
            let months = [];
            console.log(res.result);
            for (let index = 0; index < res.result.length; index++) {
                let element = res.result[index];
                if(!element.statusSale)
                    continue;
                let month = new Date(element.update_at).getMonth();
                if(!assocMonths[month]){
                    assocMonths[month]= {};
                    assocMonths[month]['finance'] = {};
                    assocMonths[month]['list'] = [];
                }
                assocMonths[month]['month'] = month;
                assocMonths[month]['list'].push(
                    {
                        name: element.name,
                        price: element.price,
                        img: element.file,
                        currency: element.currency
                    }
                )
                if(assocMonths[month]['finance'][element.currency]){
                    assocMonths[month]['finance'][element.currency] = assocMonths[month]['finance'][element.currency] + Number(element.price);
                }else{
                    assocMonths[month]['finance'][element.currency] = Number(element.price);
                }
            }
            for (let key in assocMonths) {
                months.push(assocMonths[key]);
            }
            callback(months);
        }
    }
}

export default new Finance;