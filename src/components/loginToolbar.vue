<template>
  <nav  
      > 

    <v-app-bar
      height="125"
      dense
      dark
      flat
      src="../assets\bg1.png"
    >
      <v-app-bar-nav-icon 
        v-if="currentUser" 
        @click.stop="drawer = !drawer">
      
      </v-app-bar-nav-icon> <v-icon>mdi-dehaze</v-icon> <span v-if="currentUser" class="menu" >MENU</span>

      <img class="img" height="50" src="../assets\kmerfreelance.png">

      <v-spacer></v-spacer>

      <div v-if="!currentUser" class="login-form-icons ">
        <router-link to="/login" class="username item-hover">
          <v-icon class="icons">mdi-account-key</v-icon> 
          <span  class="menu username" style=" margin-left:10px;">
            LogIn
          </span>
          <!-- <img src="../assets\FontAwesome_f084(1)_32.png" class="icon"  alt=""> -->
        </router-link>
        
        
        <router-link to="/register" class="username item-hover">
          <v-icon class="icons">mdi-account-edit</v-icon> 
          <span  class="menu username" style=" margin:0, 10px">
            SignUp
          </span>
          <!-- <img src="../assets\Material Icons_e7fe(0)_32.png" class="icon"  alt=""> -->
        </router-link>
      </div>
    </v-app-bar>

    <!-- ===================side-bar==============================================-bar -->

    <v-navigation-drawer app 
        v-model="drawer" 
        :color="color"
        :right="right"
        temporary
        absolute
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <router-link to="/profile" class="username" v-if="currentUser"  > 
            <v-list-item two-line link >
           
              <avatar v-if="currentUser"
              :username="currentUser.username"
              background-color="#FB236A" 
              color="#fff" 
              margin-right = "15px" 
              
              >  
              </avatar> 
              
              <v-list-item-content style="margin:20px; ">
                <v-list-item-title >
                  <span  >{{ currentUser.username }}</span>
                </v-list-item-title>
              </v-list-item-content>
              
             </v-list-item>
         </router-link> 

          <v-divider></v-divider>

<!-- ========================================================================= -->
          <v-list-item
            link
          > 

            <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content >
              
              <div  v-if="showLanceBoard">
                  <router-link to="/lance" class="username"><v-toolbar-title> <span class="username" >LanceBoard</span> </v-toolbar-title></router-link>
              </div>
              
              <li v-if="showEnterpriseBoard">
                <router-link to="/enterprise" class="username"> <span class="username" > EnterpriseBoard </span></router-link>
              </li>
          
            </v-list-item-content>
          </v-list-item>  
<!-- ============================================================================ -->

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >

            <!-- ============================================================================== -->

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <v-row justify="center">
              <v-dialog v-model="dialog" persistent max-width="320">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block style="background-color:#FB236A;"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Logout
                    </v-btn>
                  </template>
                <v-card>
                  <v-card-title class="headline">LOGOUT</v-card-title>
                  <v-card-text>Do you want to logout?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#10195D" text @click="dialog = false">CANCEL</v-btn>
                    <v-btn color="#FB236A" text @click="logOut">YES LOGOUT</v-btn>
                  </v-card-actions>
                </v-card>
             </v-dialog>
          </v-row>
      </template>

      </v-navigation-drawer>

    <!-- ======================================side bar ends here============================================ -->

    <!-- =======================================LOGOUT POPUP============================================== -->

    

    <!-- ========================================================================================================== -->

  </nav> 
</template>

<script>
import Avatar from 'vue-avatar'
export default {
    name:'loginToolBar',

    components: {
      Avatar
  },

    data() {
      return{
        dialog: false,
        drawer: false,
        items: [
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        color: '#10195D',
        colors: [  
          'primary',
          'blue',
          'success',
          'red',
          'teal',
          '#10195D'
        ],
        right: false,
        permanent: false,
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      showLanceBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('LANCE');
          
        }

        return false;
      },
      showEnterpriseBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ENTERPRISE');
         
        }

        return false;
      }
    },
    methods: {
    logOut() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
   .img{
     margin-left:45px
   }
   .icon{
     margin-left:25px;
     margin-bottom: 10px;
   }
   .username{
     color: white;
     text-decoration: none;
     text-decoration-line: none; 
     font-size: 14px;
   }
   .signinSignup{
    height: 20px;
}
.display{
  display: block;
}
@media screen and (max-width:450px) {

  .menu{
    display: none; 
  }

  .item-hover:hover{
    color: tomato;
  }
  .icons{
    margin: 15px;
  }
  
}
.icons{
    margin: 10px,2px,10px,15px;
  }
</style>