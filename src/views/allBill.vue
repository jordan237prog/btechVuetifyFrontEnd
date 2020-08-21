<template>
  <v-row  justify="center">
      <v-col class=" col-11 .col-md-4">

        <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        sort-by="billName"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>LIST OF ALL BILLS</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              outlined=""
              hide-details
            >
            </v-text-field>

            <v-spacer></v-spacer>

            <router-link to="newBill">
              <v-btn
              link
              color="primary"
              dark
              class="mb-2"
              >New Bill
              </v-btn>
            </router-link>
              
              
            
          </v-toolbar>
        </template>

        <!-- ======================================================================= -->

        

        <!-- ======================================================================== -->

        <template v-slot:[`item.actions`]="{ item }" > 
         
          <v-avatar 
          color="primary"
          @click="editItem(item)"
          size="30" 
          >
            <v-icon  small class="mdi-light">mdi-pencil</v-icon> 
          </v-avatar> 

          <v-avatar 
          class="avatar"
          color="warning"
          @click="editItem(item)"
          size="30" 
          >
            <v-icon  small class="mdi-light">
              <!-- mdi-file-pdf -->
              mdi-file-pdf-box
              </v-icon> 
          </v-avatar>           

          

          <v-dialog v-model="dialog" persistent max-width="320">
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar 
                    color="error"
                    
                    size="30" 
                    v-bind="attrs"
                    v-on="on"
                    >
                      <v-icon  small class="mdi-light">mdi-delete</v-icon> 
                    </v-avatar>
                </template>
                <v-card class>
                  <v-card-title class="headline">COMFIRM DELETE</v-card-title>
                  <v-card-text>Do you really want to delete this bill?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#10195D" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="#FB236A" text @click="[deleteItem(item), dialog = false]">Delete</v-btn>
                  </v-card-actions>
                </v-card>
             </v-dialog>

        </template>

        <template v-slot:no-data>
          <!-- <v-btn color="primary" >Reset</v-btn> -->
        </template>

      </v-data-table>

      </v-col>
  </v-row>
</template>

<script>
  import billService from '../services/bill-service'
  
  export default {
    name: 'allBills',
    data () {
      return {
        search: '',
        dialog: false,
        userId: null,
        loading: false,
        message: null,
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'Bill Name',
            align: 'start',
            sortable: false,
            value: 'billName',
          },
          
          { text: 'Creation on ', value: 'createdAt' },
          { text: 'updated on', value: 'updatedAt' },
          { text: 'Actions', value: 'actions', sortable: false },
        //   { text: 'Protein (g)', value: 'protein' },
        //   { text: 'Iron (%)', value: 'iron' },
        ],
        
        items: [],
      }
    },
    mounted () {
        this.useUserId()
        this.fetchData()
    },

    created () {
        this.fetchData()
        this.useUserId()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      currentUser() {
        return this.$store.state.auth.user;
      },
      getUserID(){
         return this.$store.state.auth.user.id;
      }
    },
    watch: {
        
        '$route': 'fetchData',
        dialog (val) {
          val || this.close()
      },
    },
    methods: {
      // HERE ARE IS OUR LOGIC

      //LETS GET THE USER ID
       useUserId(){
            if(this.getUserID){
                this.userId = this.$store.state.auth.user.id
            }
        },

         fetchData () {
            this.message = null
            this.loading = true
            //console.log(this.userId)
            //const fetchedId = this.$route.params.id
            // replace `getPost` with your data fetching util / API wrapper
            billService.getAllBills(this.userId)
                .then( resData => { 
                    this.loading = false
                    this.items = resData.data
                
                    //console.log(this.items)
                })
                .catch (err => {
                    return{
                        message: err  || 'An error ocurred while fetching the bill components please verify your internet conection and try again letter'
                    }
                });
            
        },

        //====================================================
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        //console.log(item)
        const billId =  item.id

        billService.deleteBill(this.userId, billId)
          .then(data => {
            if (data) {
              this.message = data.message;
              this.fetchData()
              console.log('bill deleted successfully')
            }
          })
          .catch(err =>{
            this.message = err
            console.log('bill not deleted')
          })
          

        // const index = this.items.indexOf(item)
        // confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style lang="css" scoped>
  .avatar {
    margin: 10px;
  }
</style>