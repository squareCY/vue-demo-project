import Vue from 'vue'
import Router from 'vue-router'
import bar from '@/components/bar'
import foo from '@/components/foo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/foo',
      name: 'foo',
      component: foo
    },{
      path: '/bar',
      name: 'bar',
      component: bar
    }
  ]
})
