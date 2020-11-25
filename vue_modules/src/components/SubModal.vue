<template>
test
	<div v-bind:class="{ active: visible }" class="SubModal">
        <div class="SubModal__head">
            <div class="SubModal__title">{{ title }}</div>
            <div class="SubModal__cross" @click="close()"><cross /></div>
        </div>
        <slot></slot>
	</div>
</template>

<script>

import cross from '../assept/icons/cross'

export default {
  components:{
    cross: cross
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
        type: String,
        default: 'Окно'
    }
  },
  name: 'SubModal',
  data () {
    return {
        
    }
  },
  created(){
  },
  computed: {
    
  },
  watch: {
  },
  methods: {
    close(){
        this.$emit('close');
    }
  }
}
</script>

<style>
.SubModal {
    position: fixed;
    display: none;
    min-width: 98%;
    height: 99%;
    background: #ffffff;
    top: 0px;
    margin: 1%;
    left: 0px;
    border-radius: 4px;
    box-shadow: 0 0 4px #ccc;
}
.SubModal.active{
  display: block;
}
.SubModal__head {
    position: relative;
    border-top-left-radius: 4px;
    margin-bottom: 20px;
    border-top-right-radius: 4px;
    z-index: 1;
}

.SubModal__title {
    text-align: center;
    padding: 10px;
    font-size: 24px;
    color: #8a8a8a;
}
.SubModal__cross {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 23px;
    border-radius: 20px;
    color: #777;
    text-align: center;
    width: 30px;
    line-height: 28px;
    overflow: hidden;
    height: 30px;
}
.SubModal__cross svg {
    fill: #8a8a8a;
}
</style>
