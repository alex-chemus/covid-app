<template>
    <main>
        <div class="wrapper">

            <p>{{ info.name }}'s latest COVID-19 data</p>

            <div class="container">

                <div class="confirmed">
                    <p>Confirmed</p>
                    <p>{{ info?.confirmed }}</p> 
                    <span>+ {{ info?.new_confirmed }}</span>   
                </div>

                <div class="recovered">
                    <p>Recovered</p>
                    <p>{{ info?.recovered }}</p>
                    <span>+ {{ info?.new_recovered }}</span>
                </div>

                <div class="dead">
                    <p>Dead</p>
                    <p>{{ info?.dead }}</p>
                    <span>+ {{ info?.new_dead }}</span>
                </div>

            </div>

        </div>
    </main>
</template>


<script>
import { mapGetters, useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
    name: 'country_total',

    setup() {
        const store = useStore()
        const route = useRoute()
        const country = ref(route.params.country)
        
        store.dispatch('country_total', country.value)

        return { country }
    }, 

    computed: mapGetters({
        info: 'country_total'
    })
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'
@import '../styles/total.sass'
</style>