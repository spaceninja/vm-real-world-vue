import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import DateFilter from './filters/date'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import Vuelidate from 'vuelidate'
import 'nprogress/nprogress.css'

Vue.filter('date', DateFilter)

Vue.use(Vuelidate)

Vue.config.productionTip = false

// Automatically register Base[*].vue components
// 1. the relative path of the directory to search
// 2. subdirectories will not be searched
// 3. regular expression that searches for components starting with "Base"
//    and ending in .vue or .js
// 4. removes what's before and after the filename itself
const requireComponent = require.context(
  './components', // 1
  false, // 2
  /Base[A-Z]\w+\.(vue|js)$/ // 3
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1') // 4
    )
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
