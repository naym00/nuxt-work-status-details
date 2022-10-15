<template>
    <div>
        
        <div v-for="(comment, index) in comments" :key="index" style="margin: 5px 0">

            <div style="display: flex; flex-direction: column;">
                <div v-show="comment.type" style="display:flex; flex-direction: row;">
                    <div><v-btn text @click="commentExpand = !commentExpand"><v-chip small class="ma-2">{{comment.commentBy + ': ' + getTime(comment.time)}}</v-chip></v-btn></div>
                    <div style="display: flex; align-items: center;"><h4>{{comment.comment}}</h4></div>
                </div>
            </div>
            <div v-show="commentExpand && !comment.type" style="display:flex; flex-direction: row;">
                <div style="width: 10%; display: flex; justify-content: flex-end;"></div>
                    <div style="width: 90%; display: flex; align-items: center;">
                        <div><v-chip small color="cyan" class="ma-2">{{comment.commentBy + ': ' + getTime(comment.time)}}</v-chip></div>
                        <div style="display: flex; align-items: center;"><h4>{{comment.comment}}</h4>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
import moment from "moment"
    export default {
        props: ['comments'],
        data(){
            return {
                commentExpand: false,
            }
        },
        methods:{
            getTime(date){
                return moment(date).format('LTS')
            }
        }
    }
</script>

<style>

</style>