<template>
  <div>
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
            @click="[editItem(item), editDialog = true]"
            size="30" 
            >
              <v-icon  small class="mdi-light">mdi-pencil</v-icon> 
            </v-avatar> 

            <v-avatar 
            class="avatar"
            color="warning"
            @click="[view(item), viewDialog = true]"
            size="30" 
            >
              <v-icon  small class="mdi-light">
                <!-- mdi-file-pdf -->
                mdi-file-pdf-box
                </v-icon> 
            </v-avatar>           

              <v-avatar   
                  color="error" 
                  size="30" 
                @click="deleteItem(item)"
                  >
                    <v-icon  small class="mdi-light">mdi-delete</v-icon> 
              </v-avatar>
          </template>

          <template v-slot:no-data>
            <!-- <v-btn color="primary" >Reset</v-btn> -->
          </template>

        </v-data-table>

        </v-col>
      
      </v-row>

      <!-- ===========================EDIT BILL CODE HERE==================================== -->

        <v-dialog v-model="editDialog" persistent max-width="900px">
      
        
      
      <v-card>
        <v-card-title>
          <span class="headline">Edit Bill</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <!--  -->
             <v-form v-model="isValid"> 
                <v-row>
                    <v-col>
                        <h3>Bill by</h3>
                        <img class="img" height="30" src="../assets\kmerfreelance.png">
                    </v-col>
                </v-row>

                <v-row>
                    
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
                        small
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
                    <v-col class=" col-2 .col-md-4">
                        <h3 >
                        
                        </h3>
                    </v-col>
                </v-row>

                <v-row v-if="message" class=" col-10 .col-md-4" justify="center">

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
                            :rules="verifyItemName"
                            color="white"
                            height="2" 
                            name="bill_item_name"
                            label="Item Name"
                            required
                            >
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
                    <v-col class="col-6 .col-md-4">

                    </v-col>
                    <v-col class="col-3 .col-md-4">
                        <!-- <router-link to="allBill"> -->
                            <v-btn
                            block
                            @click="cancel"
                            x-large
                            color = error
                            class="log-btn"
                            name="createBill"
                            >
                            cancel
                            </v-btn> 
                        <!-- </router-link> -->
                    </v-col>
                    
                    <v-col class="col-3 .col-md-4">
                        <v-btn @click="updateBill"
                        block
                        x-large
                        :loading="loading"
                        :disabled="!isValid"
                        color="#10195D"
                        dark
                        class="log-btn"
                        name="createBill"
                        >
                        update bill
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
          </v-container>
         
        </v-card-text>   
      </v-card>
    </v-dialog>


      <!-- /========================view bill code here================================================/ -->
        <template>
          <v-row>
            <v-dialog v-model="viewDialog" width="800px" persistent  >
              
                
              
              <v-card>
                <div id="pdfToBeGenerated">

                    <v-card-title>
                      <v-row >Bill name :  <h3>{{bill_Name}}</h3 ></v-row>
                    </v-card-title> <v-divider></v-divider>

                    <v-card-text>
                      <v-row>
                        <v-col class=" col- .col-md-4">
                                
                        </v-col>
                        <v-col class=" col-2 .col-md-4">
                            <!-- <h3>Powered by</h3> -->
                            <img class="img" height="30" src="../assets\kmerfreelance.png">
                        </v-col>
                      </v-row>

                        <template>
                          <v-simple-table height="300px">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">Designation</th>
                                  <th class="text-left">Quantity</th>
                                  <th class="text-left">Unit price(XAF)</th>
                                  <th class="text-left">Total Price(XAF)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(selectedToView, index) in selectedToView" :key="index">
                                  <td>{{ selectedToView.bill_item_name }}</td>
                                  <td>{{ selectedToView.bill_line_item.quantity }}</td>
                                  <td>{{ selectedToView.bill_item_price }}</td>
                                  <td><h3>{{ (Number(selectedToView.bill_item_price) * Number(selectedToView.bill_line_item.quantity)) }}</h3></td> 
                                </tr>
                              </tbody>
                              
                            </template>
                          </v-simple-table>
                        </template>
                        <v-divider></v-divider>
                        <v-row>
                                <v-col class=" col-1 .col-md-4" ></v-col>
                                <v-col class=" col- .col-md-4" ><h2>Total</h2></v-col>
                                <v-col class=" col-3 .col-md-4"> <h2>{{  totalPrice }}</h2> </v-col>
                              </v-row>
                        <v-divider></v-divider>
                    </v-card-text>

                  </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"  @click="viewDialog = false">share<v-icon small class="mdi-light">mdi-share</v-icon></v-btn>
                  <v-btn color="warning"  @click="downloadpdf">Download<v-icon small class="mdi-light">mdi-download</v-icon> </v-btn>
                  <v-btn color="error"  @click="viewDialog = false">back <v-icon small class="mdi-light">mdi-arrow-right</v-icon></v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
        <!-- /============================================ENDS HERE=================================/ -->
  </div>
</template>

<script>
  import billService from '../services/bill-service'
  import * as html2pdf from 'html2pdf.js'
  import Bill from '../models/bill';
  import Bill_items_Service from '../services/bill_items-service';

  export default {
    name: 'allBills',
    data () {
      return {
        search: '',
        viewDialog: false,
        dialog: false,
        userId: null,
        loading: false,
        message: null,
        singleSelect: false,
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
        
        items: [],           // here is store all the created bills
        selectedToView: [], // here is stored the data of the bill to be viewed
        bill_Name: "",
        totalPrice:"",

        initialLength: null,  // the initial length of the bill line items before update
        billId : null,
        editDialog: false,
        isValid : true,
        blockRemoval: true,
        inputGroup: 0,
        billName : null,   //the name that shall be given to the bill
        billItems: null,   //all the bill component are stored here, array of objects, from db
        billItemsNames:[], // the name of each item is stored here in the form [elm name,...] constructed datastructure
          
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
        this.useUserId()
        this.fetchBills()
        this.fetchBill_item() 
    },

    created () {
        this.fetchBills()
        this.fetchBill_item()
        this.useUserId()
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      getUserID(){
         return this.$store.state.auth.user.id;
      }
    },
    watch: {
        
        '$route': 'fetchData',
        bill_line_items () {
          this.blockRemoval = this.bill_line_items.length <= 1
        }
       
       
    },
    methods: {
      // HERE ARE IS OUR LOGIC

      cancel(){
             this.editDialog = false
             this.bill_line_items = []
            // location.reload()
              
        },

      //LETS GET THE USER ID
       useUserId(){
            if(this.getUserID){
                this.userId = this.$store.state.auth.user.id
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
            })
        },

        removeLine (bill_line_itemId) {
            if (!this.blockRemoval) {
                this.bill_line_items.splice(bill_line_itemId, 1)
            }
        },

         validate () {
            this.$refs.form.validate()
        },

        updateBill(){
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                const newBill= {
                  billName : this.bill.billName,
                  userId: this.userId,
                  bill_line_items : this.bill_line_items
                }
                console.log(newBill)
                billService.deleteBill(this.userId, this.billId)
                    .then(() => {
                        this.loading = false;
                        // this.$router.push('allBill')
                        location.reload();
                    })
                    .catch(err =>{ 
                        return err || 'Unable to save bill please check your connection and try again'
                    });
            
                billService.createBill( newBill)
                    .then((data) => {
                        this.loading = false;
                        // this.$router.push('allBill')
                        return data
                    })
                    .catch(err =>{ 
                        return err || 'Unable to save bill please check your connection and try again'
                    });
                this.editDialog = false
                location.reload();location.reload();
                  
            });
        },

         fetchBills () {
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

        fetchBill_item () {
            this.message = null
            this.loading = true
            //console.log(this.userId)
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
                })
                .catch (err => {
                    return{
                        message: err  || 'An error ocurred while fetching the bill components please verify your internet conection and try again letter'
                    }
                });
            
        },

        //====================================================
      editItem (item) { 
        //console.log(item)
        this.bill.billName= item.billName 
        this.billId = item.id  
        const elmt = item.bill_items
        
         for(let i = 0; i < elmt.length; i++){
           
           this.bill_line_items.push({
             quantity : item.bill_items[i].bill_line_item.quantity,
             bill_item_name : item.bill_items[i].bill_item_name
           })   
           
         }
         console.log(this.bill_line_items)
        
      },

      view(item){
        //console.log(item.bill_items) 
        this.bill_Name = item.billName 
        this.selectedToView = item.bill_items 
         
          if(item.bill_items){
            var totalPrice = 0
            for (let i = 0; i < item.bill_items.length; ++i){
                totalPrice = (item.bill_items[i].bill_item_price * item.bill_items[i].bill_line_item.quantity ) + totalPrice
            } 
            console.log(totalPrice)
            this.totalPrice = totalPrice
          }

        
      },
      downloadpdf(){

        const options = {
          filename : this.bill_Name,
          image: { type: 'jpeg' }, 
          html2canvas: {},
          jsPDF: {orientation : 'landscape'},
          margin: [10, 10]
        }
        const element = document.getElementById('pdfToBeGenerated')
        html2pdf()
          .from(element)
          .set(options)
          .save()



      },
       
      deleteItem (item) {
        //console.log(item)
       
            if(confirm("ARE YOU SURE, YOU WANT TO DELETE "+ item.billName +"?") === true){
              const billId =  item.id

              billService.deleteBill(this.userId, billId)
                .then(data => {
                  if (data) {
                    this.message = data.message;
                    
                    this.fetchBills() 
                    console.log('bill deleted successfully')
                  }
                })
                .catch(err =>{
                  this.message = err
                  console.log('bill not deleted')
                })
            }
      
      },

    
    },
  }
</script>

<style lang="css" scoped>
  .avatar {
    margin: 10px;
  }
</style>