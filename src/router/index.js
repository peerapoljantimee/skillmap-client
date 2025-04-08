// src\router\index.js

import { createRouter,createWebHistory } from "vue-router"
import TheTrendsJobs from "../components/jobMatching/TheTrendsJobs.vue" 
import TheMapping from "../components/jobMatching/TheMapping.vue"
import TheLogin from "../components/auth/TheLogin.vue" 
import TheAdmin from "../components/admin/TheAdmin.vue" 
import TheJobposting from '@/components/admin/TheJobposting.vue';
import TheScraping from '@/components/admin/TheScraping.vue';
import TheAddJobposting from '@/components/admin/TheAddJobposting.vue';
import TheCompany from '@/components/admin/TheCompany.vue';
import TheExtractskills from '@/components/admin/TheExtractskills.vue';

// test
import TheTest from "../components/jobMatching/TheTest.vue"



const routes = [
    {
        path:'/',
        name:'Home',
        component:TheTrendsJobs
    },
    {
        path:'/mapping',
        name:'TheMapping',
        component:TheMapping
    },
    {
        path:'/login',
        name:'TheLogin',
        component:TheLogin
    },
    {
        path:'/admin',
        name:'TheAdmin',
        component:TheAdmin
    },
    {
        path:'/admin/jobposting',
        name:'TheJobposting',
        component:TheJobposting
    },
    {
        path:'/admin/scraping',
        name:'TheScraping',
        component:TheScraping
    },
    {
        path:'/admin/add-Jobposting',
        name:'TheAddJobposting',
        component:TheAddJobposting
    },
    {
        path:'/admin/company',
        name:'TheCompany',
        component:TheCompany
    },
    {
        path:'/admin/extract-skills',
        name:'TheExtractskills',
        component:TheExtractskills
    },
    {
        path:'/test',
        name:'TheTest',
        component:TheTest
    }



]
const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router