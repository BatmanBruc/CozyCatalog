
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
        <productPage
            :id="productPage.id"
            :name="productPage.name"
            :file="productPage.file"
            :price="productPage.price"
            :statusSale="productPage.statusSale"
            :description="productPage.description"
            @close="closeProductPage"
            v-if="productPage"
        />
    </div>
</template>
<script>
import axios from 'axios';
import navigation from './components/navigation';
import search from './pages/search.vue';
import adminPanel from './pages/admin-panel.vue';
import finance from './pages/finance.vue';
import productPage from './pages/product-page';

export default {
  components:{
    navigation,
    search,
    adminPanel,
    finance,
    productPage
  },
  name: 'myStorage',
  data () {
    return {
        activePage: null,
        openNav: true,
    }
  },
  created(){
  },
  computed: {
      productPage(){
        return this.$store.state.productPage;
      }
  },
  methods: {
      openPage(val){
        this.activePage = val;
      },
      closeProductPage(){
        this.$store.state.productPage = null;
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
