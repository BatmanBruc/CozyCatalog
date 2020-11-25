import Vue from 'vue';
import List from './List.js';
import './style.css';

const CustomSelect = Vue.component('Item', {
  name: 'custom-select',
  props: {
    open: {
      type: Boolean,
      default: false
    },
  },
  provide(){
      return {
          setOpennessList: (val)=>{
              this.opennessList = val;
              console.log(this);
          }
      }
  },
  data () {
    return {
      items: [
          {
              name: 'Машины',
              items: [
                  {
                      name: 'Легковые'
                  },
                  {
                      name: 'Грузовые'
                  }
              ]
          },
          {
              name: 'Игрушки',
              items: [
                  {
                      name: 'Роботы'
                  },
                  {
                      name: 'Куклы'
                  }
              ]
          },
          {
              name: 'Одежда',
              items: [
                  {
                      name: 'Мужская'
                  },
                  {
                      name: 'Женская'
                  }
              ]
          }
      ],
      opennessList: false,
      value: 'Все категории'
    }
  },
  created(){
  },
  methods: {
      open(){
           console.log(this.opennessList);
           this.opennessList = true;
      }
  },
  render: function (h) {
    return (
        <div class="custom-select">
            <div onClick={this.open} class="custom-select-title">{ this.value }</div>
            { this.opennessList ? <List items={this.items} onClose={()=>{this.opennessList = false}}  /> : '' }
        </div>
    )
  }
})

export default CustomSelect;