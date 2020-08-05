<template>

    <v-card class="card card-container"
    flat
    >
        <v-card flat  class="v-card-title">
            <v-card-title style="font-size: 15px;">ACCOUNT CREATED SUCCESSFULLY</v-card-title>
        </v-card>
        
        <router-link to="/login" style="text-decoration-line: none;"> 
            <v-btn
            color="#10195D"
            x-large
            class="log-btn">
                continue to login page
            </v-btn>
        </router-link>

    </v-card>
  
</template>

<script>
  

  export default {
    name: 'ResgistrationSuccess',

    
  }
</script>

<style  scoped>
    .v-card-title{
  margin-bottom:05%;
  display: flex;
  font-size: 10px; 
  text-decoration-line: none;
}
.log-btn{
  background-color:#10195D;
  color: #ffffff;
  text-decoration-line: none;
  margin-left: 9px;
}
.card-container.card {
  margin:auto;
  max-width: 500px !important;
  padding: 40px 40px;
}
</style>