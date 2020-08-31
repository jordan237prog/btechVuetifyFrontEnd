<template>
  <v-row justify="center">

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> 

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>  
        </v-toolbar>


        <!-- ================================MY CONTENT ========================================== -->



        <v-container>
        <v-form v-model="isValid"> 
            <v-row>
                <v-col>
                    <h3>Bill by</h3>
                    <img class="img" height="30" src="../assets\kmerfreelance.png">
                </v-col>
            </v-row>

            <v-row>
                <!-- <v-col class=" col-4 .col-md-4">
                    <v-text-field
                    class="error-combobox"
                    outlined
                    type="number"
                    v-model="inputGroup"
                    :rules="verifyBillElement"
                    name="billName"
                    label="Entere the number of  bill items"
                    append-icon="mdi-card-plus"
                    required
                    >
                    </v-text-field>
                </v-col> -->
                
                <v-col class=" col- .col-md-4">
                    
                    <v-text-field
                    class="error-combobox"
                    outlined
                    type="text"
                    v-model="bill.billName"
                    :rules="verifyBillName"
                    name="billName"
                    label="Bill Name"
                    append-icon="mdi-card-plus"
                    required
                    >
                    </v-text-field>
                    
                </v-col>
            </v-row>

            <v-card
            flat
            class="errors"
            >
            
                <span style="color:#FB236A;">{{message}}</span>
            
            </v-card>


            <!-- ====================================BILL TITTLE=============================== -->

            <v-row id = "line_item" justify="center">
                <v-col class=" col-3 .col-md-4">
                    <h3 >
                    ITEM NAME
                    </h3>
                </v-col>

                <v-col class=" col-2 .col-md-4">
                    <h3 >
                    QUANTITY
                    </h3>
                </v-col>

                <!-- <v-col class=" col-2 .col-md-4">
                    <h3 >
                    UNIT PRICE(CFAF)
                    </h3>
                </v-col>

                <v-col class=" col-3 .col-md-4">
                    <h3 >
                    TOTAL
                    </h3>
                </v-col> --> 

                <v-col class=" col-2 .col-md-4">
                    <h3 >
                    
                    </h3>
                </v-col>
            </v-row>

            <!-- <v-row v-if="loading" class=" col-10 .col-md-4" justify="center">

                <v-skeleton-loader
                elevation = 1
                class="mx-auto" 
                width="4000"
                type="card"
            ></v-skeleton-loader>

            </v-row> -->

            <v-row v-if="error" class=" col-10 .col-md-4" justify="center">

            </v-row>

            <!-- ============================================================================== -->
                <!-- v-if="billItemsNames"     -->
                <v-row  justify="center"
                v-for="(bill_line_item, index) in bill_line_items" :key="index"
                >
                    <v-col class=" col-5 .col-md-4">
                        <v-autocomplete
                        chips
                        :items="billItemsNames"
                        item-text="bill_item_name"
                        outlined
                        v-model="bill_line_item.bill_item_name"
                        @change="GetItemPrice"
                        :rules="verifyItemName"
                        color="white"
                        height="2" 
                        name="bill_item_name"
                        label="Item Name"
                        required
                        >
                            <!-- <option v-for="(billItemsName, key) in billItemsNames" :value="billItemsName.name" :key="key">{{ billItemsName.name }}</option> -->
                        </v-autocomplete>
                    </v-col>

                    <v-col class=" col-5 .col-md-4">
                        <v-text-field
                        class="error-combobox"
                        outlined
                        v-model="bill_line_item.quantity"
                        type="number"
                        name="quantity"
                        :rules="verifyQuantity"
                        v-cloneya-input="'quantity'"
                        label="Quantity"
                        append-icon="mdi-numeric-1-box-multiple"
                        required
                        >
                        </v-text-field>
                    </v-col>

                    

                    <v-col class=" col-1 .col-md-4">
                    
                        <v-avatar 
                        color="primary"
                        @click="addLine"
                        x-large
                        >
                            <v-icon class="mdi-108px mdi-light">mdi-playlist-plus</v-icon>
                        </v-avatar> 

                        
                    </v-col>


                    <v-col class=" col-1 .col-md-4">
                        
                        <v-avatar 
                        color="error"
                        v-if="index + 1 === bill_line_items.length"
                        @click="removeLine(index)"
                        x-large
                        >
                            <!-- <v-icon dark>mdi-delete</v-icon>  -->
                            <v-icon dark>mdi-delete-forever</v-icon> 
                        </v-avatar>


                    </v-col>

                    
                </v-row>
            

            <v-row>
                <v-col class="col-8 .col-md-4">

                </v-col>
                <v-col class="col-4 .col-md-4">
                    <v-btn @click="createBill"
                    block
                    x-large
                    :loading="loading"
                    :disabled="!isValid"
                    color="#10195D"
                    class="log-btn"
                    name="createBill"
                    >
                    create bill
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>




        <!-- ==================================ENDS HERE=========================================== -->
        
      </v-card>

    </v-dialog>

  </v-row>
</template>

<script>
import Bill from '../models/bill';
import Bill_items_Service from '../services/bill_items-service';
 import billService from '../services/bill-service' 
  export default {
      name: 'pdf',
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        isValid : true,
        blockRemoval: true,
        price: null,
        inputGroup: 0,
        loading: false,    //state of the page that is if loading a skeleton loader shall be displayed
        billName : null,   //the name that shall be given to the bill
        billItems: null,   //all the bill component are stored here, array of objects, from db
        billItemsNames:[], // the name of each item is stored here in the form [elm name,...] constructed datastructure
        message: null,       //keeps track of all error message
        bill: new Bill('','',''),   //here is the bill object
        bill_line_items:[],          // collection of the the bill elements
        verifyBillName: [
            v => !!v  || 'Bill Name is required',
            v => v && v.length >= 4 || 'Bill Name must be greater than 3 characters'
        ],
        verifyBillElement: [
            v => !!v  || 'Number of elements required',
            v => v && v > 0 || 'Bill must have atleast one element'
        ],
        verifyItemName: [
            v => !!v  || 'Please make a valid selection',
        ],
        verifyQuantity: [
            v => !!v  || 'Please add a valid value',
        ],
      }
    },
     mounted () {
        this.addLine()
        this.useUserId()
    },

    created () {
        // fetch the data when the view is created and the data is (the bill Items)
        // already being observed
        this.fetchData()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData',
        bill_line_items () {
            this.blockRemoval = this.bill_line_items.length <= 1
        }
    },
    methods: {
    
        useUserId(){
            if(this.getUserID){
                this.bill.userId = this.$store.state.auth.user.id
            }
        },
        
        addLine () {
            let checkEmptybill_line_items = this.bill_line_items.filter(bill_line_item => bill_line_item.bill_item_name === null)
            if (checkEmptybill_line_items.length >= 1 && this.bill_line_items.length > 0) {
                this.message = "Please fill the last line before adding a new one !"
                return
            }
            this.bill_line_items.push({
                bill_item_name : null,
                quantity       : null,
                price          : null,
            })
        },

        removeLine (bill_line_itemId) {
            if (!this.blockRemoval) {
                this.bill_line_items.splice(bill_line_itemId, 1)
            }
        },
        
        fetchData () {
            this.error = this.billItems = null
            this.loading = true
            //const fetchedId = this.$route.params.id
            // replace `getPost` with your data fetching util / API wrapper
            Bill_items_Service.getBillItems()
                .then( resData => { 
                    this.loading = false
                    this.billItems = resData.data
                    for(let i = 0; i < resData.data.length; i++ ){
                        
                        this.billItemsNames.push(resData.data[i].bill_item_name)
                        //console.log(this.billItemsNames[i])
                        
                    }
                    //console.log(this.billItemsNames)
                })
                .catch (err => {
                    return{
                        message: err  || 'An error ocurred while fetching the bill components please verify your internet conection and try again letter'
                    }
                });
            
        },
        GetItemPrice(event){
        
            for(let i = 0; i < this.billItems.length; i++){
                //console.log(event)
                if(this.billItems[i].bill_item_name === event){
                    this.bill_line_items.price = this.billItems[i].bill_item_price
                }
            }
        },
        validate () {
            this.$refs.form.validate()
        },

        createBill(){
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                this.bill.bill_line_items = this.bill_line_items

                billService.createBill(this.bill)
                    .then(data => {
                        this.loading = false;
                        this.$router.push('allBill')
                        return data;
                    })
                    .catch(err =>{ 
                        return err || 'Unable to save bill please check your connection and try again'
                    });
            
                

            });
        }
    },

    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      getUserID(){
         return this.$store.state.auth.user.id;
      }
    },
    // useUserId(){
    //     if(this.getUserID){
    //         this.bill.userId = this.getUserID()
    //     }
    // },
    
  }
</script>


<style scoped>

</style>