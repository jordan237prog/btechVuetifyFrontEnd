<template>

  <div class="col-md-12">
    <div class="card card-container">
      <!-- <img
        id="profile-img"
        src="../assets/signin.png"
        class="profile-img-card"
      /> -->
      <!-- <form name="form" @submit.prevent="handleLogin"> -->
        <!-- <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username" 
            placeholder="Username"
            autocomplete="on"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
        </div> -->
        <!-- <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
            autocomplete="on"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div> -->
      <v-card
        flat
      >
        
          <v-card flat  class="v-card-title">
            <v-card-title>
              AUTHENTICATION
            </v-card-title>
          </v-card>
        

        <v-form v-model="isValid" name="form" 
        ref="form">
          <v-text-field
              class="error-combobox"
              outlined
              type="text"
              v-model="user.username"
              :counter="12"
              :rules="username_rules"
              name="username"
              label="Username"
              append-icon="mdi-account-edit"
              required
            >
          </v-text-field>
        

        
          <v-text-field
              class="error-combobox"
              outlined
              type="password"
              v-model="user.password"
              :rules="password_rules"
              name="password"
              label="Password"
              append-icon="mdi-account-key"
              required
            >
          </v-text-field>

         <v-card
         flat
         class="errors"
         >
           
             <span style="color:#FB236A;">{{message}}</span>
           
         </v-card>

          
            
            <v-btn @click="handleLogin"
              block
              
              x-large
              :loading="loading"
               color="#10195D"
              class="log-btn"
              name="login"
              :disabled="!isValid">
              Login
            </v-btn>

      

        </v-form>
      
         
      
      </v-card>

     

        <!-- <div class="form-group">
          <button class="btn btn-block" :disabled="loading" name="logi">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div> -->


        <!-- div>
          <div v-if="message" >{{message}}</div>
        </div>< -->
      <!-- </form> -->
    </div>
  </div>
  
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
 
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      isValid: true,
      username_rules: [
        v => !!v  || 'Username is required',
        v => v && v.length >= 4 || 'Username must be greater than 3 characters'
      ],
      password_rules: [
        v => !!v  || 'Password is required',
        v => v && v.length  >= 6  || 'Password must be greater than 5 characters'
      ],
      
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
         var promise = this.$store.dispatch('login', this.user);
          promise.then(
            (user) => {
              
              if((user.roles[0])==="ENTERPRISE"){
                this.$router.push('/enterprise');
              }
              else if((user.roles[0])==="LANCE"){
                this.$router.push('/lance');
              }else{
                this.$router.push('/profile');
              }
               //
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 500px !important;
  padding: 40px 40px;
}

.card {
  /* background-color: #f7f7f7; */
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* -moz-border-radius: 2px;
  -webkit-border-radius: 2px; */
  /* border-radius: 2px; */
  /* -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3); */
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
input{
    height: 35px;
    margin-top: 20px ;
    margin-bottom: 20px ;
}
.log-btn{
  background-color:#10195D;
  color: #ffffff;
}

/* .btn-hover{
  border: 1 solid #FB236A;
  background-color: #FB236A;
  color: #ffffff;
} */
.v-card-title{
  margin-bottom:05%;
  display: flex;
  justify-content: center;
}
.errors{
  margin-bottom: 5%;
  color:#FB236A;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-combobox.error--text,
.error-combobox .error--text {
  color: #FB236A !important;
  caret-color: #FB236A !important;
}

#result .v-btn:hover{
background-color: #FB236A;
}

</style>
