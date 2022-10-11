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
        <hr>

        <v-card-text class="d-flex flex-column grey lighten-3 my-2">
          <div class="display-1">Description</div>
          <div class="ma-2">{{item.description}}</div>
        </v-card-text>

        <v-card-text class="grey lighten-3 my-2">
          <v-row>
            <v-col cols="12" md="4" class="d-flex flex-column justify-center">
              <div style="font-size: 20px;"><b>Created Time</b></div>
              <div class="mt-2">{{getDateTimeHR(item.createdAt)}}</div>
            </v-col>
            
            <v-col cols="12" md="4" class="d-flex flex-column justify-center">
              <div style="font-size: 20px;"><b>Updated Time</b></div>
              <div class="mt-2">{{getDateTimeHR(item.updatedAt)}}</div>
            </v-col>

            <v-col cols="12" md="4" class="d-flex flex-column justify-center">
              <div style="font-size: 20px;"><b>Deadline</b></div>
              <div class="mt-2">{{getDateTimeHR(item.deadline)}}</div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="d-flex flex-row justify-center">
          <div style="font-size: 20px; width: 40%;" class="centerInDiv"><b>Assigned Developer:</b></div>
          <div style="font-size: 15px; width: 20%;" class="centerInDiv"><b>{{item.assignedTo}}</b></div>
          <div style="width: 20%;" class="centerInDiv">
            <v-chip class="ma-2" :color="item.importance.color">{{item.importance.level}}</v-chip>
          </div>
        </v-card-text>

        <v-card-text class="d-flex flex-row justify-center">
          <projectDetailsDialog :item="item.project"></projectDetailsDialog>
        </v-card-text>

        <DataTable v-if="item.uddateDetails.length>1" :headers="[{text: 'Developer', value: 'developer' },{ text: 'Update', value: 'time' }]" :items="item.uddateDetails"></DataTable>


        <v-card-text class="grey lighten-3 my-2">
          <v-row>
            <v-col cols="12" md="3" class="d-flex flex-column justify-center">
              <div style="font-size: 20px;" class="centerInDiv"><b>Stage 1</b></div>
              <div class="mt-2 centerInDiv"><b>{{parseInt(item.stateChanged.Stage1)}}</b></div>
            </v-col>
            
            <v-col cols="12" md="3" class="d-flex flex-column justify-center">
              <div style="font-size: 20px;" class="centerInDiv"><b>Stage 2</b></div>
              <div class="mt-2 centerInDiv"><b>{{parseInt(item.stateChanged.Stage2)}}</b></div>
            </v-col>

            <v-col cols="12" md="3" class="d-flex flex-column justify-center">
              <div style="font-size: 20px;" class="centerInDiv"><b>Stage 3</b></div>
              <div class="mt-2 centerInDiv"><b>{{parseInt(item.stateChanged.Stage3)}}</b></div>
            </v-col>

            <v-col cols="12" md="3" class="d-flex flex-column justify-center">
              <div style="font-size: 20px;" class="centerInDiv"><b>Stage 4</b></div>
              <div class="mt-2 centerInDiv"><b>{{parseInt(item.stateChanged.Stage4)}}</b></div>
            </v-col>
          </v-row>
        </v-card-text>
        <br><hr><br>

        <div v-if="item.stateChangeDetails.info.length" class="d-flex flex-column">
          <div><b class="display-1 centerInDiv">Table To Details</b></div>
          <div><DataTable :headers="[{text: 'Developer', value: 'developer' },{text: 'Stage', value: 'switch' },{ text: 'Duration', value: 'duration' }]" :items="item.stateChangeDetails.info"></DataTable></div>
          
          <div><b style="font-size: 20px;" class="centerInDiv">{{item.stateChangeDetails.hmnReadFormat}}</b></div>
        </div>
        
        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from "moment"
  export default {
    props: ['item'],
    data () {
      return {
        dialog: false,
      }
    },
    methods:{
      getDateTimeHR(dateTime){
        return moment(dateTime).format('LL')
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