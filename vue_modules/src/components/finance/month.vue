<template>
	<div class="month">
        <div class="month__header" @click="showActList">
          <div class="month__name">{{ getNameMonth() }}</div>
          <div class="month__finance_wrapepr">
            <div v-if="finance['₽']" class="month__finance">{{ finance['₽'] }} ₽ <span> / </span></div>
            <div v-if="finance['$']"  class="month__finance">{{ finance['$'] }} $<span> / </span></div>
            <div v-if="finance['€']"  class="month__finance">{{ finance['€'] }} €<span> / </span></div>
          </div>
        </div>
        <div class="mini-list-product" v-if="showList">
          <miniProduct
            v-for="product in list"
            :name="product.name"
            :price="product.price"
            :img="product.img"
            :currency="product.currency"
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
      type: Object,
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
          1: 'Январь',
          2: 'Февраль',
          3: 'Март',
          4: 'Апрель',
          5: 'Май',
          6: 'Июнь',
          7: 'Июль',
          8: 'Август',
          9: 'Сентябрь',
          10: 'Октябрь',
          11: 'Ноябрь',
          12: 'Декабрь',
        };
        console.log(this.month);
        return array[this.month];
      },
  }
}
</script>

<style>
.month__finance_wrapepr {
    display: flex;
    margin-top: 5px;
}
.month__header {
    border-radius: 2px;
    padding: 9px;
    background: #dbf7ff;
    border-bottom: 1px solid #00c4ff;
}
.month__name {
    display: inline-block;
    font-style: normal;
    color: #000000;
    color: #00c4ff;
}
.month__finance span {
    color: #ccc;
}
.month__finance {
    display: inline-block;
    font-size: 11px;
    margin-left: 5px;
}
.month__finance:last-child span{
  display: none;
}
</style>
