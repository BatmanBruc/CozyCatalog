<template>
	<div class="admin-panel">
    <div class="block-create">
      <div class="field">
        <label class="field__label"></label>
        <input v-model="name" name="name" type="text" class="field__input">
      </div>
      <div class="field">
        <label class="field__label"></label>
        <input v-model="price" name="price" type="text" class="field__input">
      </div>
      <buttom @click="addItem">Добавить</buttom>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
export default {
  components:{
  },
  name: 'adminPanel',
  data () {
    return {
      name: '',
      price: 0
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
    addItem(){
        const params = new URLSearchParams();
        params.append('name', this.name);
        params.append('price', this.price);
        axios.post('http://backend/product/add', params).then((response) => {
          this.items = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style>
</style>
