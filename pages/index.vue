<template>
  <v-container style="background-color: #E6E4E4; height:550px" >
    <div>
      <v-row>
        <v-col cols="12" md="2">
          <new-task :projects="projects" :projectImportance="projectImportance" :developersJson="developersJson" :stagesJson="stagesJson" @addNewTask="addNewTask($event)"></new-task>
        </v-col>
        <v-col cols="12" md="2">
          <new-project @newproject="newProjectDetails($event)"></new-project>
        </v-col>
        <v-col cols="12" md="4">
          <v-select style="margin: 0; padding: 0; width: 100%;" v-model="projectsToFilter" :items="projects" item-text="title" label="Filter By Projects" clearable multiple chips persistent-hint></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select style="margin: 0; padding: 0; width: 100%;" v-model="developersToFilter" :items="developersJson" item-text="developer" label="Filter By Developers" clearable multiple chips persistent-hint></v-select>
        </v-col>
      </v-row>
      
    </div>
    <div class="d-flex flex-row flex-wrap justify-space-around" style="height:100%">

      <div class="d-flex flex-column" v-for="(stage, index) in Object.keys(this.copyTask)" :key="index">
        <div class="d-flex flex-row align-center">
          <v-chip small style="width:90%;height: 50px;" color="light-green lighten-5 my-2">
            Stage-{{index+1}}
            <v-avatar right class="green darken-2">{{tasks[stage].length}}</v-avatar>
          </v-chip>
        </div>

        <draggable class="div-container" :list="tasks[stage]" group="tasks" @change="log($event, index+1)">
          <single-task v-for="(task, index) in tasks[stage]" :key="index" :item="task" @deleteTask="deleteTask($event)" :stage="stage" @updateData="updateData($event)"></single-task>
        </draggable>
      </div>
    
    </div>
    
  </v-container>
</template>

<script>
import projectsJson from '~/static/json/projects.json'
import taskJson from '~/static/json/task.json'
import importanceLevel from '~/static/json/importanceLevel.json'
import developersJson from '~/static/json/developersJson.json'
import stagesJson from '~/static/json/stagesJson.json'
import draggable from "vuedraggable";
import moment from "moment"
export default {
  name: 'IndexPage',
  components: { draggable },
  data(){
    return {
      projects: JSON.parse(JSON.stringify(projectsJson)).data,
      projectsId: JSON.parse(JSON.stringify(projectsJson)).nextId,
      projectImportance: JSON.parse(JSON.stringify(importanceLevel)).data,
      developersJson: JSON.parse(JSON.stringify(developersJson)).data,
      stagesJson: JSON.parse(JSON.stringify(stagesJson)).data,

      tasks: JSON.parse(JSON.stringify(taskJson)).data,
      copyTask: JSON.parse(JSON.stringify(taskJson)).data,
      lastId: JSON.parse(JSON.stringify(taskJson)).lastId,

      stateChanged: [],
      projectsToFilter: [],
      tasksAfterFilterByProjects: {},
      developersToFilter: [],
      tasksAfterFilterByDevelopers: {},
    }
  },
  watch:{
    projectsToFilter: function(){
      // this.test(this.projectsToFilter, 'tasksAfterFilterByProjects', 'project', 'title')
      if(this.projectsToFilter.length){
        let filteredObject = {stage1: [], stage2: [], stage3: [], stage4: []}
        Object.keys(this.copyTask).forEach(key => {
            let filterdTask = []
            this.copyTask[key].forEach(task => {if(this.projectsToFilter.includes(task.project.title)) filterdTask.push(task)})
            filteredObject[key] = [...filterdTask]
        })
        this.tasksAfterFilterByProjects = {...filteredObject}
      }
      else this.tasksAfterFilterByProjects = {...this.copyTask}
      this.merge(this.tasksAfterFilterByProjects, this.tasksAfterFilterByDevelopers)
    },
    developersToFilter: function(){
      // this.test(this.developersToFilter, 'tasksAfterFilterByDevelopers', 'assignedTo')
      if(this.developersToFilter.length){
        let filteredObject = {stage1: [], stage2: [], stage3: [], stage4: []}
        Object.keys(this.copyTask).forEach(key => {
            let filterdTask = []
            this.copyTask[key].forEach(task => {if(this.developersToFilter.includes(task.assignedTo)) filterdTask.push(task)})
            filteredObject[key] = [...filterdTask]
        })
        this.tasksAfterFilterByDevelopers = {...filteredObject}
      }
      else this.tasksAfterFilterByDevelopers = {...this.copyTask}
      this.merge(this.tasksAfterFilterByDevelopers, this.tasksAfterFilterByProjects)
    },
    stateChanged: function(){
      if(this.stateChanged.length == 2){
        if(this.stateChanged[0]["added"] !== undefined){
          let temOb = this.stateChanged[0].added.element
          temOb.stage = `Stage-${this.stateChanged[0].stage}`
          temOb.stateChanged[`Stage${this.stateChanged[0].stage}`] += 1
          let rightNow = moment().format('YYYY-MM-D h:mm:ss A')
          temOb.stateChangeDetails.totalTime += this.calculateDurationInSecond(rightNow, temOb.stateChangeDetails.time)
          temOb.stateChangeDetails.hmnReadFormat = this.convertToDuration(temOb.stateChangeDetails.totalTime)
          temOb.stateChangeDetails.info.push({developer: temOb.assignedTo, switch: `Stage-${this.stateChanged[1].stage} -Stage- ${this.stateChanged[0].stage}`, duration: this.convertToDuration(this.calculateDurationInSecond(rightNow, temOb.stateChangeDetails.time))})
          temOb.stateChangeDetails.time = rightNow
        }
        this.stateChanged = []
      }
    }
  },
  methods:{
    // AND Type Merge
    merge(objectA, objectB){
      let filteredObject = {stage1: [], stage2: [], stage3: [], stage4: []}
      Object.keys(this.copyTask).forEach(key => {
        let store = []
        if(objectA[key]!=undefined){
          objectA[key].forEach(taskA=> {
            if(objectB[key]!=undefined){
              objectB[key].forEach(taskB => {
                if(taskA.id == taskB.id) store.push(taskA)
              })
            }
            else store.push(taskA)
          })
        }
        filteredObject[key] = [...store]
      })
      this.tasks = {...filteredObject}
    },

    deleteTask(item){
      let key = this.findKey(item)
      let afterDelete = this.tasks[key].filter(task => task.id != item.id)
      this.tasks[key] = afterDelete
    },
    findKey(item){
      if(item.stage == "Stage-1") return "stage1"
      else if(item.stage == "Stage-2") return "stage2"
      else if(item.stage == "Stage-3") return "stage3"
      else return "stage4"
    },
    updateData(data){
      console.log('data data ', data)
      let rightNow = moment().format('YYYY-MM-D h:mm:ss A')
      
      let selectedImportance = {}
      if(data.importanceId != null){
        this.projectImportance.forEach(importance => {
          if(importance.id == data.importanceId) selectedImportance = importance
        })

      }
      this.tasks[data.stage].forEach(task => {
        if(task.id == data.id){
          if(data.title != task.title) task.title = data.title
          if(data.description != task.title) data.description = task.title

          if(Object.keys(selectedImportance).length) if(selectedImportance.level != task.importance.level) task.importance = selectedImportance

          if(data.developer != null){

            if(data.developer != task.assignedTo){
              task.updatedAt = rightNow
              task.uddateDetails[task.uddateDetails.length - 1].endTime = rightNow
              let durationInSeconds= this.calculateDurationInSecond(rightNow, task.uddateDetails[task.uddateDetails.length - 1].startTime)
              task.uddateDetails[task.uddateDetails.length - 1].duration = this.convertToDuration(durationInSeconds)
              task.uddateDetails.push({ developer: data.developer, startTime: rightNow, endTime: "", duration: "" })
              task.assignedTo = data.developer
            }
          }
          if(data.hour != null || data.minute != null){
            let seconds = 0
            if(data.hour != null) seconds += data.hour*60*60
            if(data.minute != null) seconds += data.minute*60
            if(task.stateChangeDetails.info.length){
              let inSeconds = this.convertStringDurationToSeconds(task.stateChangeDetails.info[task.stateChangeDetails.info.length-1].duration)
              task.stateChangeDetails.totalTime -= inSeconds
              task.stateChangeDetails.totalTime += seconds
              task.stateChangeDetails.hmnReadFormat = this.convertToDuration(task.stateChangeDetails.totalTime)
              task.stateChangeDetails.info[task.stateChangeDetails.info.length-1].duration = this.convertToDuration(seconds)
              task.stateChangeDetails.time = rightNow
            }
          }
        }
      })
    },
    addNewTask(task){
      let rightNow = moment().format('YYYY-MM-D h:mm:ss A')
      let selectedProject = this.findObject(this.projects, 'id', task.projectId)
      let selectedImportance = this.findObject(this.projectImportance, 'id', task.importanceId)
    
      let newTask = {
                        id: `${this.lastId}`,
                        title: `${task.title}`,
                        description: `${task.description}`,
                        createdAt: `${rightNow}`,
                        updatedAt: `${rightNow}`,
                        project: selectedProject,
                        importance: selectedImportance,
                        uddateDetails: [
                          { developer: `${task.developer}`, startTime: `${rightNow}`, endTime: "", duration: "" }
                        ],
                        deadline: `${task.date} 11:59:59 PM`,
                        deadlineDetails: [],
                        stage: `${task.stage}`,
                        stateChanged: { Stage1: task.stage == 'Stage-1' ? 1 : 0, Stage2: task.stage == 'Stage-2' ? 1 : 0, Stage3: task.stage == 'Stage-3' ? 1 : 0, Stage4: task.stage == 'Stage-4' ? 1 : 0 },
                        stateChangeDetails: {time: `${rightNow}`, totalTime: 0, hmnReadFormat: "", info: []},
                        assignedTo: `${task.developer}`
                      }
      this.lastId += 1
      if(task.stage == 'Stage-1') { this.tasks.stage1.push(newTask)}
      else if(task.stage == 'Stage-2') { this.tasks.stage2.push(newTask)}
      else if(task.stage == 'Stage-3') { this.tasks.stage3.push(newTask)}
      else if(task.stage == 'Stage-4') { this.tasks.stage4.push(newTask)}
    },
    newProjectDetails(newProject){
      this.projects.push({...newProject, ...{id: this.projectsId}})
      this.projectsId += 1
    },
    findObject(object, key, toCompare){
      let selectedobject = {}
      object.forEach(item => {
        if(item[key] == toCompare) selectedobject = {...item}
      })
      return selectedobject
    },
    convertToDuration(totalSeconds){
        let duration = ''


        // let time = [60, 60, 24, 365]
        // let timeStr = ['munites', 'hours', 'days', 'years']


        
        // time.forEach(() => {
        //   let multiplyValue = time.reduce( (a, b) => a * b )
        //   if(multiplyValue >= totalSeconds){
        //     let dividedValue = parseInt(totalSeconds/multiplyValue)
        //     duration += `${dividedValue} ${timeStr[timeStr.length - 1]} `
        //     totalSeconds = totalSeconds - dividedValue*multiplyValue
        //     time.pop()
        //     timeStr.pop()
        //   }
        //   else{
        //     time.pop()
        //     timeStr.pop()
        //   }
        // })
        // duration += `${totalSeconds} seconds`


        if(totalSeconds>=(365*24*60*60)){
            let year = parseInt(totalSeconds/(365*24*60*60))
            totalSeconds = totalSeconds - year*(365*24*60*60)
            duration += `${year} years `
        }
        if(totalSeconds>=(24*60*60)){
            let day = parseInt(totalSeconds/(24*60*60))
            totalSeconds = totalSeconds - day*(24*60*60)
            duration += `${day} days `
        }
        if(totalSeconds>=(60*60)){
            let hour = parseInt(totalSeconds/(60*60))
            totalSeconds = totalSeconds - hour*(60*60)
            duration += `${hour} hours `
        }
        if(totalSeconds>=60){
            let munite = parseInt(totalSeconds/(60))
            totalSeconds = totalSeconds - munite*(60)
            duration += `${munite} munites `
        }

        if(totalSeconds != 0) duration += `${totalSeconds} seconds`
        
        return duration
    },
    convertStringDurationToSeconds(strDuration){
      // Input Type
      // '17 days 2 hours 47 munites 44 seconds'

      let timeNumbers = strDuration.split(' ').filter(item => item == parseInt(item)).map(Number)
      let timeString = strDuration.split(' ').filter(item => item != parseInt(item))
      let seconds = 0
      timeString.forEach((item, index) => {
          if(item == 'years') seconds += timeNumbers[index]*365*24*60*60
          else if(item == 'days') seconds += timeNumbers[index]*24*60*60
          else if(item == 'hours') seconds += timeNumbers[index]*60*60
          else if(item == 'munites') seconds += timeNumbers[index]*60
          else if(item == 'seconds') seconds += timeNumbers[index]
      })
      return seconds
    },
    calculateDurationInSecond(startTime, endTime){
      // Input Type 
      // 2022-10-12 11:27:56 AM    2022-09-25 11:48:20 AM
      return moment.duration(moment(startTime).diff(moment(endTime))).asSeconds()
    },
    log(event, stage) {
      if(event["added"] !== undefined) this.stateChanged.push({added:  event.added, stage: stage})
      else this.stateChanged.push({removed:  event.removed, stage: stage})
    },
  }
}
</script>
<style scoped lang="scss">
.div-container{
  width: 250px;
  min-height: 470px;
  margin: 10px; 
}
</style>