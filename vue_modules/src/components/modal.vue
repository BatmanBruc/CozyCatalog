<template>
	<div v-bind:class="{ active: visible }" class="modal">
        <div class="modal__head">
            <div class="modal__title">{{ title }}</div>
            <div class="modal__cross" @click="close()"><cross /></div>
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
  name: 'modal',
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
        this.visible = false;
        this.$emit('close');
    }
  }
}
</script>

<style>
.modal {
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
.modal.active{
  display: block;
}
.modal__head {
    position: relative;
    border-top-left-radius: 4px;
    margin-bottom: 20px;
    border-top-right-radius: 4px
}

.modal__title {
    text-align: center;
    padding: 10px;
    font-size: 24px;
    color: #8a8a8a;
}
.modal__cross {
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
.modal__cross svg {
    fill: #8a8a8a;
}
</style>
