<template>
	<div class="mini-product">
        <div class="mini-product__name">{{ name }}</div>
        <div class="mini-product__price">{{ price }}</div>
    </div>
</template>



<script>
export default {
  components:{
  },
  name: 'finance',
  props: {
    name: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    }
  },
  data () {
    return {
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
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
