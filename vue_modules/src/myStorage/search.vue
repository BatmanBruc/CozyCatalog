<template>
	<div class="item-search">
	    <div class="item-search__field" >
	    	<div class="item-search__form">
	    		<input @change="getItems(value)" @keydown.enter="getItems(value)" v-model="value" type="text" class="item-search__input"/>
	    	</div>
	    </div>
    	<ul class="item-search__items items">
	      <item
	      v-for="item in items"
	      :name="item.name"
	      :img="item.img"
	      :price="item.price"
	      :statusSale="item.statusSale"
	      ></item>
	  </ul>
	</div>
</template>



<script>
import item from '../item.vue';
import axios from 'axios';
export default {
  components:{
    item: item
  },
  name: 'Search',
  data () {
    return {
      items: [
        
      ],
      value: null
    }
  },
  created(){
    this.getItems('');
  },
  computed: {
  },
  methods: {
      getItems(value){
        const params = new URLSearchParams();
        params.append('str', value);
        axios.post('http://backend/product/search', params).then((response) => {
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
.filter{
  display: flex;
  margin-bottom: 10px;
}
.filter__button {
    display: inline-block;
    width: 100%;
    text-align: center;
    border: 1px solid #ccc;
    margin: 2px;
    border-radius: 3px;
    padding: 4px;
}
ul{
  margin: 0px;
  padding: 0px;
}
.filter__button--active{
  background: #6caffa;
  color: #ffffff;
}
.item-search__field {
    margin-bottom: 10px;
}
input.item-search__input {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 18px;
    text-align: center;
}
</style>
