<template>
  <Login/>
</template>

<script>
  const Login = () => import('@/components/Auth/Login')

  export default {
    components: {
      Login
    }
  }
</script>

<style scoped>

</style>