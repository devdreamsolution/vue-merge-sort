<template>
<div id="choose-phrase" ref="choosePhrase">
  <div style="text-align: left">
    <b-button v-on:click.prevent="onBack" style="width: auto;">Back</b-button>
  </div>
  <p>Instructions:</p>
  <p>Choose which one you fee is the better of the two options.</p>
  <transition name="fade">
    <div v-if="show">
      <p style="margin-top: 30px">
        <button ref="firstButton" v-on:click="sortPhrases(true)" class=" btn btn-outline-primary">{{ phrase1 }}</button>
      </p>
      <p>
        <button ref="secondButton" v-on:click="sortPhrases(false)" class="btn btn-outline-primary">{{ phrase2 }}</button>
      </p>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  props: {
    phrases: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      leftPhrasesSet: [],
      sortedPhrasesSet: [],
      history: [],
      phraseSet1: [],
      phraseSet2: [],
      sortedPhrases: [],
      phrase1: '',
      phrase2: '',
      show: false
    }
  },
  mounted () {
    const self = this
    setTimeout(function () {
      self.initialize()
      self.getNextPhrases()
    }, 200)
  },
  methods: {
    initialize: function () {
      for (var i = 0; i < this.phrases.length; i++) {
        this.leftPhrasesSet.push([this.phrases[i]])
      }
      this.sortedPhrasesSet = []
      this.history = []
      this.phraseSet1 = []
      this.phraseSet2 = []
      this.sortedPhrases = []
      this.phrase1 = ''
      this.phrase2 = ''
    },
    getNextPhrasesSets: function () {
      var len = this.leftPhrasesSet.length
      if (len > 1) {
        if (this.sortedPhrases.length > 0) {
          this.sortedPhrasesSet.push(this.sortedPhrases)
          this.sortedPhrases = []
        }
        this.phraseSet1 = this.leftPhrasesSet[0]
        this.phraseSet2 = this.leftPhrasesSet[1]
        if (len === 2) {
          this.leftPhrasesSet = []
        } else {
          this.leftPhrasesSet = this.leftPhrasesSet.slice(2)
        }
      } else {
        if (len === 1) {
          this.sortedPhrases = this.sortedPhrases.concat(this.leftPhrasesSet[0])
        }
        if (this.sortedPhrases.length === 0 || this.sortedPhrases.length === this.phrases.length) {
          this.$emit('onEnd', this.sortedPhrases)
        } else {
          if (this.sortedPhrases.length > 0) {
            this.sortedPhrasesSet.push(this.sortedPhrases)
          }
          this.sortedPhrases = []

          this.leftPhrasesSet = this.sortedPhrasesSet
          this.sortedPhrasesSet = []
          this.getNextPhrasesSets()
        }
      }
    },
    getNextPhrases: function () {
      var len1 = this.phraseSet1.length
      var len2 = this.phraseSet2.length
      if (len1 === 0 || len2 === 0) {
        if (len1 === 0) {
          this.sortedPhrases = this.sortedPhrases.concat(this.phraseSet2)
        } else if (len2 === 0) {
          this.sortedPhrases = this.sortedPhrases.concat(this.phraseSet1)
        }
        this.getNextPhrasesSets()
      }

      if (this.phraseSet1.length > 0 && this.phraseSet2.length > 0) {
        this.phrase1 = this.phraseSet1[0]
        this.phrase2 = this.phraseSet2[0]
      }
      this.show = true
    },
    sortPhrases: function (isFirst) {
      const self = this
      this.$refs.firstButton.blur()
      this.$refs.secondButton.blur()
      setTimeout(function () {
        self.show = false
        setTimeout(function () {
          self.updatePhrases(isFirst)
        }, 150)
      }, 300)
    },
    updatePhrases: function (isFirst) {
      this.history.push({
        leftPhrasesSet: this.leftPhrasesSet.slice(),
        sortedPhrasesSet: this.sortedPhrasesSet.slice(),
        phraseSet1: this.phraseSet1.slice(),
        phraseSet2: this.phraseSet2.slice(),
        sortedPhrases: this.sortedPhrases.slice(),
        phrase1: this.phrase1,
        phrase2: this.phrase2
      })
      if (isFirst) {
        this.sortedPhrases.push(this.phrase1)
        this.phraseSet1 = this.phraseSet1.slice(1)
      } else {
        this.sortedPhrases.push(this.phrase2)
        this.phraseSet2 = this.phraseSet2.slice(1)
      }
      this.getNextPhrases()
    },
    onBack: function () {
      if (this.history.length === 0) {
        this.$emit('initialize')
      } else {
        let temp = this.history.pop()
        this.leftPhrasesSet = temp.leftPhrasesSet
        this.sortedPhrasesSet = temp.sortedPhrasesSet
        this.phraseSet1 = temp.phraseSet1
        this.phraseSet2 = temp.phraseSet2
        this.sortedPhrases = temp.sortedPhrases
        this.phrase1 = temp.phrase1
        this.phrase2 = temp.phrase2
      }
    }
  }
}
</script>

<style scoped>
#choose-phrase button {
  width: 100%;
  white-space: normal !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
