<template>
  <div>
    <vheader></vheader>
    <vabout></vabout>
    <vfooter></vfooter>
  </div>
</template>

<script>
import vheader from '../../components/common/Header'
import vfooter from '../../components/common/Footer'
import vabout from '../../components/about/About'

export default {
  name: 'about',
  components: {
    vheader,
    vfooter,
    vabout
  }
}
</script>
