<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small icon v-bind="attrs" v-on="on"><v-icon>mdi-eye</v-icon></v-btn>
      </template>
      <v-card>
        
        <v-card-title class="d-flex flex-row justify-center">
          <span class="display-1">{{item.title}}</span>

          <v-chip class="ma-2" color="green" text-color="white">
            Stage
            <v-avatar right class="green darken-4">{{item.stage.split('-')[1]}}</v-avatar>
          </v-chip>
          

        </v-card-title>

        <v-card-text>{{item.description}}</v-card-text>
        <v-card-text>Stage: {{item.stage}}</v-card-text>
        <v-card-text>Created At: {{getDateTimeHR(item.createdAt)}}</v-card-text>
        <v-card-text>Updated At: {{getDateTimeHR(item.updatedAt)}}</v-card-text>
        <v-card-text>Deadline: {{getDateTimeHR(item.deadline)}}</v-card-text>
        <v-card-text>Assigned Developer: {{item.assignedTo}}</v-card-text>
        <DataTable :headers="[{text: 'Developer', value: 'developer' },{ text: 'Update', value: 'time' }]" :items="item.uddateDetails"></DataTable>

        <div style="margin:auto; width:95%; display: flex;">
          <div style="width: 25%; display: flex;">
            <div style="width: 48%;">Stage 1: </div>
            <div style="width: 52%;">{{item.stateChanged.Stage1}}</div>
          </div>
          
          <div style="width: 25%; display: flex;">
            <div style="width: 48%;">Stage 2: </div>
            <div style="width: 52%;">{{item.stateChanged.Stage2}}</div>
          </div>

          <div style="width: 25%; display: flex;">
            <div style="width: 48%;">Stage 3: </div>
            <div style="width: 52%;">{{item.stateChanged.Stage3}}</div>
          </div>

          <div style="width: 25%; display: flex;">
            <div style="width: 48%;">Stage 4: </div>
            <div style="width: 52%;">{{item.stateChanged.Stage4}}</div>
          </div>
        </div>

        <DataTable :headers="[{text: 'Developer', value: 'developer' },{text: 'Stage', value: 'switch' },{ text: 'Duration', value: 'duration' }]" :items="item.stateChangeDetails.info"></DataTable>
        <v-card-text>Total Time: {{item.stateChangeDetails.hmnReadFormat}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        dialog: false,
      }
    },
    methods:{
      getDateTimeHR(dateTime){
        let [date, time] = dateTime.split(', ')

        let [day, month, year] = date.split('/')

        let dateOb = new Date(`${year}-${month}-${day}`)

        if(time){
          let [hour, minute, second] = time.split(':')
          return `${dateOb.toDateString()} - ${hour}:${minute} ${second.split(' ')[1]}`
        }
        else return `${dateOb.toDateString()}`
        
      }
    }
  }
</script>