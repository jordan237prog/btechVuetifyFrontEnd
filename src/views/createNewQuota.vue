<template>
    
    <v-container>
        <v-form v-model="isValid"> 
            <v-row>
                <v-col>
                    <h3>Project Quota(Devis)</h3>
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


            <!-- ====================================quote TITTLE=============================== -->

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

            

            <v-row v-if="error" class=" col-10 .col-md-4" justify="center">

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
                        @change="GetItemPrice"
                        :rules="verifyItemName"
                        color="white"
                        height="2" 
                        name="quote_item_name"
                        label="Item Name"
                        required
                        >
                            <!-- <option v-for="(quoteItemsName, key) in quoteItemsNames" :value="quoteItemsName.name" :key="key">{{ quoteItemsName.name }}</option> -->
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
                <v-col class="col-8 .col-md-4">

                </v-col>
                <v-col class="col-4 .col-md-4">
                    <v-btn @click="createQuote"
                    block
                    x-large
                    :loading="loading"
                    :disabled="!isValid"
                    color="#10195D"
                    class="log-btn"
                    name="createQuote"
                    >
                    create quote
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>

</template>

<script>
import Quote from '../models/quote';
import Quote_items_Service from '../services/quote_items-service';
 import quoteService from '../services/quote-service'

export default {
    name : "createNewQuota",

    // props: {
    //     numLabels: {
    //         type: Number, // type of the property
    //         required: (true|false), // is this prop required or not?
    //         default: 0 // default value for this prop
    //     }
    // },
    
    data(){
        
        return{
            isValid : true,
            blockRemoval: true,
            price: null,
            inputGroup: 0,
            loading: false,    //state of the page that is if loading a skeleton loader shall be displayed
            quoteName : null,   //the name that shall be given to the quote
            quoteItems: null,   //all the quote component are stored here, array of objects, from db
            quoteItemsNames:[], // the name of each item is stored here in the form [elm name,...] constructed datastructure
            message: null,       //keeps track of all error message
            quote: new Quote('','',''),   //here is the quote object
            quote_line_items:[],          // collection of the the quote elements
            verifyQuoteName: [ 
                v => !!v  || 'quote Name is required',
                v => v && v.length >= 4 || 'quote Name must be greater than 3 characters'
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
        this.addLine()
        this.useUserId()
    },

    created () {
        // fetch the data when the view is created and the data is (the quote Items)
        // already being observed
        this.fetchData()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData',
        quote_line_items () {
            this.blockRemoval = this.quote_line_items.length <= 1
        }
    },
    methods: {
    
        useUserId(){
            if(this.getUserID){
                this.quote.userId = this.$store.state.auth.user.id
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
        
        fetchData () {
            this.error = this.quoteItems = null
            this.loading = true
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
                    //console.log(this.quoteItemsNames)
                })
                .catch (err => {
                    return{
                        message: err  || 'An error ocurred while fetching the quote components please verify your internet conection and try again letter'
                    }
                });
            
        },
        GetItemPrice(event){
        
            for(let i = 0; i < this.quoteItems.length; i++){
                //console.log(event)
                if(this.quoteItems[i].quote_item_name === event){
                    this.quote_line_items.price = this.quoteItems[i].quote_item_price
                }
            }
        },
        validate () {
            this.$refs.form.validate()
        },

        createQuote(){
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                this.quote.quote_line_items = this.quote_line_items
                console.log(this.quote)

                quoteService.createQuote(this.quote)
                    .then(data => {
                        this.loading = false;
                        this.$router.push('allQuota')
                        return data;
                    })
                    .catch(err =>{ 
                        return err || 'Unable to save quote please check your connection and try again'
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
    //         this.quote.userId = this.getUserID()
    //     }
    // },
    
    
}
</script>

<style scoped>
.inputs{
    height: 10px;
}
.itemSelectionTag{
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none; 
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: menulist;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
    cursor: default;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
    border-image: initial;

    border: solid 1px grey;
    height: 53px;
    border-radius: 5%; 
}
.log-btn{
  background-color:#10195D;
  color: #ffffff;
} 

</style>