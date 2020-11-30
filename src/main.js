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
*/

//create and define store:
const store = createStore({
    state() {
        return {
            world_total: null,
            //country_total: null,
            country_days: null,
            countries: [],
            country: null
        }
    },

    mutations: {
        world_total(state, data) {
            state.world_total = data
        },

        /*country_total(state, data) {
            state.country_total = data
        },*/

        country(state, data) {
            state.country = data
            //alert('changed the country')
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

        async country_days({ commit, getters, dispatch }, name) {
            const response = await axios(`https://api.covid19api.com/country/${name}`)
            commit('country_days', response.data.filter(item => {
                return item.Confirmed!=0 || item.Recovered!=0 || item.Deaths!=0
            }))
                
            if ( !getters.country ) {
                console.log( getters.country )

                dispatch('get_countries').then(countries => {
                    const country = countries.find(item => item.Slug == name)
                    commit('country', country)
                })
            }
        },

        async country({ getters, dispatch, commit }, name) {

            if ( getters.get_countries.length < 1 ) {
                dispatch( 'get_countries' ).then(countries => {

                    if (!getters.country?.name) {
                        const country = countries.find(item => item.Slug == name)

                        commit('country', country)
                    }
                })
            }
        },

        async get_countries({ commit }) {
            const response = await axios('https://api.covid19api.com/summary')

            commit( 'set_countries', response.data.Countries )

            return Promise.resolve(response.data.Countries)
        }
    },

    getters: {
        world_total( state ) {
            return state.world_total
        },

        country( state ) {
            return state.country
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
