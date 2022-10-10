<template>
  <v-container style="background-color: #E6E4E4; height:550px" >
    <!-- {{stateChanged}} -->
    <div class="d-flex flex-row flex-wrap justify-space-around" style="background-color: #CCFFE5; height:100%">

      <div class="d-flex flex-column">
        <div class="title d-flex justify-center">Stage 1</div>
        <draggable class="div-container" :list="tasks.stage1" group="tasks" @change="log($event, 1)">
          <SingleTask v-for="(task, index) in tasks.stage1" :key="index" :item="task"></SingleTask>
          <!-- <div style="margin: 10px" v-for="(task, index) in tasks.stage1" :key="index"></div> -->
          <!-- <div style="margin: 10px" v-for="(task, index) in tasks.stage1" :key="index">
          
            <v-card class="mx-auto" max-width="300">
              <v-card-title><b>{{task.id}}</b>-<h5>{{task.title}}</h5></v-card-title>
              <v-card-subtitle>{{task.description}}</v-card-subtitle>

              <v-card-text class="d-flex flex-column">
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:50px;"><b>Created:</b></div>
                  <div>{{getDateTimeHR(task.createdAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                    <div style="width:55px;"><b>Updated:</b></div>
                    <div>{{getDateTimeHR(task.updatedAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:55px;"><b>Deadline:</b></div>
                  <div>{{getDateTimeHR(task.deadline)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:63px;"><b>Developer:</b></div>
                  <div>{{task.assignedTo}}</div>
                </div>
                
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="task.extend = !task.extend">
                  <v-icon>{{ task.extend ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="task.extend">
                  <v-divider></v-divider>

                  <v-card-text class="d-flex flex-column">
                    <div>
                      <br>Update Details
                      <DataTable :headers="[{text: 'Developer', value: 'developer' },{ text: 'Update', value: 'time' }]" :items="task.uddateDetails"></DataTable>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 1:</b></div>
                      <div>{{task.stateChanged.Stage1}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 2:</b></div>
                      <div>{{task.stateChanged.Stage2}}</div>
                    </div>
                    
                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 3:</b></div>
                      <div>{{task.stateChanged.Stage3}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 4:</b></div>
                      <div>{{task.stateChanged.Stage4}}</div>
                    </div>

                  </v-card-text>

                </div>
              </v-expand-transition>
            </v-card>
            
          </div> -->
        </draggable>
      </div>

      <div class="d-flex flex-column">
        <div class="title d-flex justify-center">Stage 2</div>
        <draggable class="div-container" :list="tasks.stage2" group="tasks" @change="log($event, 2)">
          <SingleTask v-for="(task, index) in tasks.stage2" :key="index" :item="task"></SingleTask>
          <!-- <div style="margin: 10px" v-for="(task, index) in tasks.stage2" :key="index">
            
            <v-card class="mx-auto" max-width="300">
              <v-card-title><b>{{task.id}}</b>-<h5>{{task.title}}</h5></v-card-title>
              <v-card-subtitle>{{task.description}}</v-card-subtitle>

              <v-card-text class="d-flex flex-column">
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:50px;"><b>Created:</b></div>
                  <div>{{getDateTimeHR(task.createdAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                    <div style="width:55px;"><b>Updated:</b></div>
                    <div>{{getDateTimeHR(task.updatedAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:55px;"><b>Deadline:</b></div>
                  <div>{{getDateTimeHR(task.deadline)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:63px;"><b>Developer:</b></div>
                  <div>{{task.assignedTo}}</div>
                </div>
                
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="task.extend = !task.extend">
                  <v-icon>{{ task.extend ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="task.extend">
                  <v-divider></v-divider>

                  <v-card-text class="d-flex flex-column">
                    <div>
                      <br>Update Details
                      <DataTable :headers="[{text: 'Developer', value: 'developer' },{ text: 'Update', value: 'time' }]" :items="task.uddateDetails"></DataTable>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 1:</b></div>
                      <div>{{task.stateChanged.Stage1}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 2:</b></div>
                      <div>{{task.stateChanged.Stage2}}</div>
                    </div>
                    
                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 3:</b></div>
                      <div>{{task.stateChanged.Stage3}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 4:</b></div>
                      <div>{{task.stateChanged.Stage4}}</div>
                    </div>

                  </v-card-text>

                </div>
              </v-expand-transition>
            </v-card>
            
          </div> -->
        </draggable>
      </div>

      <div class="d-flex flex-column">
        <div class="title d-flex justify-center">Stage 3</div>
        <draggable class="div-container" :list="tasks.stage3" group="tasks" @change="log($event, 3)">
          <SingleTask v-for="(task, index) in tasks.stage3" :key="index" :item="task"></SingleTask>
          <!-- <div style="margin: 10px" v-for="(task, index) in tasks.stage3" :key="index">
            
            <v-card class="mx-auto" max-width="300">
              <v-card-title><b>{{task.id}}</b>-<h5>{{task.title}}</h5></v-card-title>
              <v-card-subtitle>{{task.description}}</v-card-subtitle>

              <v-card-text class="d-flex flex-column">
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:50px;"><b>Created:</b></div>
                  <div>{{getDateTimeHR(task.createdAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                    <div style="width:55px;"><b>Updated:</b></div>
                    <div>{{getDateTimeHR(task.updatedAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:55px;"><b>Deadline:</b></div>
                  <div>{{getDateTimeHR(task.deadline)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:63px;"><b>Developer:</b></div>
                  <div>{{task.assignedTo}}</div>
                </div>
                
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="task.extend = !task.extend">
                  <v-icon>{{ task.extend ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="task.extend">
                  <v-divider></v-divider>

                  <v-card-text class="d-flex flex-column">
                    <div>
                      <br>Update Details
                      <DataTable :headers="[{text: 'Developer', value: 'developer' },{ text: 'Update', value: 'time' }]" :items="task.uddateDetails"></DataTable>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 1:</b></div>
                      <div>{{task.stateChanged.Stage1}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 2:</b></div>
                      <div>{{task.stateChanged.Stage2}}</div>
                    </div>
                    
                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 3:</b></div>
                      <div>{{task.stateChanged.Stage3}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 4:</b></div>
                      <div>{{task.stateChanged.Stage4}}</div>
                    </div>

                  </v-card-text>

                </div>
              </v-expand-transition>
            </v-card>
            
          </div> -->
        </draggable>
      </div>

      <div class="d-flex flex-column">
        <div class="title d-flex justify-center">Stage 4</div>
        <draggable class="div-container" :list="tasks.stage4" group="tasks" @change="log($event, 4)">
          <SingleTask v-for="(task, index) in tasks.stage4" :key="index" :item="task"></SingleTask>
          <!-- <div style="margin: 10px" v-for="(task, index) in tasks.stage4" :key="index">
            
            <v-card class="mx-auto" max-width="300">
              <v-card-title><b>{{task.id}}</b>-<h5>{{task.title}}</h5></v-card-title>
              <v-card-subtitle>{{task.description}}</v-card-subtitle>

              <v-card-text class="d-flex flex-column">
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:50px;"><b>Created:</b></div>
                  <div>{{getDateTimeHR(task.createdAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                    <div style="width:55px;"><b>Updated:</b></div>
                    <div>{{getDateTimeHR(task.updatedAt)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:55px;"><b>Deadline:</b></div>
                  <div>{{getDateTimeHR(task.deadline)}}</div>
                </div>
                <div class="d-flex flex-row" style="font-size: 12px">
                  <div style="width:63px;"><b>Developer:</b></div>
                  <div>{{task.assignedTo}}</div>
                </div>
                
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="task.extend = !task.extend">
                  <v-icon>{{ task.extend ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="task.extend">
                  <v-divider></v-divider>

                  <v-card-text class="d-flex flex-column">
                    <div>
                      <br>Update Details
                      <DataTable :headers="[{text: 'Developer', value: 'developer' },{ text: 'Update', value: 'time' }]" :items="task.uddateDetails"></DataTable>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 1:</b></div>
                      <div>{{task.stateChanged.Stage1}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 2:</b></div>
                      <div>{{task.stateChanged.Stage2}}</div>
                    </div>
                    
                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 3:</b></div>
                      <div>{{task.stateChanged.Stage3}}</div>
                    </div>

                    <div class="d-flex flex-row" style="font-size: 12px">
                      <div style="width:63px;"><b>Stage 4:</b></div>
                      <div>{{task.stateChanged.Stage4}}</div>
                    </div>

                  </v-card-text>

                </div>
              </v-expand-transition>
            </v-card>
            
          </div> -->
        </draggable>
      </div>
    
    </div>

    
  </v-container>
</template>

<script>
import taskJson from '~/static/json/task.json'
import draggable from "vuedraggable";

export default {
  name: 'IndexPage',
  components: { draggable },
  data(){
    return {
      tasks: JSON.parse(JSON.stringify(taskJson)),
      stateChanged: []
    }
  },
  watch:{
    stateChanged: function(){
      if(this.stateChanged.length == 2){
        if(this.stateChanged[0]["added"] !== undefined){
          let temOb = this.stateChanged[0].added.element

          temOb.stage = `Stage-${this.stateChanged[0].stage}`
          temOb.stateChanged[`Stage${this.stateChanged[0].stage}`] += 1

          temOb.stateChangeDetails.info.push({developer: temOb.assignedTo, duration: this.timeDifference(this.getDateTime(), temOb.stateChangeDetails.time)})
          temOb.stateChangeDetails.time = this.getDateTime()
          // console.log(this.stateChanged)

        }
        else{
          this.stateChanged[1].added.element.stage = `Stage-${this.stateChanged[1].stage}`
          this.stateChanged[1].added.element.stateChanged[`Stage${this.stateChanged[1].stage}`] += 1
        }
        this.stateChanged = []
      }
      
    }
  },
  methods:{
    timeDifference(end, start){
      dt1 = new Date(this.prepareFormat(start));
      dt2 = new Date(this.prepareFormat(end));
      let diff =(dt2.getTime() - dt1.getTime()) / 1000;

      // let day = Math.round(diff/(24*60*60))

      diff /= (60 * 60);
      return Math.abs(Math.round(diff));
        
    },
    prepareFormat(dateTime){
      // let dateTime = "10/10/2022, 12:22:24 PM"
      let [date, time] = dateTime.split(', ')
      let [day, month, year] = date.split('/')
      let [hour, minute, secondampm] = time.split(':')
      let [second, ampm] = secondampm.split(' ')

      return ampm == 'PM' ? `${year}-${month}-${day}T${parseInt(hour)+11}:${minute}:${second}` : `${year}-${month}-${day}T${hour}:${minute}:${second}`
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
  height: 470px;
  margin: 10px; 
  background-color:#dce3da;
}
</style>
