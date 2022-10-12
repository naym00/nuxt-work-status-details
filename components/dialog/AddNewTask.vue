<template>
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
</template>

<script>
    export default {
        props: ['projects', 'projectImportance', 'developersJson', 'stagesJson'],
        data(){
            return {
                dialog: false,
                title: '',
                projectId: -1,
                importanceId: -1,
                description: '',
                menu: false,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                developer: '',
                stage: '',
            }
        },
        methods:{
            addNewTask(){

                this.$emit('addNewTask', {
                    title: this.title,
                    projectId: this.projectId,
                    importanceId: this.importanceId,
                    description: this.description,
                    date: this.date,
                    developer: this.developer,
                    stage: this.stage
                })
                
                this.dialog = false
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>