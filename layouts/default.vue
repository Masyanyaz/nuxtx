<template>
  <v-app>
    <Navbar />
    <nuxt />
    <Footer />
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Footer from '@/components/Footer'

export default {
  data () {
    return {
      title: 'asda'
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>
