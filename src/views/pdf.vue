<template>

    

        <div>
            <v-row justify='center'>
                <v-col class=" col-10 .col-md-4">
                    <h3>Bill by</h3>
                    <img class="img" height="30" src="../assets\kmerfreelance.png">
                </v-col>
            </v-row>
            <div>
                <v-card>
                    <v-responsive :aspect-ratio="16/9">
                        <v-card-text>
                        <pdf-view/>
                        </v-card-text>
                    </v-responsive>
                </v-card>
            </div>
        </div>

    
    
</template>

<script>

export default {
    name: 'pdf',
    data () {
        return {
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
    }
    
}
</script>

<style scoped>

</style>