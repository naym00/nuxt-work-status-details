<template>
    <header class="header">
      <div class="flex-container">
  
        <div class="left-side">
          <nuxt-link to="/"><img style="border-radius: 40%;" height="50" width="50" src="~/static/images/logo/site-logo.png" alt=""></nuxt-link>
        </div>
  
        <div class="middle">
          <nuxt-link to="/">Home</nuxt-link>
          <!-- <nuxt-link to="/courses">Courses</nuxt-link> -->
          <!-- <nuxt-link to="/about">About</nuxt-link> -->
        </div>
  
        <div class="right-side">
          <nuxt-link to="/register">Register</nuxt-link>
          <nuxt-link to="/login">Login</nuxt-link>
          <nuxt-link to="/ef">Logout</nuxt-link>
        </div>
      </div>
    </header>
  </template>
  
  <script>
    export default{
      name: 'AppHeader',
    }
  </script>
  
  <style>
    .header{
      width: 80%;
      margin: auto;
      /* background-color:rgb(224, 224, 196); */
    }
    .flex-container{
      display: flex;
      flex-direction: row;
    }
    .left-side{
      display: flex;
      align-items: center;
      width: 10%;
    }
    .middle{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
    }
    .right-side{
      display: flex;
      justify-content: right;
      align-items: center;
      width: 30%;
    }
    .middle a, .right-side a{
      padding: 7px 30px;
      border-radius: 5px;
      text-decoration: none;
    }
    .middle a:hover, .right-side a:hover{
      background-color: darkgrey;
      color:slategrey
    }
    a.nuxt-link-exact-active {
      color: #000000;
    }
  </style>