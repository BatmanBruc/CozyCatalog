<template>
	<div class="product-search">
    <div class="product-search__field" >
      <div class="product-search__form">
        <input @change="getproducts(value)" @keydown.enter="getproducts(value)" v-model="value" type="text" class="product-search__input"/>
      </div>
    </div>
    <ul class="product-search__products products">
      <product
      v-for="product in products"
      :id="product.id"
      :name="product.name"
      :file="product.file"
      :price="product.price"
      :statusSale="product.statusSale"
      ></product>
    </ul>
	</div>
</template>



<script>
import product from '../components/product.vue';
import axios from 'axios';
import Product from '../models/Product.js';
export default {
  components:{
    product: product
  },
  name: 'Search',
  data () {
    return {
      products: [
        
      ],
      value: null
    }
  },
  created(){
    this.getproducts();
  },
  computed: {
  },
  methods: {
    async getproducts(value){
      this.products = [];
      Product.search(this.value, (result)=> {
        this.products = result;
      })
    },
  }
}
</script>

<style>
.filter{
  display: flex;
  margin-bottom: 10px;
}
.filter__button {
    display: inline-block;
    width: 100%;
    text-align: center;
    border: 1px solid #ccc;
    margin: 2px;
    border-radius: 3px;
    padding: 4px;
}
ul{
  margin: 0px;
  padding: 0px;
}
.filter__button--active{
  background: #6caffa;
  color: #ffffff;
}
.product-search__field {
    margin-bottom: 20px;
}
.product-search__form {
    padding: 1px;
}
input.product-search__input {
    max-width: 100%;
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 18px;
    text-align: center;
    padding: 0px;
    margin: 0px;
}
</style>
