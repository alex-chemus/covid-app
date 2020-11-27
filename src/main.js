//import packages:
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'
import axios from 'axios'

//import components and app
import App from './App.vue'
import world_total from './components/world_total.vue'
//import world_days from './components/world_days.vue'
import country_total from './components/country_total.vue'
import country_days from './components/country_days.vue'
import not_found from './components/not_found.vue'

//create and define routes:
const router = createRouter({
    routes: [
        { path: '/', component: world_total, alias: '/total' },
        //{ path: '/by-days', component: world_days },
        { path: '/:country/total', component: country_total },
        { path: '/:country/by-days', component: country_days },
        { path: '/:pathMatch(.*)', component: not_found }
    ],
    history: createWebHashHistory()
})

/*
urls:
/summary - total stats both for world and for countries
/country/<country-slug> - stats for each day for the country
/total/country/<country-slug> - the same as above
/
*/

//create and define store:
const store = createStore({
    state() {
        return {
            world_total: null,
            //world_days: null,
            country_total: null,
            country_days: null,
            countries: [],
        }
    },

    mutations: {
        world_total(state, data) {
            state.world_total = data
        },

        /*world_days(state, data) {
            state.world_days = data
        },*/

        country_total(state, data) {
            state.country_total = data
        },

        country_days(state, data) {
            state.country_days = data
        },

        set_countries( state, data ) {
            state.countries = data
        }
    },

    actions: {
        async world_total({ commit, getters }) {
            if (!getters.world_total) {
                const response = await axios('https://api.covid19api.com/summary')
                const result = response.data.Global

                commit('world_total', {
                    confirmed: result.TotalConfirmed,
                    new_confirmed: result.NewConfirmed,
                    recovered: result.TotalRecovered,
                    new_recovered: result.NewRecovered,
                    dead: result.TotalDeaths,
                    new_dead: result.NewDeaths
                })
            }
        },

        /*async world_days({ commit, getters }) {
            console.log(commit, getters)
        },*/

        async country_days({ commit, getters }) {
            console.log(commit, getters)
        },

        async country_total({ commit, getters }) {
            if (!getters.country_total) {
               // const response = axios()
            }
            console.log(commit, getters)
        },

        async get_countries({ commit }) {
            const response = await axios('https://api.covid19api.com/countries')

            commit( 'set_countries', response.data )

            //alert('fetched data!')
        }
    },

    getters: {
        world_total( state ) {
            return state.world_total
        },

        /*world_days( state ) {
            return state.world_days
        },*/

        country_total( state ) {
            return state.country_total
        },

        country_days( state ) {
            return state.country_days
        },

        get_countries( state ) {
            return state.countries ?? null
        }
    }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
