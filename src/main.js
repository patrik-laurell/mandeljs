import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Mandelbrot from './components/Mandelbrot.vue'

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/mandelbrot': {
    component: Mandelbrot
  }
})

router.start(App, "#app")
