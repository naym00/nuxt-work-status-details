<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon><v-icon>mdi-pencil</v-icon></v-btn>
        </template>

        <v-card>
          <v-card-title><span class="text-h5">Edit Task</span></v-card-title>
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="title" label="Task Title*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="importanceId" item-value="id" :items="projectImportance" item-text="level" label="Importance Level"></v-select>
                </v-col>



                <v-col cols="12">
                  <v-text-field v-model="description" label="Description*" required></v-text-field>
                </v-col>


                <!-- <v-col cols="12" sm="6" class="red">
                    <div class="centerInDiv">
                        <div style="width: 50%;" class="d-flex flex-row">
                            <v-select :items="Array(59).fill().map((_, i) => i+1)" label="Minute" required></v-select>
                        </div>
                        <div style="width: 50%" class="yellow">1</div>
                    </div> -->
                  <!-- <v-select :items="Array(59).fill().map((_, i) => i+1)" label="Minute" required></v-select> -->
                <!-- </v-col> -->

                <v-col cols="12" sm="6">
                  <v-select v-model="developer" :items="developersJson" item-text="developer" label="Select Developer" required></v-select>
                </v-col>


              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editTask()">Save</v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
</template>

<script>
import developersJson from '~/static/json/developersJson.json'
    export default {
        // props: [item],
        data(){
            return {
                developersJson: JSON.parse(JSON.stringify(developersJson)).data,

                dialog: false,
                title: 'ABC',
                projectId: -1,
                importanceId: -1,
                description: '',
                developer: '',
            }
        },
        methods:{
            editTask(){
                this.dialog = false
            }
        }

        
        
    }
</script>

<style>
.centerInDiv{
  display:flex; 
  justify-content: center; 
  align-items: center;
}
</style>