import Vue from 'vue';
import VueRouter from 'vue-router';
import AnimalList from '../views/AnimalList.vue';

// Animal Data
import allFish from '../assets/json/fish.json';
import allBugs from '../assets/json/bugs.json';
import allDiving from '../assets/json/diving.json';

Vue.use(VueRouter);

const routes = [
  {
    path: '/fish',
    name: 'fish',
    component: () => import(/* webpackChunkName: "animalList" */ '../views/AnimalList.vue'),
    props: {
      title: 'Fish',
      animals: allFish,
    },
  },
  {
    path: '/bugs',
    name: 'bugs',
    component: () => import(/* webpackChunkName: "animalList" */ '../views/AnimalList.vue'),
    props: {
      title: 'Bugs',
      animals: allBugs,
    },
  },
  {
    path: '/diving',
    name: 'diving',
    component: () => import(/* webpackChunkName: "animalList" */ '../views/AnimalList.vue'),
    props: {
      title: 'Diving',
      animals: allDiving,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
