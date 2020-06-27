<template>
	<div>
    <div class="list-month">
      <month
	      v-for="month in months"
	      :name="month.name"
	      :finance="month.finance"
	      :list="month.list"
	      ></month>
    </div>
  </div>
</template>



<script>
import month from '../components/finance/month';
import Product from '../models/Product.js'
export default {
  components:{
    month
  },
  name: 'finance',
  data () {
    return {
      months: [
          {
          name: 'Июнь',
          finance: 25000,
          list: [
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            }
          ]
        },
        {
          name: 'Июнь',
          finance: 25000,
          list: [
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            }
          ]
        },
        {
          name: 'Июнь',
          finance: 25000,
          list: [
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            },
            {
              name: 'Платье',
              price: 5000
            }
          ]
        }
      ]
    }
  },
  created(){
    this.getData();
  },
  computed: {
  },
  methods: {
    getNameMonth(num){
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
      return array[num];
    },
    async getData(){
      let res = await Product.get();
      res.onsuccess = ()=>{
        let months = {};
        for (let index = 0; index < res.result.length; index++) {
          let element = res.result[index];
          if(element.statusSale){
            let month = {};
            let num_month = element.created_at.split('/')[1];
            if(!months[num_month]){
              months[num_month] = {};
              months[num_month]['finance'] = 0;
              months[num_month]['list'] = [];
              months[num_month]['name'] = this.getNameMonth(num_month);
            }
            months[num_month]['finance'] = months['finance'] + element.price;
            months[num_month]['list'].push({
              name: element.name,
              price: element.name
            });
          }
        }
        console.log(months);
      }
    }
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
.mini-list-product {
    padding-left: 20%;
}
.mini-product {
    border-bottom: 1px solid #cacaca;
    padding: 15px;
}
.mini-product:last-child {
    border-bottom: 0px;
}
.mini-product__name {
    display: inline-block;
    width: 49%;
    color: #686868;
}
.mini-product__price {
    display: inline-block;
    width: 49%;
    text-align: end;
    color: #686868;
}
</style>
