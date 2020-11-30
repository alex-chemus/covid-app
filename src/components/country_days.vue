<template>
    <main>
        <div class="wrapper">

            <p>The country is {{ info[0]?.Country }}</p>
            <!--<div class="container">

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

            </div>-->

        </div>
    </main>
</template>


<script>
import { mapGetters, useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
    name: 'country_days',

    setup() {
        const store = useStore()
        const route = useRoute()
        const country = ref(route.params.country)

        store.dispatch('country_days', country.value)
    },

    computed: mapGetters({
        info: 'country_days'
    })
}
</script>


<style lang="sass">

</style>