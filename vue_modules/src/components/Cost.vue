<template>
    <modal :visible="open" :title="'Товар'" @close="()=>{this.open = false}">
        <div class="cost">
            <div class="cost-item">
                <div class="cost-item-name">Налог</div>
                <div class="cost-item-value">30%</div>
            </div>
        </div>
    </modal>
</template>



<script>
import { getNowDateString } from '../../helpers.js';
import product from '../../models/Product.js';
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
      name: '',
      price: null,
      currency: '₽',
      file: '',
      image: false,
      desc: '',
      visibleCreateItem: false,
      visibleCreateCategory: false
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
        'name': this.name,
        'price': this.price,
        'file': this.image,
        'currency': this.currency,
        'statusSale': false,
        'description': this.desc,
        'created_at': Date.now(),
        'update_at': Date.now(),
      }
      let res = product.set(params);
      this.$store.state.productPage= params;
      this.$store.state.dispatcher.updateProducts = true;
      this.open = false;
    },
  }
}
</script>

<style>
</style>
