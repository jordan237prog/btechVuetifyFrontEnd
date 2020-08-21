<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="800px" persistent  >
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
        <div id="pdfToBeGenerated">

            <v-card-title>
              <span class="headline">BIll Name Here</span>
            </v-card-title>

            <v-card-text>
              <v-row>
                    <v-col>
                        <h3>Bill by</h3>
                        <img class="img" height="30" src="../assets\kmerfreelance.png">
                    </v-col>
              </v-row>

                <template>
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Calories</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                          <td>{{ item.name }}</td>
                          <td>{{ item.calories }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>

              pulvinar habitasse turpis.
            </v-card-text>

          </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning"  @click="downloadpdf">Download PDF <v-icon small class="mdi-light">mdi-download</v-icon> </v-btn>
          <v-btn color="primary"  @click="dialog = false">Edit <v-icon small class="mdi-light">mdi-pencil</v-icon></v-btn>
          <v-btn color="error"  @click="dialog = false">cancel <v-icon small class="mdi-light">mdi-plex</v-icon></v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import * as html2pdf from 'html2pdf.js'
  export default {
    name : 'pdf-view',
    data () {
      return {
        dialog: false,
        billName: "bill name",
        desserts: [
              {
                  name: 'Frozen Yogurt',
                  calories: 159,
              },
              {
                  name: 'Frozen Yogurt',
                  calories: 159,
              },
              {
                  name: 'Frozen Yogurt',
                  calories: 159,
              },
        ]
      }
    },
    methods:{
      downloadpdf(){

        const options = {
          filename : this.billName,
          image: { type: 'jpeg' },
          html2canvas: {},
          jsPDF: {orientation : 'landscape'},
          margin: [20, 20]
        }
        const element = document.getElementById('pdfToBeGenerated')
        html2pdf()
          .from(element)
          .set(options)
          .save()



      }
    }
  }
</script>