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
                if(!element.statusSale)
                    continue;
                let month = new Date(element.update_at).getMonth();
                if(!assocMonths[month]){
                    assocMonths[month]= {};
                    assocMonths[month]['finance'] = {};
                    assocMonths[month]['list'] = [];
                }
                assocMonths[month]['month'] = new Date(1594737244615).getMonth();
                assocMonths[month]['list'].push(
                    {
                        name: element.name,
                        price: element.price,
                        img: element.file
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
            console.log(months);
            callback(months);
        }
    }
}

export default new Finance;