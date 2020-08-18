<template>
  <v-row >
      <v-col>

        <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items" 
        :single-select="singleSelect"
        item-key="id"
        show-select
        class="elevation-1"
        >
            <template v-slot:top>
            <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
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
      currentUser() {
        return this.$store.state.auth.user;
      },
      getUserID(){
         return this.$store.state.auth.user.id;
      }
    },
    watch: {
        
        '$route': 'fetchData',
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
    },
  }
</script>