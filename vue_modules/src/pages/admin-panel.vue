<template>
	<div class="admin-panel">
    <div class="block-create">
      <div class="field">
        <label class="field__label"></label>
        <input v-model="name" name="name" type="text" placeholder="Имя" class="field__input-name">
      </div>
      <div class="field field-price">
        <label class="field__label"></label>
        <span class="currency">₽</span>
        <input v-model="price" name="price" type="text" placeholder="0" class="field__input">
      </div>
      <div class="field">
        <label class="field__label"></label>
        <textarea v-model="desc" name="desc" type="text" placeholder="Описание..." class="field__input-desc"></textarea>
      </div>
      <div class="field field-img">
        <label class="field__label">Загрузить фото<input style="display:none;" class="field__input-file" type="file" name="f" ref="file" v-on:change="onFileChange()"></label>
        <img class="product-img" :src="image" v-if="image"/>
      </div>
      <buttom class="admin-panel__b-add" @click="addItem">Добавить</buttom>
    </div>
  </div>
</template>



<script>
import { getNowDateString } from '../helpers.js';
import product from '../models/Product.js';
export default {
  components:{
  },
  name: 'adminPanel',
  data () {
    return {
      name: '',
      price: null,
      currency: 'ruble',
      file: '',
      image: false,
      desc: ''
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    onFileChange: function(e) {
                let file = this.$refs.file.files;
                alert(file.length);
                if (!file.length)
                    return;
                this.createImage(file[0]);
    },
    createImage: function(file) {
        let reader = new FileReader();
        let vm = this;
            console.log(file);
        reader.onload = function(e) {
            vm.image = e.target.result;
            console.log(vm.image);
        };
        reader.readAsDataURL(file);
        
    },
    // positionCurrency(){
    //   let len;
    //   if(this.price){
    //     len = this.price.length;
    //   }
    //   else{
    //     len = 1;
    //   }
    //   return 'left: ' + (len*20) + 'px;';
    // },
    addItem(){

      let params = {
        'name': this.name,
        'price': this.price,
        'file': this.image,
        'statusSale': false,
        'description': this.desc,
        'created_at': getNowDateString(),
        'update_at': getNowDateString(),
      }
      product.set(params);
    }
  }
}
</script>

<style>
.admin-panel {
    padding-bottom: 20px;
}
.field {
    padding: 1px;
    margin-bottom: 20px;
}
.field__input-name{
  max-width: 100%;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
  text-align: center;
  padding: 0;
  margin: 0;
    box-sizing: border-box;
}

input.field__input-name {
    max-width: 100%;
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 18px;
    text-align: center;
    padding: 0;
    margin: 0;
}
textarea.field__input-desc {
    max-width: 100%;
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 18px;
    padding: 7px;
    margin: 0;
    box-sizing: border-box;
}
.field-price {
    width: 100%;
    height: 40px;
    position: relative;
    box-sizing: border-box;
}
.field-price .currency {
    position: absolute;
    right: 20px;
    top: 15px;
}
.field-price input.field__input {
    width: 100%;
    border: 0px;
    border-bottom: 1px solid #ccc;
    border-radius: 0px;
    font-size: 27px;
    padding: 0px;
    padding-left: 5px;
    outline: 0px;
    height: 100%;
    box-sizing: border-box;
}
select#currency {
    width: 15%;
    font-size: 27px;
    height: 34px;
    border: 0px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0px;
    height: 100%;
}
.field-img label {
    border: 1px solid #79aaff;
    text-align: center;
    padding: 10px;
    color: #0049a7;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    display: block;
    margin-bottom: 5px;
}
.admin-panel__b-add {
  width: 100%;
  display: block;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #fff;
  margin-top: 10px;
  background: #00c4ff;
  border-radius: 3px;
  position: fixed;
  left: 0px;
  bottom: 60px;
}
img.product-img {
    width: 100%;
}
</style>
