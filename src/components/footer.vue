<template>
    <!-- <v-card src="../assets\bg1.png" >
        
    <img class="img" height="50" src="../assets\kmerfreelance.png">


    </v-card> -->
    <v-card >
    <v-footer
      color="#24324A"
      flat
    >
      <v-card
        flat
        tile
        width="100%"
        color="#24324A"
        class=" lighten-1 text-center"
      >
        <v-card-text>
          <img  height="50" src="../assets\kmerfreelance.png">
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>kmerFreelance</strong>
        </v-card-text>
      </v-card>
    </v-footer>

    
  </v-card>

</template>

<script>
export default {
    name:'Appfooter',
}
</script>


<style>



</style>