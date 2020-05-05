<template>
<div id="sort-phrases">
  <div v-if="sortedResults" style="height: 100%">
    <sorted-results v-bind:results="sortedResults" v-on:onStart="onStart" v-on:initialize="initialize"></sorted-results>
  </div>
  <div v-if="!sortedResults" style="height: 100%">
    <start-sort v-on:onStart="onStart" v-if="status === 'none'"></start-sort>
    <choose-phrase v-bind:phrases="phrases" v-on:onEnd="onEnd($event)" v-on:initialize="initialize" v-if="status === 'started'"></choose-phrase>
  </div>
</div>
</template>

<script>
import StartSort from './StartSort'
import ChoosePhrase from './ChoosePhrase'
import SortedResults from './SortedResutls'

export default {
  components: {
    StartSort,
    ChoosePhrase,
    SortedResults
  },
  data () {
    return {
      status: 'none',
      sortedResults: null,
      phrases: [
        'I like my owrk -- it does me good',
        'The universe is a remarkably harmonious system',
        'The world makes little sense to me',
        'No matter how hard I work, I shall always feel frustrated',
        'My working conditions are poor, and ruin my work',
        'I fee at home in the world',
        'I hate my work',
        'My life is messing up the world',
        'My work contributes nothing to the world',
        'My work brings out the best in me',
        'I enjoy being myself',
        'I curse the day I was born',
        'I love my work',
        'The lack of meaning in the Universe disturbs me',
        'The more I understand my place in the world, the better I get in my work',
        'My work makes me unhappy',
        'I love the beauty of the world',
        'My work adds to the beauty and harmony of the world'
      ]
    }
  },
  methods: {
    initialize: function () {
      this.status = 'none'
      this.sortedResults = null
    },
    onStart: function () {
      this.status = 'started'
      this.sortedResults = null
    },
    onEnd: function (sortedPhrases) {
      this.status = 'ended'
      this.sortedResults = sortedPhrases
    }
  }
}
</script>

<style scoped>
#sort-phrases {
  height: 100%
}
</style>
