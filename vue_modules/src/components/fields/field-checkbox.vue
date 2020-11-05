<template>
<div class="field field-checkbox">
    <input class="field__checkbox" :id="id"  type="checkbox" v-model="checked" >
    <label class="field-checkbox__label" :for="id"><span></span></label>
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
}
</script>

<style>
.field.field-checkbox {
    padding: 13px;
    display: flex;
}
label.field-checkbox__label {
    width: 50px;
    height: 20px;
    display: inline-block;
    border: 1px solid #e4e4e4;
    border-radius: 12px;
    position: relative;
}
.field__checkbox {
    display: none;
}

span.field-checkbox__name {
    line-height: 22px;
    font-size: 16px;
    margin-left: 20px;
    color: #8e8e8e;
}
.field-checkbox__label span {
    display: block;
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 20px;
    border: 1px solid #ccc;
    position: absolute;
    top: -4px;
    left: -1px;
}
.field__checkbox:checked + .field-checkbox__label{
  background: #84e3ff;
  border-color: #00c4ff;
}
.field__checkbox:checked + .field-checkbox__label span{
  left: 23px;
  background: #84e3ff;
  border-color: #00c4ff;
}
</style>
