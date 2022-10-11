<template>
  <v-container style="background-color: #E6E4E4; height:550px" >
    <div>

      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">New Task<v-icon>mdi-plus</v-icon></v-btn>
        </template>

        <v-card>
          <v-card-title><span class="text-h5">New Task</span></v-card-title>
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12" sm="4">
                  <v-text-field v-model="title" label="Task Title*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select v-model="projectId" item-value="id" :items="projects" item-text="title" label="Select Project"></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select v-model="importanceId" item-value="id" :items="projectImportance" item-text="level" label="Importance Level"></v-select>
                </v-col>



                <v-col cols="12">
                  <v-text-field v-model="description" label="Description*" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Set Deadline" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-select v-model="developer" :items="developersJson" item-text="developer" label="Select Developer" required></v-select>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-select v-model="stage" :items="stagesJson" item-text="stage" label="Select Stage" required></v-select>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addNewTask()">Save</v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>

      <AddNewProject @newproject="newProjectDetails($event)"></AddNewProject>
      <TaskEditDialog></TaskEditDialog>


      <v-dialog v-model="dialog2" max-width="600px">
        <v-card>
          <v-card-title><span class="text-h5">Update Task</span></v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="updateTitle" label="Task Title*" required></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="updateDescription" label="Description*" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="updateDate" label="Set Deadline" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="updateDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu2.save(updateDate)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select v-model="updateDeveloper" :items="['Developer-1', 'Developer-2', 'Developer-3', 'Developer-4']" label="Select Developer" required></v-select>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateTask_()">Save</v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>



    </div>
    <div class="d-flex flex-row flex-wrap justify-space-around" style="height:100%">

      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-center">
          <v-chip small style="width:90%;height: 50px;" color="light-green lighten-5 my-2">
            Stage-1
            <v-avatar right class="green darken-2">{{tasks.stage1.length}}</v-avatar>
          </v-chip>
        </div>

        


        <draggable class="div-container" :list="tasks.stage1" group="tasks" @change="log($event, 1)">
          <SingleTask v-for="(task, index) in tasks.stage1" :key="index" :item="task" @deleteTask="deleteTask($event)" @updateTask="updateTask($event)"></SingleTask>
        </draggable>
      </div>

      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-center">
          <v-chip small style="width:90%;height: 50px;" color="light-green lighten-5 my-2">
            Stage-2
            <v-avatar right class="green darken-2">{{tasks.stage2.length}}</v-avatar>
          </v-chip>
        </div>

        <draggable class="div-container" :list="tasks.stage2" group="tasks" @change="log($event, 2)">
          <SingleTask v-for="(task, index) in tasks.stage2" :key="index" :item="task" @deleteTask="deleteTask($event)"></SingleTask>
        </draggable>
      </div>

      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-center">
          <v-chip small style="width:90%;height: 50px;" color="light-green lighten-5 my-2">
            Stage-3
            <v-avatar right class="green darken-2">{{tasks.stage3.length}}</v-avatar>
          </v-chip>
        </div>

        <draggable class="div-container" :list="tasks.stage3" group="tasks" @change="log($event, 3)">
          <SingleTask v-for="(task, index) in tasks.stage3" :key="index" :item="task" @deleteTask="deleteTask($event)"></SingleTask>
        </draggable>
      </div>

      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-center">
          <v-chip small style="width:90%;height: 50px;" color="light-green lighten-5 my-2">
            Stage-3
            <v-avatar right class="green darken-2">{{tasks.stage4.length}}</v-avatar>
          </v-chip>
        </div>

        <draggable class="div-container" :list="tasks.stage4" group="tasks" @change="log($event, 4)">
          <SingleTask v-for="(task, index) in tasks.stage4" :key="index" :item="task" @deleteTask="deleteTask($event)"></SingleTask>
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
      lastId: JSON.parse(JSON.stringify(taskJson)).lastId,
      stateChanged: [],

      dialog: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      title: '',
      projectId: -1,
      importanceId: -1,
      description: '',
      developer: '',
      stage: '',
      menu: false,


      dialog2: false,
      updateDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      updateTitle: '',
      updateDescription: '',
      updateDeveloper: '',
      // updateStage: '',
      menu2: false,

      itemToUpdate: null,
    }
  },
  watch:{
    stateChanged: function(){
      if(this.stateChanged.length == 2){
        if(this.stateChanged[0]["added"] !== undefined){
          let temOb = this.stateChanged[0].added.element

          temOb.stage = `Stage-${this.stateChanged[0].stage}`
          temOb.stateChanged[`Stage${this.stateChanged[0].stage}`] += 1

          let rightNow = moment().format('YYYY-MM-D h:mm:ss A')
          temOb.stateChangeDetails.totalTime += moment.duration(moment(rightNow).diff(moment(temOb.stateChangeDetails.time))).asSeconds()
          temOb.stateChangeDetails.hmnReadFormat = this.convertToDuration(temOb.stateChangeDetails.totalTime)
          temOb.stateChangeDetails.info.push({developer: temOb.assignedTo, switch: `Stage-${this.stateChanged[1].stage} -- Stage-${this.stateChanged[0].stage}`, duration: this.timeDifference(rightNow, temOb.stateChangeDetails.time, true)})
          temOb.stateChangeDetails.time = rightNow
        }
        this.stateChanged = []
      }
    }
  },
  methods:{

    deleteTask(item){
      let key = ""
      if(item.stage == "Stage-1") key = "stage1"
      else if(item.stage == "Stage-2") key = "stage2"
      else if(item.stage == "Stage-3") key = "stage3"
      else key = "stage4"
      let afterDelete = this.tasks[key].filter(task => task.id != item.id)
      this.tasks[key] = afterDelete
    },
    updateTask_(){
      console.log(this.updateDate)

      // let key = ""
      // if(this.updateDate.stage == "Stage-1") key = "stage1"
      // else if(this.updateDate.stage == "Stage-2") key = "stage2"
      // else if(this.updateDate.stage == "Stage-3") key = "stage3"
      // else key = "stage4"

      // console.log(key)

      // let formatedDateDeadline =  `${(new Date(this.date)).toString().split('+')[0]}+0600 (Bangladesh Standard Time)`
      // let createdTime = new Date(this.getDateTime())
      // let newTask = {
      //                   id: `${this.lastIndex}`,
      //                   title: `${this.title}`,
      //                   description: `${this.description}`,
      //                   createdAt: `${createdTime}`,
      //                   updatedAt: `${createdTime}`,
      //                   uddateDetails: [
      //                     { developer: `${this.developer}`, time: `${createdTime}` }
      //                   ],
      //                   deadline: `${formatedDateDeadline}`,
      //                   deadlineDetails: [],
      //                   stage: `${this.stage}`,
      //                   stateChanged: { Stage1: `${this.stage == 'Stage-1' ? 1 : 0}`, Stage2: `${this.stage == 'Stage-2' ? 1 : 0}`, Stage3: `${this.stage == 'Stage-3' ? 1 : 0}`, Stage4: `${this.stage == 'Stage-4' ? 1 : 0}` },
      //                   stateChangeDetails: {time: `${createdTime}`, totalTime: 0, hmnReadFormat: "", info: []},
      //                   assignedTo: `${this.developer}`
      //                 }

      console.log('updateDate ', this.updateDate)
      console.log('updateTitle ', this.updateTitle)
      console.log('updateDescription ', this.updateDescription)
      console.log('updateDeveloper ', this.updateDeveloper)
      // console.log('updateStage ', this.updateStage)

      this.dialog2 = false
    },

    updateTask(item){
      this.dialog2 = true
      this.itemToUpdate = item
    },

    addNewTask(){
      let rightNow = moment().format('YYYY-MM-D h:mm:ss A')

      let selectedProject = {}
      this.projects.forEach(project => {
        if(project.id == this.projectId) selectedProject = project
      })

      let selectedImportance = {}
      this.projectImportance.forEach(importance => {
        if(importance.id == this.importanceId) selectedImportance = importance
      })

      // let selectedProject = this.findObject(this.projects, 'id', this.projectId)
      // let selectedImportance = this.projectImportance(this.projects, 'id', this.importanceId)

    
      let newTask = {
                        id: `${this.lastId}`,
                        title: `${this.title}`,
                        description: `${this.description}`,
                        createdAt: `${rightNow}`,
                        updatedAt: `${rightNow}`,

                        project: selectedProject,
                        importance: selectedImportance,

                        uddateDetails: [
                          { developer: `${this.developer}`, time: `${rightNow}` }
                        ],
                        deadline: `${this.date} 11:59:59 PM`,
                        deadlineDetails: [],
                        stage: `${this.stage}`,
                        stateChanged: { Stage1: `${this.stage == 'Stage-1' ? 1 : 0}`, Stage2: `${this.stage == 'Stage-2' ? 1 : 0}`, Stage3: `${this.stage == 'Stage-3' ? 1 : 0}`, Stage4: `${this.stage == 'Stage-4' ? 1 : 0}` },
                        stateChangeDetails: {time: `${rightNow}`, totalTime: 0, hmnReadFormat: "", info: []},
                        assignedTo: `${this.developer}`
                      }
      
      this.lastId += 1
      if(this.stage == 'Stage-1') { this.tasks.stage1.push(newTask)}
      else if(this.stage == 'Stage-2') { this.tasks.stage2.push(newTask)}
      else if(this.stage == 'Stage-3') { this.tasks.stage3.push(newTask)}
      else if(this.stage == 'Stage-4') { this.tasks.stage4.push(newTask)}

      this.dialog = false
      
    },
    newProjectDetails(newProject){
      this.projects.push({...newProject, ...{id: this.projectsId}})
      this.projectsId += 1
    },

    // findObject(object, key, toCompare){
    //   let selectedobject = {}
    //   object.forEach(item => {
    //     if(item[key] == toCompare) selectedobject = item
    //   })
    //   return selectedobject
    // },

    timeDifference(date1, date2, flag){
      let secondsDifference =((new Date(date1)).getTime() - (new Date(date2)).getTime()) / 1000;
      if(flag) return this.convertToDuration(secondsDifference)
      else return secondsDifference
    },
    convertToDuration(totalSeconds){
        let duration = ''
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
        duration += `${totalSeconds} seconds`
        
        return duration
    },
    getDateTime(){
      let today = new Date()
      return today.toLocaleString()
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
  // background-color:#dce3da;
}
</style>
