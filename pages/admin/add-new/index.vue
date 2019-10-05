<template>
  <ExcursionAddNew :cities="cities" />
</template>

<script>
  import ExcursionAddNew from '@/components/Excursion/ExcursionAddNew'

  export default {
    async asyncData({$axios, store}) {
      $axios('/admin/api/getcities')
        .then((res) => {
          return {cities: res.data}
        })
        .catch(e => {
          throw e;
        })
      // $axios('/admin/api/getexcursion')
      //   .then((res) => {
      //     return {exc: res.data}
      //   })
      //   .catch(e => {
      //     throw e;
      //   })
    },
    components: {
      ExcursionAddNew
    }
  }

</script>