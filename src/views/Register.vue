<template>
  <div class="col-md-12">
    <div class="card card-container">

      <v-card
      flat>

        <v-card flat  class="v-card-title">
            <v-card-title>
              REGISTRATION 
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
              type="email"
              v-model="user.email"
              :rules="email_rules"
              name="emila"
              label="E-mail"
              append-icon="mdi-email" 
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


          <v-text-field
              class="error-combobox"
              outlined
              type="password"
              v-model="Vpassword"
              :rules="verifyPass"
              name="Vpassword"
              label="Verify Password"
              append-icon="mdi-account-key"
              required
            >
          </v-text-field>

          
            <v-select
              :items="items"
              :rules="roles_Rules"
              name="roles" id="roles" 
              v-model="user.roles"
              label="I am a/an"
              outlined
              >
            </v-select>
          



         <v-card
         flat
         
         v-if="message"
         :class="successful ? 'Success' : 'errors'"
         >
          <span v-if="message"
         :class="successful ? 'Success' : 'errors'">{{message}}</span>
         </v-card>

          
            
            <v-btn @click="handleRegister"
              block
              
              x-large
              :loading="loading"
               color="#10195D"
              class="log-btn"
              name="login"
              :disabled="!isValid">
              Create Accout
            </v-btn>

      

        </v-form>

      </v-card>

    </div>


  </div>
</template>

<script>
import User from '../models/user';
// import ResgistrationSuccess from './RegiatrationSuccess'

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      items:['Lance', 'Enterprise'],
      submitted: false,
      successful: false,
      message: '',
      Vpassword:'',
      isValid:true,
      loading: false,
      username_rules: [
        v => !!v  || 'Username is required',
        v => v && v.length >= 4 || 'Username must be greater than 3 characters'
      ],
      password_rules: [
        v => !!v  || 'Password is required',
        v => v && v.length  >= 6  || 'Password must be greater than 5 characters'
      ],
      verifyPass: [
          v => !!v && v===this.user.password || 'The passwords don\'t match'
      ],
      email_rules:[
        v => !!v  || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        
      ],
      roles_Rules: [
        v => !!v || 'Please select a Role to continue'
      ]
    };
  },
  computed: {
    
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
 
  
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {

                this.$store.dispatch('register', this.user).then(
                data => {
                this.message = data.message;
                this.successful = true;
                this.$router.push('/RegistrationSuccess');
                
                },
                error => {
                this.message =
                    (error.response && error.response.data.message ) ||
                    error.message ||
                    error.toString();
                this.successful = false;
                }
              );

            
          
        }
      });
    },
    
    //============profil picture upload here ===============================
    // onFileSelected(event){

    //     this.selectedFile = event.target.files[0] 

    // },
    // onUpload(){



    // }
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

  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
 
}
.errors{
  margin-bottom: 5%;
  color:#FB236A;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Success{
  margin-bottom: 5%;
  color:#10195D;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-card-title{
  margin-bottom:05%;
  display: flex;
  justify-content: center;
}
.log-btn{
  background-color:#10195D;
  color: #ffffff;
}

</style>