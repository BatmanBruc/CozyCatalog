
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
        <finance
            v-if="activePage == 'finance'"
        />
    </div>
</template>
<script>
import axios from 'axios';
import navigation from './components/navigation';
import search from './pages/search.vue';
import adminPanel from './pages/admin-panel.vue';
import finance from './pages/finance.vue';

export default {
  components:{
    navigation,
    search,
    adminPanel,
    finance
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
          this.activePage = val;
      }
  }
}
</script>

<style>
.myStorage{
    margin: 8px;
    padding-bottom: 65px;
}
</style>
