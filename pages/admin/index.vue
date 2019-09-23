<template>
  <div>
    <h1>admin panel</h1>
    <v-btn to="admin/add-new">Add</v-btn>
    <v-btn to="admin/addcity">Add city</v-btn>
  </div>
</template>

<script>
  import Login from '@/components/Auth/Login'

  export default {
    components: {
      Login
    }
  }
</script>

<style scoped>

</style>