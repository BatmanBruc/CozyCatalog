<template>
<li v-if="filter" class="item">
  <div class="item__box-img"><img class="item__img" :src="'img/'+img" alt=""></div>
  <div class="item__box-info">
    <div class="item__name">{{ name }}</div>
    <div :class="{ 'item__status--sales' : statusSale}" class="item__status">{{ statusSale ? 'Продано' : 'В наличии' }}</div>
    <div class="item__price">{{ price }} руб.</div>
  </div>
  <div class="item__box-buttons">
    <div v-if="!statusSale" class="item__box-button item__box-button--sale" @click="sale()">
      Продать
    </div>
    <div v-if="statusSale" class="item__box-button item__box-button--return" @click="returnItem()">
      Вернуть
    </div>
  </div>
</li>
</template>

<script>
export default {
  name: 'item',
  props: {
    name: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    statusSale: {
      type: Number,
      default: false,
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
  computed: {
    filter(){
      if(this.$store.state.filter == null)
        return true;
      return this.$store.state.filter == this.statusSale ? true : false;
    }
  },
  methods: {
    sale(){
      this.statusSale = 1;
    },
    returnItem(){
      this.statusSale = 0;
    }
  }
}
</script>

<style>
li.item {
    display: block;
    display: flex;
    height: 82px;
    width: 100%;
    margin: 0;
    margin-bottom: 10px;
}
.item__box-img {
    min-width: 95px;
    height: 70px;
    text-align: center;
    border: 1px solid #e4e4e4;
    padding: 5px;
}
.item__box-info {
    margin-left: 2px;
    background: #f7f7f7;
    width: 100%;
    padding-top: 10px;
    padding-left: 10px;
}
img.item__img {
    height: 100%;
}
.item__price {
    font-size: 12px;
    color: #979797;
    margin-top: 5px;
}
.item__status {
    font-size: 12px;
    color: #03ba0c;
    margin-top: 5px;
}
.item__status--sales{
  color: red;
}
.item__box-button {
    padding: 10px;
    margin-left: 2px;
    height: 100%;
    padding: 0 5px;
    line-height: 75px;
    border-radius: 3px;
    border: 1px solid #ccc;
}
.item__box-button--sale{
    background: #088d65;
    color: #ffffff;
}
</style>
