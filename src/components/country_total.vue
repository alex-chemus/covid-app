<template>
    <main>
        <transition name="show" mode="out-in">
            <div class="wrapper" v-if="info">

                <p>{{ info?.Country }}'s latest COVID-19 data</p>

                <div class="container">
                    <div class="confirmed">
                        <p>Confirmed</p>
                        <p>{{ info?.TotalConfirmed }}</p> 
                        <span>+ {{ info?.NewConfirmed }}</span>   
                    </div>

                    <div class="recovered">
                        <p>Recovered</p>
                        <p>{{ info?.TotalRecovered }}</p>
                        <span>+ {{ info?.NewRecovered }}</span>
                    </div>

                    <div class="dead">
                        <p>Dead</p>
                        <p>{{ info?.TotalDeaths }}</p>
                        <span>+ {{ info?.NewDeaths }}</span>
                    </div>
                </div>

            </div>
            <loader v-else></loader>
        </transition>
    </main>
</template>


<script>
import { mapGetters, useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import loader from './loader'

export default {
    name: 'country_total',

    setup() {
        const store = useStore()
        const route = useRoute()
        const country = ref(route.params.country)
        
        store.dispatch('country', country.value)

        return { country }
    }, 

    computed: mapGetters({
        info: 'country'
    }),

    components: { loader }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'
@import '../styles/total.sass'
</style>