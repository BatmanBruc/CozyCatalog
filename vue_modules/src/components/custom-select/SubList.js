import SubModal from '../SubModal';

import Vue from 'vue';
const SubList = Vue.component('SubList', {
    components:{
      Item
    },
    name: 'SubList',
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
        <SubModal visible="true" onClose={()=>{console.log('SubList')}}>
          <div onClick={()=>{console.log('SubList')}}>test</div>
          <div class="custom-select-list">
                  {this.items.map((item, i) => {
                      return (
                        <Item key={i} item={item}></Item>
                      )
                  })}
              
          </div>
        </SubModal>
      )
    }
  })
const Item = Vue.component('Item', {
    components:{
      SubList
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
      console.log(this)
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
          { this.opennessList ? <SubList items={this.item.items}  onClose={this.close}></SubList> : '' }
        </div>
      )
    }
  })
export default SubList;