<template>
	<div class="product-search">
    <div class="product-search__field" >
      <div class="product-search__b-filter" @click="openFilter()"></div>
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
      :currency="product.currency"
      ></product>
    </ul>
    <modal :visible="visibleFilter" :title="'Настройки'" @close="closeFilter()">
      <div class="product-search__filter">
        <div class="fields-wrapper">
          <div class="field field-checkbox">
            <input class="field__checkbox" id="statusSale=0"  type="checkbox" value="statusSale=0" v-model="filter" >
            <label class="field-checkbox__label" for="statusSale=0"></label>
            <span class="field-checkbox__name">В наличии</span>
          </div>
          <div class="field field-checkbox">
            <input class="field__checkbox" id="statusSale=1"  type="checkbox" value="statusSale=1" v-model="filter" >
            <label class="field-checkbox__label" for="statusSale=1"></label>
            <span class="field-checkbox__name">Проданные</span>
          </div>
        </div>
      </div>
    </modal>
	</div>
</template>

<script>
import product from '../components/product.vue';
import modal from '../components/modal.vue';
import Product from '../models/Product.js';
export default {
  components:{
    modal: modal,
    product: product
  },
  name: 'Search',
  data () {
    return {
      products: [
        
      ],
      value: null,
      filter: ['statusSale=true'],
      visibleFilter: false
    }
  },
  created(){
    this.getproducts();
  },
  computed: {
    
  },
  watch: {
    filter(){
      this.getproducts();
    }
  },
  methods: {
    async getproducts(){
      this.products = [];
      Product.search(this.value, this.filter, (result)=> {
        this.products = result;
        console.log(this.products);
      })
    },
    openFilter(){
      console.log(this.visibleFilter);
      if(this.visibleFilter)
        this.visibleFilter = false;
      else
        this.visibleFilter = true;
    },
    closeFilter(){
      this.visibleFilter = false;
    }
  }
}
</script>

<style>
.product-search__b-filter {
    height: 40px;
    border: 1px solid #ccc;
    min-width: 40px;
    border-radius: 8px;
    margin-right: 5px;
}
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
    display:flex;
}
.product-search__form {
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
.field.field-checkbox {
    padding: 13px;
    display: flex;
}
label.field-checkbox__label {
    width: 40px;
    height: 40px;
    display: inline-block;
    border: 1px solid #e4e4e4;
    border-radius: 6px;
}
.field__checkbox {
    display: none;
}
span.field-checkbox__name {
    line-height: 40px;
    font-size: 16px;
    margin-left: 20px;
    color: #8e8e8e;
}
.modal__cross svg {
    fill: white;
}
.field__checkbox:checked + .field-checkbox__label{
  background: #00c4ff;
}
</style>
