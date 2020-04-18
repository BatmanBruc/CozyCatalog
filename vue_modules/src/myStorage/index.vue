
<template>
    <div class="myStorage">
        <navigation
            :active="openNav"
            @openPage="openPage"
        />
        <search
            v-if="activePage == 'search'"
        />
        <adminPanel
            v-if="activePage == 'adminPanel'"
        />
    </div>
</template>
<script>
import axios from 'axios';
import navigation from './navigation';
import search from './search.vue';
import adminPanel from './adminPanel.vue';

export default {
  components:{
    navigation,
    search,
    adminPanel
  },
  name: 'myStorage',
  data () {
    return {
        activePage: null,
        openNav: true
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
      openPage(val){
            window.stackForBack.push(()=>{
                this.openNav = true;
            });
          this.openNav = false;
          this.activePage = val;
      }
  }
}
</script>

<style>
.myStorage{
    margin: 8px;
}
</style>
