<template>
    <main>
        <div class="wrapper">
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
        </div>
    </main>
</template>


<script>
import { useStore, mapGetters } from 'vuex'
//import { reactive } from 'vue'

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
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

main
    font-size: 24px
    font-family: 'Roboto'
    flex-direction: column

.wrapper, main
    @extend %centralize

.wrapper
    flex-direction: column
    width: 100%
    max-width: 1240px
    margin: auto

p
    font-size: 1em

#title
    margin: 0
    margin-bottom: 2em
    text-align: center

.container
    width: 100%
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 30px

    div
        @extend %centralize
        flex-direction: column

        p
            margin: 0
        p:first-child
            margin-bottom: 1em
        span
            margin-top: 0.5em
            font-size: 24px
            opacity: .75

.recovered
    color: $green

.dead
    color: $red
</style>