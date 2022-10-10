<template>
    <v-container>
      
      <div>
        <div>{{item.id +' - '+ item.title}}</div>
        <div class="d-flex flex-row" style="font-size: 12px">
          <div style="width:55px;"><b>Deadline:</b></div>
          <div style="width:110px;">{{getDateTimeHR(item.deadline)}}</div>
          <div style="width:15px;"><SingleTaskDialog :item="item"></SingleTaskDialog></div>
          <div style="width:25px;"><v-btn icon><v-icon>mdi-pencil</v-icon></v-btn></div>
          <div style="width:25px;"><v-btn icon><v-icon>mdi-delete</v-icon></v-btn></div>
        </div>
        
      </div>
        
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'SingleTask',
    props: ['item'],
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
  