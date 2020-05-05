<template>
<div id="sorted-results">
  <div class="fixed-top" style="top: 30px">
    <p>You are finished!</p>
    <p>Here are your results:</p>
  </div>
  <div style="position:absolute; top:120px; left:0; right:0; bottom:100px; overflow-y: auto">
      <ol>
        <li v-for="(phrase, index) in results" v-bind:key="`phrase-${index}`">{{ phrase }}</li>
      </ol>
  </div>
  <div class="fixed-bottom" style="bottom: 30px">
    <b-button v-on:click.prevent="onBack">Back</b-button>
    <b-button v-on:click.prevent="onRestart">Restart</b-button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  methods: {
    onRestart: function () {
      this.$emit('onStart', true)
    },
    onBack: function () {
      this.$emit('initialize')
    }
  }
}
</script>

<style scoped>
#sorted-results {

}

#sorted-results ol {
  text-align: left;
}

#sorted-results li {
  display: list-item;
}
</style>
