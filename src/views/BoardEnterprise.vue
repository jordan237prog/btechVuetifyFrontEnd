<template>
  <div class="container">
    <header class="jumbotron">
      <!-- <h3>{{content}}</h3> -->
    </header>

     <v-container>
       <v-row>
        <v-col>
          
          <router-link to="/newQuota" class="username">

            <v-card
            class="pa-2"
            shaped 
            ripple
            hover
            max-width="500"
            height="400"
            >
              <v-img
              src="../assets/quote.png"
              height="300px"
              >
              </v-img>

              <v-card-title>
                CREATE A NEW QUOTA(DEVIS)
              </v-card-title>

              <v-card-subtitle>
                A Quato gives a rough estimation of the cost of a project
              </v-card-subtitle>

              <v-card-actions>
                
              </v-card-actions>
                
            </v-card>

          </router-link>
          
        </v-col>


        <v-col>
          <router-link to="allQuota" class="username">
            <v-card
            class="pa-2"
            shaped 
            ripple
            hover
            max-width="500"
            height="400"
            >

              <v-img
              src="../assets/management-qualite.png"
              height="300px"
              ></v-img>

              <v-card-title>
                MANAGE ALL EXISTING QUOTAS
              </v-card-title>

              <v-card-subtitle>
                Manage all previously created quotas 
              </v-card-subtitle>

              <v-card-actions>
                
              </v-card-actions>
              
            </v-card>
          </router-link>
        </v-col>

      </v-row>

      <v-row>
        <v-col>
          
          <router-link to="/newBill" class="username">

            <v-card
            class="pa-2"
            shaped 
            ripple
            hover
            max-width="500"
            height="400"
            >
              <v-img
              src="../assets/bill (1).png"
              height="300px"
              >
              </v-img>

              <v-card-title>
                CREATE A NEW BILL
              </v-card-title>

              <v-card-subtitle>
                For all done project a bill is required, and all specifications given
              </v-card-subtitle>

              <v-card-actions>
                
              </v-card-actions>
                
            </v-card>

          </router-link>
          
        </v-col>


        <v-col>
          <router-link to="allBill" class="username">
            <v-card
            class="pa-2"
            shaped 
            ripple
            hover
            max-width="500"
            height="400"
            >

              <v-img
              src="../assets/billManagement (1).png"
              height="300px"
              ></v-img>

              <v-card-title>
                MANAGE ALL EXISTING BILLS
              </v-card-title>

              <v-card-subtitle>
                Manage all previously created bills 
              </v-card-subtitle>

              <v-card-actions>
                
              </v-card-actions>
              
            </v-card>
          </router-link>
        </v-col>

      </v-row>


      <!-- <v-row>
        <v-col>
          <v-card
            class="mx-auto" 
            shaped 
            ripple
            width="850"
            height="400"
            >

            <div class="bill_callation_div">
                <v-img
                src="../assets/calculation.png"
                height="300px"
                width="300px" 
              ></v-img>
              <div class="billnumberContainer">
                <h1 class="numberOfBill">{{numberOfBills}}</h1>
              </div>
            </div>

          

            <v-card-title>
              TOTAL NUMBER OF BILL CREATED
            </v-card-title>

            <v-card-subtitle>
              Here is the bill counter, from is you can get the total number of bills you created
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row> -->


    </v-container>


    <!-- v-bind:to="'home'" -->

        <div class="itemContainer">


          <!-- <v-skeleton-loader
            elevation = 1
            class="mx-auto" 
            width="500"
            type="card"
          ></v-skeleton-loader> -->

        </div>

    <!-- ===================================================================================== -->


    <div class="itemContainer">

      <v-carousel cycle
      height="300"
      >
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
        </v-carousel-item>
      </v-carousel>
    </div>

  </div>
</template>

<script>
import UserService from '../services/user-services';

export default {
  name: 'User',
  data() {
    return {
      content: '',
      numberOfBills: 15,
      items: [
          {
            src: 'https://scontent.fdla1-1.fna.fbcdn.net/v/t1.0-9/101014127_142372307374548_1672879681503756288_o.jpg?_nc_cat=107&_nc_sid=730e14&_nc_eui2=AeFgTGp-QHWyYIzghoFz25gfan1Z5dRjvPxqfVnl1GO8_NEVBF2or5jPtV_pnk9KAOMjHRfeOpExhUc6ErelT3ff&_nc_ohc=YVEGq5XJs_YAX8VG9Wu&_nc_ht=scontent.fdla1-1.fna&oh=a38770f849d37e52b8e66beb68515fd5&oe=5F50D3BD',
          },
          {
            src: 'https://scontent.fdla1-1.fna.fbcdn.net/v/t1.0-9/116219173_159262935685485_7471822468063906070_o.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_eui2=AeHQQzAY-w3i1nvkUwaiTdF3LVZq2LlGIXctVmrYuUYhd01JHUxY32Nmy4dJsUlnd5VUoH07YzK2dh6K1LFZotTB&_nc_ohc=9smRWKIbnYoAX-LumnL&_nc_ht=scontent.fdla1-1.fna&oh=2400cd924c57cb29d303391551b923b2&oe=5F50EA54',
          },
          {
            src: 'https://scontent.fdla1-1.fna.fbcdn.net/v/t1.0-9/115795911_159262955685483_8801703752096747113_o.jpg?_nc_cat=107&_nc_sid=8bfeb9&_nc_eui2=AeGjR6Wc5GchXGMHsj-FdVGswUmK-a-9ITXBSYr5r70hNSDi50R1jy_6J9PccupUbJ_jkmctWkr9P28L-dcTfZHX&_nc_ohc=NttcznHhh2UAX98UIT2&_nc_ht=scontent.fdla1-1.fna&oh=fc2172af5ddfd9f1017aeb72c3e9a689&oe=5F533AA7',
          },
          {
            src: 'https://scontent.fdla1-1.fna.fbcdn.net/v/t1.0-9/87843509_103610831250696_4460203007228772352_n.jpg?_nc_cat=107&_nc_sid=174925&_nc_eui2=AeEA5AMyjNCbioc69XvC1U3qBt_4Utp3fhAG3_hS2nd-ECo9bGfUd6tUWevs3tE0VcrpdykN2XJ1Gt5kCbL7OGFn&_nc_ohc=sn_28T6a-KMAX_WbzwU&_nc_ht=scontent.fdla1-1.fna&oh=5e4870959ba32e63f22d46ee6796e17d&oe=5F50F9C5',
          },
        ],
    };
  },
  mounted() {
    UserService.getEnterpriseBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>