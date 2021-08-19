import { createApp } from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import vuejsStorage from 'vuejs-storage';
const app = createApp({})
app.use(Vuex)
app.use(vuejsStorage)
app.mount('#app')
const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [
    vuejsStorage({
      keys: [
        'user.user_id',
        'user.access_token'
      ],
      // keep state.count in localStorage
      namespace: 'session',
      driver: vuejsStorage.drivers.sessionStorage
      // if you want to use sessionStorage instead of localStorage
    })
  ]
})

export default store
