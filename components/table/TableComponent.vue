<template>
    <div class="TableComponent">

        <table class="customers">
            <tr>
                <th v-for="(header, index) in headers" :key="index">{{header}}</th>
            </tr>
            <tr v-for="(eachData, index) in data" :key="index">
                <td v-for="(key, index) in keys" :key="index">{{eachData[key]}}</td>
            </tr>

        </table>

    </div>
</template>
  
<script>
  export default {
    name: "TableComponent",
    props: ["headers", "keys", "data"],
    
}
</script>


<style>
    .customers {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    .customers td, .customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    .customers tr:nth-child(even){background-color: #f2f2f2;}
    
    .customers tr:hover {background-color: #ddd;}
    
    .customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
    </style>