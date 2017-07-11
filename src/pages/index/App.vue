<template>
  <div>
    <vheader></vheader>
    <vindex></vindex>
    <vfooter></vfooter>
  </div>
</template>

<script>
import vheader from '../../components/common/Header'
import vfooter from '../../components/common/Footer'
import vindex from '../../components/index/Index'

export default {
  name: 'index',
  components: {
    vheader,
    vfooter,
    vindex
  }
}
</script>
