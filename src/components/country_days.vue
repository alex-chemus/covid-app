<template>
    <main>
        <div class="wrapper">

            <p class="title">{{ info?.length ? info[0].Country+'\'s data by every day' : ''}}</p>

            <div class="container" v-for="item in info" :key="Date.parse(item.Date)">

                <p class="date">
                    {{ get_date(item.Date).date }}.
                    {{ get_date(item.Date).month }}.
                    {{ get_date(item.Date).year }}
                </p>

                <div class="info">
                    <div class="confirmed">
                        <p>Confirmed</p>
                        <p>{{ item.Confirmed }}</p> 
                    </div>

                    <div class="recovered">
                        <p>Recovered</p>
                        <p>{{ item.Recovered }}</p>
                    </div>

                    <div class="dead">
                        <p>Dead</p>
                        <p>{{ item.Deaths }}</p>
                    </div>
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
    name: 'country_days',

    setup() {
        const store = useStore()
        const route = useRoute()
        const country = ref(route.params.country)

        store.dispatch('country_days', country.value)
    },

    computed: mapGetters({
        info: 'country_days'
    }),

    methods: {
        get_date(str) {
            const date = new Date( Date.parse(str) )
            return {
                year: date.getFullYear(),
                month: date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth(),
                date: date.getDate() < 10 ? '0'+date.getDate() : date.getDate()
            }
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

.wrapper
    @extend %centralize
    flex-direction: column
    width: 100%
    max-width: 1240px
    margin: auto
    padding: 3em 0

main
    font-size: 24px
    font-family: 'Roboto'
    flex-direction: column
    @extend %centralize

.container
    @extend %centralize
    flex-direction: column
    width: 100%
    margin-bottom: 3em
    
.info
    width: 100%
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 30px

    div
        @extend %centralize
        flex-direction: column

        p 
            margin: 0

        p:not(:last-child) 
            margin-bottom: 1em

.date
    margin: 0
    margin-bottom: 1em

.recovered 
    color: $green

.dead
    color: $red

.title
    margin: 0
    margin-bottom: 2em
</style>