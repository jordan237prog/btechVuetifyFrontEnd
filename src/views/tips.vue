<template>
  <v-row justify="center">
      <v-col  class="col-10 .col-md-4">
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Name of step 3</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="600px"
                    >
                    
                    <v-img
                    src="../assets/enterprise dashboard.png"
                    height="600px"
                    ></v-img>
                    </v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 2"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="350px"
                    ></v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 3"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="350px"
                    ></v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 1"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
    </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
  export default {
      name:'tips',
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>