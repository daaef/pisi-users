import Vue from 'vue'
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css'

import 'vuesax/dist/vuesax.css' // Vuesax styles
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#2936AC',
      success: '#E8E8F3',
      danger: '#E51919',
      warning: '#FF8F6B',
      dark: '#202020'
    }
  }
})
