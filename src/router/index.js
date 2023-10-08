import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //                Router of Web
    {
      path:"",
      component: () => import('../components/web/layout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/web/home/index.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../components/web/about/index.vue')
        },
        {
          path: '/store',
          name: 'store',
          component: () => import('../components/web/store/index.vue')
        },
        {
          path: '/store/:id',
          name: 'productDetail',
          component: () => import('../components/web/store/product-detail.vue')
        },
        {
          path: '/auth/sign-in',
          name: 'sign-in',
          component: () => import('../components/web/sign-in/index.vue')
        },
        {
          path: '/auth/sign-up',
          name: 'sign-up',
          component: () => import('../components/web/sign-up/index.vue')
        },
        {
          path: '/user/purchase-history',
          name: 'purchase-history',
          component: () => import('../components/web/purchase-history/index.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../components/web/order/index.vue')
        },
        {
          path: '/user/profile',
          name: 'profile',
          component: () => import('../components/web/profile/index.vue')
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../components/web/contact/index.vue')
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('../components/web/news/index.vue')
        },
        {
          path: '/news/detail',
          name: 'detail',
          component: () => import('../components/web/news/detail.vue')
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('../components/web/cart/index.vue')
        },
        {
          path: '/auth/forgot-password',
          name: 'forgot-password',
          component: () => import('../components/web/forgot-password/index.vue')
        },
        {
          path: '/auth/reset-password',
          name: 'reset-password',
          component: () => import('../components/web/forgot-password/reset-password.vue')
        },
        {
          path: '/bill',
          name: 'bill',
          component: () => import('../components/web/checkout/bill.vue')
        },
      ]
    },

    //              Admin
    {
      path: '/admin',
      component: () => import('../components/admin/layout.vue'),
      children: [
        {
          path: '/admin/home',
          name: 'homeAdmin',
          component: () => import('../components/admin/home/index.vue')
        },
        {
          path: '/admin/user',
          name: 'List_user',
          component: () => import('../components/admin/user/index.vue')
        },
        {
          path: '/admin/news',
          name: 'List_news',
          component: () => import('../components/admin/new/index.vue')
        },
        {
          path: '/admin/brand',
          name: 'List_brand',
          component: () => import('../components/admin/brand/index.vue')
        },
        {
          path: '/admin/category',
          name: 'List_category',
          component: () => import('../components/admin/category/index.vue')
        },
        {
          path: '/admin/order',
          name: 'List_order',
          component: () => import('../components/admin/order/index.vue')
        },
        {
          path: '/admin/feedback',
          name: 'List_feedback',
          component: () => import('../components/admin/feedback/index.vue')
        },
        {
          path: '/admin/product',
          name: 'List_product',
          component: () => import('../components/admin/product/index.vue')
        },
      ]
    }
  ]
})

export default router
