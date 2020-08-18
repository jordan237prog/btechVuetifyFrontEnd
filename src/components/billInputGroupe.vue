<template>
    
    <div>

        <!-- ============================================================================== -->
            <!-- v-if="billItemsNames"     -->
            <v-row  justify="center"
            v-for="(bill_line_item, index) in bill_line_items" :key="index"
             >
                <v-col class=" col-3 .col-md-4">
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

                <v-col class=" col-2 .col-md-4">
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

                <v-col class=" col-2 .col-md-4">
                    <v-text-field
                    class="error-combobox"
                    outlined
                    disabled
                    :v-model="price"
                    :value="price"
                    type="number"
                    name="Unit Price"
                    label="Unit Price"
                    append-icon="mdi-currency-eur"
                    required
                    >
                    </v-text-field>
                    <!-- <h3>{{price}}</h3> -->
                </v-col>

                <v-col class=" col-3 .col-md-4">
                    <v-text-field
                    class="error-combobox"
                    outlined
                    type="text"
                    name="Total"
                    disabled
                    label="Total"
                    append-icon="mdi-calculator-variant"
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
                        <v-icon dark>mdi-minus</v-icon>
                    </v-avatar>

                    

                </v-col>

                
            </v-row>

    </div>

</template>


<script>
import Bill from '../models/bill';
import Bill_items_Service from '../services/bill_items-service';
// import billService from '../services/bill-service'

export default {
    name : "bill-input-group",

    // props: {
    //     numLabels: {
    //         type: Number, // type of the property
    //         required: (true|false), // is this prop required or not?
    //         default: 0 // default value for this prop
    //     }
    // },
    
    data(){
        
        return{
           
            blockRemoval: true,
            price: null,
            inputGroup: 0,
            loading: false,    //state of the page that is if loading a skeleton loader shall be displayed
            billName : null,   //the name that shall be given to the bill
            billItems: null,   //all the bill component are stored here, array of objects, from db
            billItemsNames:[], // the name of each item is stored here in the form [elm name,...] constructed datastructure
            error: null,       //keeps track of all error messages

            bill: new Bill('','',''),   //here is the bill object

            // bill_line_item:{            // here is an element of a bill
            //     bill_item_name : '',
            //     quantity       : ''
            // },

            bill_line_items:[],          // collection of the the bill elements

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
        addLine () {
            let checkEmptybill_line_items = this.bill_line_items.filter(bill_line_item => bill_line_item.bill_item_name === null)
            if (checkEmptybill_line_items.length >= 1 && this.bill_line_items.length > 0) {
                return
            }
            this.bill_line_items.push({
                bill_item_name : null,
                quantity       : null
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
                    this.price = this.billItems[i].bill_item_price
                }
            }
        },
       

    },

    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      getUserID(){
         return this.$store.state.auth.user.id;
      }
    },
    useUserId(){
        if(this.getUserID){
            this.bill.userId = this.getUserID()
        }
    },
    
    
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