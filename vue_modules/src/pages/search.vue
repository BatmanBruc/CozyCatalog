<template>
	<div class="product-search">
    <div class="page-head">
      <div class="page-head-b-square" @click="openFilter()"><settingIcon /></div>
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
    <modal :visible="visibleSetting" :title="'Настройки'" @close="closeFilter()">
      <div class="product-search__filter">
        <div class="fields-wrapper">
          <checkbox id="nonSale" :title="'В наличии'" :value="filter.nonSale.value" @check="changeCheckboxFilter"/>
          <checkbox id="sale" :title="'Проданные'" :value="filter.sale.value" @check="changeCheckboxFilter"/>
          <div class="field field-select">
            <select v-model="sort">
              <option value="#" disabled="disabled" selected="selected"> - Сортировка - </option>
              <option value="priceUp">Цена по возрастанию</option>
              <option value="priceDown">Цена по убыванию</option>
              <option value="nameUp">А - Я</option>
              <option value="nameDown">Я - А</option>
            </select>
          </div>
          <div class="field field-range">
            <div id="rangeRangw"></div>
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
import settingIcon from '../assept/icons/setting'
import checkbox from '../components/fields/field-checkbox'
export default {
  components:{
    modal: modal,
    product: product,
    settingIcon: settingIcon,
    checkbox: checkbox
  },
  name: 'Search',
  data () {
    return {
      products: [
        
      ],
      value: null,
      filter: {
        nonSale: {
          active: true,
          value: true,
          key: 'statusSale'
        },
        sale: {
          active: false,
          value: true,
          key: 'statusSale'
        }
      },
      visibleSetting: false,
      sort: '#'
    }
  },
  created(){
    this.getproducts();
  },
  computed: {
    update(){
      return this.$store.state.dispatcher.updateProducts;
    }
  },
  watch: {
    filter(){
      this.getproducts();
    },
    sort(){
      this.getproducts();
    },
    update(){
      if(this.$store.state.dispatcher.updateProducts){
        this.getproducts();
        this.$store.state.dispatcher.updateProducts = false;
      }
    }
  },
  methods: {
    async getproducts(){
      this.products = [];
      Product.search(this.value, this.filter, this.sort, (result)=> {
        this.products = result;
        console.log(this.products);
      })
    },
    openFilter(){
      console.log(this.visibleSetting);
      if(this.visibleSetting)
        this.visibleSetting = false;
      else
        this.visibleSetting = true;
    },
    closeFilter(){
      this.visibleSetting = false;
    },
    changeCheckboxFilter(checkbox){
      this.filter[checkbox.id]['active'] = checkbox.checked;
      this.getproducts();
    }
  }
}
</script>

<style>
.product-search{
  display: none;
}
.product-search.active {
  display: block;
}
.product-search__form {
    width: 100%;
}
.page-head-b-square {
    height: 40px;
    border: 1px solid #ccc;
    min-width: 40px;
    border-radius: 8px;
    margin-right: 5px;
}
.page-head-b-square svg {
    width: 24px;
    height: 24px;
    margin: 8px;
    fill: #747474;
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
.page-head {
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

.modal__cross svg {
    fill: white;
}
.field.field-select {
    padding: 20px;
}
.field-select select {
    border: 1px;
    background: #dbf7ff;
    border-bottom: 1px solid #00c4ff;
    width: 100%;
    padding: 10px;
    color: #00c4ff;
    font-size: 16px;
}
</style>
