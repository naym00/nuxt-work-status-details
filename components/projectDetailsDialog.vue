<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small icon v-bind="attrs" v-on="on">
            <v-chip class="ma-2" color="teal">{{item.title}}</v-chip>
          </v-btn>
        </template>
        <v-card>
          
          <v-card-title class="d-flex flex-row justify-center">
            <span class="display-1">{{item.title}}</span>
          </v-card-title>
          <hr>
  
          <v-card-text class="d-flex flex-column grey lighten-3 my-2">
            <div class="display-1">Description</div>
            <div class="ma-2">{{item.description}}</div>
          </v-card-text>
  
          <v-card-text class="grey lighten-3 my-2">
            <v-row>
              <v-col cols="12" md="6" class="d-flex flex-column justify-center">
                <div style="font-size: 20px;"><b>Created Time</b></div>
                <div class="mt-2">{{getDateTimeHR(item.createdAt)}}</div>
              </v-col>
              
              <v-col cols="12" md="6" class="d-flex flex-column justify-center">
                <div style="font-size: 20px;"><b>Deadline</b></div>
                <div class="mt-2">{{getDateTimeHR(item.deadline)}}</div>
              </v-col>
            </v-row>
          </v-card-text>

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