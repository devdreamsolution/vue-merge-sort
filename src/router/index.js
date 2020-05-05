import Vue from 'vue'
import Router from 'vue-router'
import SortPhrases from '@/components/SortPhrases'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'SortPhrases',
    component: SortPhrases
  }]
})
