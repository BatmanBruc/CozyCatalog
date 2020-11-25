import Model from '../api/Model.js';

class Product extends Model {
    constructor(){
        super('category');
    }
}

export default new Product;