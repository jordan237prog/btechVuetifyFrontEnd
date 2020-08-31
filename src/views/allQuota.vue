<template>
  <div>
    <v-row  justify="center">
        <v-col class=" col-11 .col-md-4">

          <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          sort-by="quoteName" 
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>LIST OF ALL  QUOTAS</v-toolbar-title>
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

              <router-link to="newQuota">
                <v-btn
                link
                color="primary"
                dark
                class="mb-2"
                >New Quota
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

      <!-- ===========================EDIT Quote CODE HERE==================================== -->

        <v-dialog v-model="editDialog" persistent max-width="900px">
      
        
      
      <v-card>
        <v-card-title>
          <span class="headline">Edit Quote</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <!--  -->
             <v-form v-model="isValid"> 
                <v-row>
                    <v-col>
                        <h3>Quota by</h3>
                        <img class="img" height="30" src="../assets\kmerfreelance.png">
                    </v-col>
                </v-row>

                <v-row>
                    
                    <v-col class=" col- .col-md-4">
                        
                        <v-text-field
                        class="error-combobox"
                        outlined
                        type="text"
                        v-model="quote.quoteName"
                        :rules="verifyQuoteName"
                        name="quoteName"
                        label="Quote Name"
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


                <!-- ====================================Quote TITTLE=============================== -->

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
                    <!-- v-if="quoteItemsNames"     -->
                    <v-row  justify="center"
                    v-for="(quote_line_item, index) in quote_line_items" :key="index"
                    >
                        <v-col class=" col-5 .col-md-4">
                            <v-autocomplete
                            chips
                            :items="quoteItemsNames"
                            item-text="quote_item_name"
                            outlined
                            v-model="quote_line_item.quote_item_name"
                            :rules="verifyItemName"
                            color="white"
                            height="2" 
                            name="quote_item_name"
                            label="Item Name"
                            required
                            >
                            </v-autocomplete>
                        </v-col>

                        <v-col class=" col-5 .col-md-4">
                            <v-text-field
                            class="error-combobox"
                            outlined
                            v-model="quote_line_item.quantity"
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
                            v-if="index + 1 === quote_line_items.length"
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
                        <!-- <router-link to="allQuote"> -->
                            <v-btn
                            block
                            @click="cancel"
                            x-large
                            color = error
                            class="log-btn"
                            name="createQuote"
                            >
                            cancel
                            </v-btn> 
                        <!-- </router-link> -->
                    </v-col>
                    
                    <v-col class="col-3 .col-md-4">
                        <v-btn @click="updateQuote"
                        block
                        x-large
                        :loading="loading"
                        :disabled="!isValid"
                        color="#10195D"
                        dark
                        class="log-btn"
                        name="createQuote"
                        >
                        update quote
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
          </v-container>
         
        </v-card-text>   
      </v-card>
    </v-dialog>


      <!-- /========================view quote code here================================================/ -->
        <template>
          <v-row>
            <v-dialog v-model="viewDialog" width="800px" persistent  >
              
                
              
              <v-card>
                <div id="pdfToBeGenerated">

                    <v-card-title>
                      <v-row >Quota name :  <h3>{{quote_Name}}</h3 ></v-row>
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
                                  <td>{{ selectedToView.quote_item_name }}</td>
                                  <td>{{ selectedToView.quote_line_item.quantity }}</td>
                                  <td>{{ selectedToView.quote_item_price }}</td>
                                  <td><h3>{{ (Number(selectedToView.quote_item_price) * Number(selectedToView.quote_line_item.quantity)) }}</h3></td> 
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
  import quoteService from '../services/quote-service'
  import * as html2pdf from 'html2pdf.js'
  import Quote from '../models/quote';
  import Quote_items_Service from '../services/quote_items-service';

  export default {
    name: 'allQuota',
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
            text: 'Quote Name',
            align: 'start',
            sortable: false,
            value: 'quoteName',
          },
          
          { text: 'Creation on ', value: 'createdAt' },
          { text: 'updated on', value: 'updatedAt' },
          { text: 'Actions', value: 'actions', sortable: false },
        //   { text: 'Protein (g)', value: 'protein' },
        //   { text: 'Iron (%)', value: 'iron' },
        ],
        
        items: [],           // here is store all the created quotes
        selectedToView: [], // here is stored the data of the quote to be viewed
        quote_Name: "",
        totalPrice:"",

        initialLength: null,  // the initial length of the quote line items before update
        quoteId : null,
        editDialog: false,
        isValid : true,
        blockRemoval: true,
        inputGroup: 0,
        quoteName : null,   //the name that shall be given to the quote
        quoteItems: null,   //all the quote component are stored here, array of objects, from db
        quoteItemsNames:[], // the name of each item is stored here in the form [elm name,...] constructed datastructure
          
        quote: new Quote('','',''),   //here is the quote object
        quote_line_items:[],          // collection of the the quote elements
        verifyQuoteName: [
            v => !!v  || 'Quote Name is required',
            v => v && v.length >= 4 || 'Quote Name must be greater than 3 characters'
        ],
        verifyQuoteElement: [
            v => !!v  || 'Number of elements required',
            v => v && v > 0 || 'quote must have atleast one element'
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
        this.fetchQuotes()
        this.fetchQuote_item() 
    },

    created () {
        this.fetchQuotes()
        this.fetchQuote_item()
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
        quote_line_items () {
          this.blockRemoval = this.quote_line_items.length <= 1
        }
       
       
    },
    methods: {
      // HERE ARE IS OUR LOGIC

      cancel(){
             this.editDialog = false
             this.quote_line_items = []
            // location.reload()
              
        },

      //LETS GET THE USER ID
       useUserId(){
            if(this.getUserID){
                this.userId = this.$store.state.auth.user.id
            }
        },

        addLine () {
            let checkEmptyquote_line_items = this.quote_line_items.filter(quote_line_item => quote_line_item.quote_item_name === null)
            if (checkEmptyquote_line_items.length >= 1 && this.quote_line_items.length > 0) {
                this.message = "Please fill the last line before adding a new one !"
                return
            }
            this.quote_line_items.push({
                quote_item_name : null,
                quantity       : null,
            })
        },

        removeLine (quote_line_itemId) {
            if (!this.blockRemoval) {
                this.quote_line_items.splice(quote_line_itemId, 1)
            }
        },

         validate () {
            this.$refs.form.validate()
        },

        updateQuote(){
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                const newQuote= {
                  quoteName : this.quote.quoteName,
                  userId: this.userId,
                  quote_line_items : this.quote_line_items
                }
                console.log(newQuote)
                quoteService.deleteQuote(this.userId, this.quoteId)
                    .then(() => {
                        this.loading = false;
                        // this.$router.push('allQuote')
                        location.reload();
                    })
                    .catch(err =>{ 
                        return err || 'Unable to save quote please check your connection and try again'
                    });
            
                quoteService.createQuote( newQuote)
                    .then((data) => {
                        this.loading = false;
                        // this.$router.push('allQuote')
                        return data
                    })
                    .catch(err =>{ 
                        return err || 'Unable to save quote please check your connection and try again'
                    });
                this.editDialog = false
                location.reload();location.reload();
                  
            });
        },

         fetchQuotes () {
            this.message = null
            this.loading = true
            //console.log(this.userId)
            //const fetchedId = this.$route.params.id
            // replace `getPost` with your data fetching util / API wrapper
            quoteService.getAllQuotes(this.userId)
                .then( resData => { 
                    this.loading = false
                    this.items = resData.data
                
                    //console.log(this.items)
                })
                .catch (err => {
                    return{
                        message: err  || 'An error ocurred while fetching the quote components please verify your internet conection and try again letter'
                    }
                });
            
        },

        fetchQuote_item () {
            this.message = null
            this.loading = true
            //console.log(this.userId)
            //const fetchedId = this.$route.params.id
            // replace `getPost` with your data fetching util / API wrapper
            Quote_items_Service.getQuoteItems()
                .then( resData => { 
                    this.loading = false
                    this.quoteItems = resData.data
                    for(let i = 0; i < resData.data.length; i++ ){
                        
                        this.quoteItemsNames.push(resData.data[i].quote_item_name)
                        //console.log(this.quoteItemsNames[i])
                        
                    }
                })
                .catch (err => {
                    return{
                        message: err  || 'An error ocurred while fetching the quote components please verify your internet conection and try again letter'
                    }
                });
            
        },

        //====================================================
      editItem (item) { 
        //console.log(item)
        this.quote.quoteName= item.quoteName 
        this.quoteId = item.id  
        const elmt = item.quote_items
        
         for(let i = 0; i < elmt.length; i++){
           
           this.quote_line_items.push({
             quantity : item.quote_items[i].quote_line_item.quantity,
             quote_item_name : item.quote_items[i].quote_item_name
           })   
           
         }
         console.log(this.quote_line_items)
        
      },

      view(item){
        //console.log(item.quote_items) 
        this.quote_Name = item.quoteName 
        this.selectedToView = item.quote_items 
         
          if(item.quote_items){
            var totalPrice = 0
            for (let i = 0; i < item.quote_items.length; ++i){
                totalPrice = (item.quote_items[i].quote_item_price * item.quote_items[i].quote_line_item.quantity ) + totalPrice
            } 
            console.log(totalPrice)
            this.totalPrice = totalPrice
          }

        
      },
      downloadpdf(){

        const options = {
          filename : this.quote_Name,
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
       
            if(confirm("ARE YOU SURE, YOU WANT TO DELETE "+ item.quoteName +"?") === true){
              const quoteId =  item.id

              quoteService.deleteQuote(this.userId, quoteId)
                .then(data => {
                  if (data) {
                    this.message = data.message;
                    
                    this.fetchQuotes() 
                    console.log('quote deleted successfully')
                  }
                })
                .catch(err =>{
                  this.message = err
                  console.log('quote not deleted')
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