<template>
    <main>
        <div class="wrapper" v-if="info">
            <p id='title'>World's latest COVID-19 data</p>

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
            <!--<loader v-else id="loader"></loader>-->
        </div>
        <loader v-else></loader>
    </main>
</template>


<script>
import { useStore, mapGetters } from 'vuex'
import loader from './loader'
//import Loader from './loader.vue'

export default {
    name: 'world_total',

    setup() {
        const store = useStore()

        //this action check if the data about the world exists
        //if not, it async-ly fetches the data
        store.dispatch( 'world_total' )
        return {
            data: store.getters.world_total?.confirmed
        }
    },

    computed: mapGetters({
        info: 'world_total'
    }),

    components: { loader }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'
@import '../styles/total.sass'
</style>