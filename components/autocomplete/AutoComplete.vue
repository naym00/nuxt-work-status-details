<template>
    <div>
        {{datas}}
        <v-select v-model="datas" :items="states" item-text="name" label="Select States" multiple chips persistent-hint></v-select>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      datas: [],
      states: [
        {id: 1, name: 'Alabama'},
        {id: 2, name: 'Alaska'},
        {id: 3, name: 'American Samoa'},
        {id: 4, name: 'Arizona'},
        {id: 5, name: 'Arkansas'}
      ],
    }
  },
}
</script>