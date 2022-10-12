<template>
  <v-container>
    
    <div class="teal lighten-5 rounded">
      <div class="d-flex flex-row align-center">
        <v-chip small style="width:100px;" class="mx-1" color="green" label text-color="white">
          <v-avatar left class="green darken-2">{{item.id}}</v-avatar>
          {{item.title}}
        </v-chip>

        <v-chip small style="width:180px;" class="mx-1" color="pink" label text-color="white">
          <v-icon small left>mdi-calendar</v-icon>{{getDateTimeHR(item.deadline)}}
        </v-chip>
      </div>

      <div class="d-flex flex-row align-center justify-space-around" style="font-size: 12px">
        <div style="width:25px;"><TaskEditDialog :id="item.id" :title="item.title" :description="item.description" :stage="stage" @updateData="updateData($event)"></TaskEditDialog></div>
        <div style="width:25px;"><v-btn icon @click="deleteTask(item)"><v-icon>mdi-delete</v-icon></v-btn></div>
        <div style="width:15px;"><SingleTaskDialog :item="item"></SingleTaskDialog></div>
      </div>
      
    </div>
      
  </v-container>
</template>

<script>
import moment from "moment"
export default {
  name: 'SingleTask',
  props: ['item', 'stage'],
  methods:{
    getDateTimeHR(dateTime){
      return moment(dateTime).format('LL')
    },
    deleteTask(item){
      this.$emit('deleteTask', item)
    },
    updateTask(item){
      this.$emit('updateTask', item)
    },
    updateData(data){
      this.$emit('updateData', data)
    }
  }
  
}
</script>