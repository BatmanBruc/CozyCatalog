<template>
<div class="field field-checkbox">
    <input class="field__checkbox" :id="id"  type="checkbox" v-model="checked" >
    <label class="field-checkbox__label" :for="id"></label>
    <span class="field-checkbox__name">{{ title }}</span>
</div>
</template>

<script>

export default {
  name: 'field-checkbox',
  props: {
    id: {
        type: String,
        default: ''
    },
    title:{
        type: String,
        default: ''
    }
  },
  data () {
    return {
        checked: false
    }
  },
  watch: {
      checked(){
          this.$emit('check', {checked: this.checked, id: this.id});
      }
  }
  computed: {
  },
  methods: {
  }
}
</script>

<style>

</style>
