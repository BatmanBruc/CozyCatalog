import modal from '../modal';
import Vue from 'vue';

const List = Vue.component('List', {
  components:{
    modal,
    Item
  },
  name: 'List',
  inject: ['setOpennessList'],
  props: {
    items: {
      type: Array,
      default: []
    },
  },
  data () {
    return {
    }
  },
  created(){
  },
  
  methods: {
      close(){
        this.$emit('close');
    },
  },
  render: function (h) {
    return (
      <modal visible="true" onClose={()=>{this.$emit('close')}}>
        <div class="custom-select-list">
                {this.items.map((item, i) => {
                    return (
                      <Item key={i} item={item}></Item>
                    )
                })}
            
        </div>
      </modal>
    )
  }
})

const Item = Vue.component('Item', {
  components:{
    List
  },
  name: 'Item',
  props: {
    item: {
      type: Object,
      default: ''
    },
  },
  data () {
    return {
        opennessList: false
    }
  },
  created(){
  },
  methods: {
    close(){
      console.log('item');
      this.opennessList = false;
    }
  },
  render: function (h) {
    return (
      <div class="custom-select-item">
        <div onClick={()=>{this.opennessList = true}} class="custom-select-title">{ this.item.name }</div>
        { this.opennessList ? <List items={this.item.items} onClose={this.close}></List> : '' }
      </div>
    )
  }
})



export default List;