import { loginByUsername, logout } from '@/api/login'
import { encryption } from '@/utils/util'
const user = {
  state: {
    user_id: '',
    access_token: '',
    plantName: '新昌电厂',
    plantCode: 'XCXM'
  },
  mutations: {
    SET_USER_ID: (state, userId) => {
      state.user_id = userId
    },
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
    }
  },
  actions: {
    // 根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'scaxscaxscaxscax',
        param: ['password']
      });
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr).then(response => {
          const data = response.data;
          sessionStorage.setItem('user', data);
          commit('SET_USER_ID', data.user_id)
          commit('SET_ACCESS_TOKEN', data.access_token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_USER_ID', '')
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_NAVEBARLIST', [{
            title: '首页',
            path: '/'
          }])
          commit('SET_ACTIVEBAR', '/')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
