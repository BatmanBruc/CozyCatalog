<template>
	<div class="month">
        <div class="month__header" @click="showActList">
          <div class="month__name">{{ getNameMonth() }}</div>
          <div class="month__finance">{{ finance }} ₽</div>
        </div>
        <div class="mini-list-product" v-if="showList">
          <miniProduct
	      v-for="product in list"
	      :name="product.name"
	      :price="product.price"
	      :img="product.img"
	      ></miniProduct>
        </div>
      </div>
</template>



<script>
import miniProduct from './mini-product';
export default {
  components:{
      miniProduct
  },
  name: 'finance',
  props: {
    month: {
      type: Number,
      default: '',
    },
    finance: {
      type: Number,
      default: '',
    },
    list: {
      type: Array,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    }
  },
  data () {
    return {
        showList: false
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
      showActList(){
          if(this.showList){
              this.showList = false;
          }else{
              this.showList = true;
          }
      },
      getNameMonth(){
        let array = {
          0: 'Январь',
          1: 'Февраль',
          2: 'Март',
          3: 'Апрель',
          4: 'Май',
          5: 'Июнь',
          6: 'Июль',
          7: 'Август',
          8: 'Сентябрь',
          9: 'Октябрь',
          10: 'Ноябрь',
          11: 'Декабрь',
        };
        return array[this.month];
      },
  }
}
</script>

<style>
.month__header {
    border-radius: 2px;
    padding: 15px;
    border-bottom: 1px solid #c4c4c4;
    background: #f2f2f2;
}
.month__name {
    display: inline-block;
    width: 49%;
    font-style: normal;
    color: #000000;
}
.month__finance {
    display: inline-block;
    width: 49%;
    text-align: end;
}
</style>
