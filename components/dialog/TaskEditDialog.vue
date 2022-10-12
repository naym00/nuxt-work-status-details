<template>
  <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon><v-icon>mdi-pencil</v-icon></v-btn>
      </template>

      <v-card>
        {{item}}
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


              <v-col cols="12" sm="6" class="centerInDiv">
                <div style="width:150px; display: flex;">
                  <div><v-select clearable v-model="hour" style="width: 80px;" :items="Array(24).fill().map((_, i) => i+1)" label="Hour" required></v-select></div>
                </div>
                <div style="width:150px; display: flex;">
                  <div><v-select clearable v-model="minute" style="width: 80px;" :items="Array(60).fill().map((_, i) => i)" label="Minute " required></v-select></div>
                </div>
              </v-col>

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
import importanceLevel from '~/static/json/importanceLevel.json'
  export default {
      props: ['id', 'title', 'description', 'stage'],
      data(){
          return {
              developersJson: JSON.parse(JSON.stringify(developersJson)).data,
              projectImportance: JSON.parse(JSON.stringify(importanceLevel)).data,
              dialog: false,
              importanceId: null,
              developer: null,
              hour: null,
              minute: null,
          }
      },
      methods:{
          editTask(){
            // console.log('id: ', this.id)
            // console.log('title: ', this.title)
            // console.log('description: ', this.description)
            // console.log('importanceId: ', this.importanceId)
            // console.log('developer: ', this.developer)
            // console.log('hour: ', this.hour)
            // console.log('minute: ', this.minute)
            this.$emit('updateData', {
              stage: this.stage,
              id: this.id,
              title: this.title,
              description: this.description,
              importanceId: this.importanceId,
              developer: this.developer,
              hour: this.hour,
              minute: this.minute
            })
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