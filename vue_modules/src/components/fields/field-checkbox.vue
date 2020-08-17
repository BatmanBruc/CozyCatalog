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
.field.field-checkbox {
    padding: 13px;
    display: flex;
}
label.field-checkbox__label {
    width: 40px;
    height: 40px;
    display: inline-block;
    border: 1px solid #e4e4e4;
    border-radius: 6px;
}
.field__checkbox {
    display: none;
}
.field__checkbox:checked + .field-checkbox__label{
  background: #00c4ff;
}
span.field-checkbox__name {
    line-height: 40px;
    font-size: 16px;
    margin-left: 20px;
    color: #8e8e8e;
}
</style>
