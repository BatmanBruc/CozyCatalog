<template>
	<div class="admin-panel">
    <div class="admin-panel-func">
      <div class="admin-panel-func-item blue" @click="()=>{ this.openCreateProduct = true }" >Добавить товар<span class="plus">+</span></div>
      <div class="admin-panel-func-item green" @click="()=>{ this.openCreateCategory = true }" >Добавить категорию <span class="plus">+</span></div>
    </div>
    <customSelect />
    <createProduct :open="openCreateProduct" @close="()=>{ this.openCreateProduct = false }" />
    <createCategory :open="openCreateCategory" @close="()=>{ this.openCreateCategory = false }" />
  </div>
</template>



<script>
import { getNowDateString } from '../helpers.js';
import product from '../models/Product.js';
import category from '../models/Category.js';
import createProduct from '../components/admin-panel/create-product';
import createCategory from '../components/admin-panel/create-category';
import customSelect from '../components/custom-select';
export default {
  components:{
    createProduct,
    createCategory,
    customSelect
  },
  name: 'adminPanel',
  data () {
    return {
      openCreateProduct: false,
      openCreateCategory: false
    }
  },
  methods: {
  }
}
</script>

<style>
.admin-panel-func-item {
    border-radius: 4px;
    padding: 10px;
    color: #ffffff;
    font-weight: 100;
    position: relative;
    margin-top: 10px;
}
.admin-panel-func-item.blue {
    background: #00c4ff;
}
.admin-panel-func-item .plus {
    font-size: 33px;
    position: absolute;
    right: 10px;
    top: 0px;
}
.admin-panel-func-item.green {
    background: #00a480;
}

</style>
