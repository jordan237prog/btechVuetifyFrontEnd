<template>
  <v-app>
    <loginToolbar></loginToolbar>
    
    <v-content>
      <!-- <sideBar></sideBar>  -->
      <router-view/>
    </v-content>
    <Appfooter></Appfooter>
  </v-app>
</template>

<script>
import loginToolbar from './components/loginToolbar';

export default {
  name: 'App',

  components: {
    loginToolbar,
  },

  data: () => ({
    
  }),
};
</script>
