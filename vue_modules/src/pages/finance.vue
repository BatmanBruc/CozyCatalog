<template>
  <div class="page-finance">
    <div class="page-head">
      <div class="page-head-b-square" @click="()=>{this.visibleCost = true}"><settingIcon /></div>
    </div>
    <div class="finance">
      <div class="list-month">
        <month
          v-for="month in months"
          :month="month.month"
          :finance="month.finance"
          :list="month.list"
          ></month>
      </div>
    </div>
    <Cost :open="visibleCost" :close="()=>{this.visibleCost = false}">
  </div>
</template>



<script>
import month from '../components/finance/month';
import Finance from '../models/Finance.js'
import settingIcon from '../assept/icons/сogwheel'
import Cost from '../components/Cost'
export default {
  components:{
    month,
    settingIcon,
    Cost
  },
  name: 'finance',
  data () {
    return {
      months: [],
      visibleCost: false
    }
  },
  created(){
    Finance.get((months)=>{
      this.months = months;
    });
    
    //this.getData();
  },
  computed: {
    update(){
      return this.$store.state.dispatcher.updateFinance;
    }
  },
  watch: {
    update(){
      if(this.$store.state.dispatcher.updateFinance){
        Finance.get((months)=>{
          this.months = months;
        });
        this.$store.state.dispatcher.updateFinance = false;
      }
    }
  },
  methods: {
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
.page-finance{
  display: none;
}
.page-finance.active {
  display: block;
}
</style>
