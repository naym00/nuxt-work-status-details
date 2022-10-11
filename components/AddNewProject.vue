<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">New Project<v-icon>mdi-plus</v-icon></v-btn>
        </template>

        <v-card>
          <v-card-title><span class="text-h5">New Project</span></v-card-title>
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12">
                  <v-text-field v-model="title" label="Title*" required></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="description" label="Description*" required></v-text-field>
                </v-col>

                <v-col cols="12">
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

              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addNewProject()">Save</v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
</template>

<script>
import moment from "moment"
export default {
    data(){
        return {
            dialog: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            title: '',
            description: '',
            menu: false,
        }
    },
    methods: {
        addNewProject(){
            let rightNow = moment().format('YYYY-MM-D h:mm:ss A')
            let deadline = `${this.date} 11:59:59 PM`

            this.$emit('newproject', { title: this.title, description: this.description, createdAt: rightNow, deadline: deadline})
            this.dialog = false
    }
    }
        
}
</script>