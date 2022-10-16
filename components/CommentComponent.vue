<template>
    <div>
        <div>
            <v-row>
                <v-col cols="12" md="10"><v-textarea v-model="newRootCmnt" rows="2" label="Add New Comment"></v-textarea></v-col>
                <v-col cols="12" md="2"><v-btn text @click="newRootcomment()">Done</v-btn></v-col>
            </v-row>
            
            
        </div>
        <div v-for="(comment, index) in item.comments" :key="index">
            <div v-for="(singleComment, singleCommentIndex) in comment" :key="singleCommentIndex">
                <div @click="item.comments[index][0].expand = !item.comments[index][0].expand" v-show="singleComment.type" style="display: flex; flex-direction: column;">
                    <div style="display:flex; flex-direction: row;">
                        <div><v-btn text><v-chip small class="ma-2">{{singleComment.commentBy + ': ' + getTime(singleComment.time)}}</v-chip></v-btn></div>
                        <div style="display: flex; align-items: center;"><h4>{{singleComment.comment}}</h4></div>
                    </div>
                </div>
                <div v-show="item.comments[index][0].expand && !singleComment.type" style="display:flex; flex-direction: row;">
                    <div style="width: 10%; display: flex; justify-content: flex-end;"></div>
                        <div style="width: 90%; display: flex; align-items: center;">
                            <div><v-chip small color="cyan" class="ma-2">{{singleComment.commentBy + ': ' + getTime(singleComment.time)}}</v-chip></div>
                            <div style="display: flex; align-items: center;"><h4>{{singleComment.comment}}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="item.comments[index][0].expand" style="display: flex; flex-direction:row">
                <div style="width: 10%"></div>
                <div><v-chip x-small class="ma-2" color="primary" @click="reply(index)">Reply</v-chip></div>
                <div><v-textarea v-model="newComment" auto-grow class="mx-2" rows="1"></v-textarea></div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
    export default {
        props: ['item'],
        data(){return {newComment: '', newRootCmnt: ''}},
        methods:{
            getTime(date){
                return moment(date).format('LTS')
            },
            reply(index){
                let rightNow = moment().format('YYYY-MM-D h:mm:ss A')
                this.$emit('newComment', {
                    index: index, 
                    id: this.item.id, 
                    stage: this.findKey(this.item),
                    commentContent: {commentBy: 'Developer-1', type: false, time: rightNow, comment: this.newComment}
                })
                this.newComment = ''
            },
            newRootcomment(){
                let rightNow = moment().format('YYYY-MM-D h:mm:ss A')
                this.$emit('newRootcomment', {
                    id: this.item.id,
                    stage: this.findKey(this.item),
                    commentContent: [{commentBy: "Developer-1", type: true, expand: false, time: rightNow, comment: this.newRootCmnt}]
                })
                this.newRootCmnt = ''
            },
            findKey(item){
                if(item.stage == "Stage-1") return "stage1"
                else if(item.stage == "Stage-2") return "stage2"
                else if(item.stage == "Stage-3") return "stage3"
                else return "stage4"
            }
        }
    }
</script>

<style>

</style>