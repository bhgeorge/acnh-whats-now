import Vue from 'vue';
import VueRouter from 'vue-router';
import AnimalList from '../views/AnimalList.vue';

// Animal Data
import allFish from '../assets/json/fish.json';

Vue.use(VueRouter);

const routes = [
  {
    path: '/fish',
    name: 'fish',
    component: AnimalList,
    props: {
      title: 'Fish',
      animals: allFish,
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
