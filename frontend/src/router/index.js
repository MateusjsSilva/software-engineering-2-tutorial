import { createRouter, createWebHistory } from 'vue-router'
import SingIn from '@/components/SingIn.vue';
import ListUsers from '@/components/ListUsers.vue';
import ImageUpload from '@/components/ImageUpload.vue';

const routes = [
  {
    path: '/sing-in',
    component: SingIn
  },
  { path: "/list-users",
    component: ListUsers 
  }, 
  { path: "/images",
    component: ImageUpload 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
