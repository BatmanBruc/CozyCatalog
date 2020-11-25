<template>
    <modal :visible="open" :title="'Товар'" @close="()=>{this.open = false}">
        <div class="block-create">
          <div class="field">
            <label class="field__label"></label>
            <input v-model="name" name="name" type="text" pattern="\d [0-9]" placeholder="Имя" class="field__input-name">
          </div>
          
          <div class="admin-panel__b-add" @click="addItem">Добавить</div>
        </div>
    </modal>
</template>



<script>
import { getNowDateString } from '../../helpers.js';
import category from '../../models/Category.js';
import modal from '../modal';
export default {
  components:{
    modal
  },
  name: 'adminPanel',
  props: {
    open: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      name: ''
    }
  },
  created(){
  },
  watch: {
    price(){
      // console.log(typeof this.price);
      // if(this.price && typeof this.price != "object"){
      //   if( !this.price.match(/(\$[0-9,]+(\.[0-9]{2})?)/))
      //     this.price = this.price.substring(0, this.price.length - 1);
      // }
      let price = String(this.price);
      console.log(price);
      if(!/^([0-9]+)([.,]?)([0-9]*)$/.test(price)){
        this.price = price.substring(0, price.length - 1);
      }
      
    },
    open(){
        if(!this.open)
            this.$emit('close')
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    onFileChange: function(e) {
                let file = this.$refs.file.files;
                if (!file.length)
                    return;
                this.createImage(file[0]);
    },
    createImage: function(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = function(e) {
            vm.image = e.target.result;
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
        'name': this.name
      }
      let res = category.set(params);
      this.productPage = params;
      this.$store.state.dispatcher.updateProducts = true;
    },
  }
}
</script>

<style>

.block-create {
    padding: 10px;
    position: absolute;
    height: 100%;
    top: 0px;
    padding-top: 70px;
    box-sizing: border-box;
    width: 100%;
}
.field-price select{
  border: 0px;
  background: white;
  font-size: 27px;
}
.admin-panel {
    display: none;
    padding-bottom: 20px;
}
.admin-panel.active {
    display: block;
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
        display: flex;
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
  position: absolute;
  left: 0;
  bottom: 0px;
}
img.product-img {
    width: 100%;
}
</style>
