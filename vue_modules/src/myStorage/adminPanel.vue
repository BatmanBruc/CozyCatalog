<template>
	<div class="admin-panel">
    <div class="block-create">
      <div class="field">
        <label class="field__label"></label>
        <input v-model="name" name="name" type="text" class="field__input">
      </div>
      <div class="field-number">
        <label class="field__label"></label>
        <input v-model="price" name="price" type="text" class="field__input">
        <select v-model="currency" name="currency" id="currency">
          <option value="ruble">₽</option>
          <option value="dollar">$</option>
          <option value="euro">$</option>
        </select>
      </div>
      <div class="field field-img">
        
        <label class="field__label">Заггрузить фото<input style="display:none;" class="field__input-file" type="file" name="f" ref="file" v-on:change="handleFileUpload()"></label>
      </div>
      <buttom class="admin-panel__b-add" @click="addItem">Добавить</buttom>
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
      price: 0,
      currency: 'ruble',
      file: ''
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    addItem(){
        const params = new URLSearchParams();
        params.append('name', this.name);
        params.append('price', this.price);
        params.append('file', this.file);
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
input.field__input {
    width: 100%;
    border-radius: 3px;
    height: 30px;
    border: 1px solid #b3b3b3;
    margin-bottom: 10px;
}
.field-number {
    width: 50%;
}
.field-number input.field__input {
    width: 70%;
}
select#currency {
    width: 38px;
    font-size: 14px;
    height: 34px;
    border-radius: 3px;
}
.admin-panel__b-add {
    width: 100%;
    display: block;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: white;
    margin-top: 10px;
    background: #509a4c;
    border-radius: 3px;
}
.field-img {
    border: 1px solid #79aaff;
    text-align: center;
    padding: 10px;
    color: #0049a7;
    border-radius: 4px;
}
</style>
