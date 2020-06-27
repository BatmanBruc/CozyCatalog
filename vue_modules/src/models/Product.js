import Model from '../api/Model.js';

class Product extends Model {
    constructor(){
        super('Products', 1, 'id', true);
    }
}

export default Product;