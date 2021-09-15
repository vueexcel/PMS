import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Polls from "@/views/Polls.vue"
import CreatePoll from '@/views/CreatePoll.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/polls",
    name: "Polls",
    component: Polls,
  },
  {
    path: "/create-poll",
    name: "CreatePoll",
    component: CreatePoll,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = firebase.auth().currentUser
  if (isAuthenticated && to.fullPath === '/login') {
    next('/polls')
  } else if (!isAuthenticated && to.fullPath !== '/login' && to.fullPath !== '/signup') {
    next('/login')
  } else {
    next()
  }
})

export default router;
