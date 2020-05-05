<template>
<div id="start-sort">
  <p>Instructions:</p>
  <p>Choose which one you fee is the better of the two options.</p>
  <b-button v-on:click.prevent="onStart" style="margin-top: 60px">Start</b-button>
</div>
</template>

<script>
export default {
  props: {
    start: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  methods: {
    onStart: function () {
      this.$emit('onStart')
    }
  }
}
</script>

<style scoped>
#start-sort {
  height: 100%;
  padding-top: 40px;
}
</style>
