import taskJson from '~/static/json/task.json'
export default {
    data(){
      return {
        taskFromJson: JSON.parse(JSON.stringify(taskJson)),
        filteredTasks: [ [], [], [], [] ]
      }
    },
    computed: {
        getTask() {
            this.taskFromJson.map(task => {
                if(task.stage === 'Stage-1') this.filteredTasks[0].push(task)
                else if(task.stage === 'Stage-2') this.filteredTasks[1].push(task)
                else if(task.stage === 'Stage-3') this.filteredTasks[2].push(task)
                else if(task.stage === 'Stage-4') this.filteredTasks[3].push(task)
            })
            return this.filteredTasks
          }
    },
    methods:{
    }
  }