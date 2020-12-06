<template>
    <transition name="show" mode="out-in">
        <main v-if="info">
                <p class="title">{{ info?.length ? info[0].Country+'\'s data by every day' : ''}}</p>

                <div class="container" v-for="item in info?.slice(0, amount)" :key="Date.parse(item?.Date)">
                    <div class="wrapper">
                        <p class="date">
                        {{ get_date(item?.Date).date }}.
                        {{ get_date(item?.Date).month }}.
                        {{ get_date(item?.Date).year }}
                        </p>

                        <div class="info">
                        <div class="confirmed">
                            <p>Confirmed</p>
                            <p>{{ item?.Confirmed }}</p> 
                        </div>

                        <div class="recovered">
                            <p>Recovered</p>
                            <p>{{ item?.Recovered }}</p>
                        </div>

                        <div class="dead">
                            <p>Dead</p>
                            <p>{{ item?.Deaths }}</p>
                        </div>
                        </div>
                    </div>
                </div>

                <button id="more" @click="increase">
                    more
                </button>
        </main>
        <main v-else>
            <loader></loader>
        </main>
    </transition>
</template>


<script>
import { mapGetters, useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import loader from './loader'

export default {
    name: 'country_days',

    setup() {
        const store = useStore()
        const route = useRoute()
        const country = ref(route.params.country)
        let amount = ref(10)

        store.dispatch('country_days', country.value)

        return { amount }
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
        },

        increase() {
            const curr_scroll = window.pageYOffset
            this.amount+=10
            setTimeout(() => { window.scrollTo(0, curr_scroll) })
        }
    },

    components: { loader }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

/*.wrapper
    @extend %centralize
    flex-direction: column
    width: 100%
    max-width: 1240px
    margin: auto
    padding: 3em 0*/

.wrapper
    @extend %centralize
    flex-direction: column
    width: 100%
    max-width: 1240px 

main
    font-size: 24px
    font-family: 'Roboto'
    flex-direction: column
    @extend %centralize
    padding: 3em 0

.container
    @extend %centralize
    flex-direction: column
    width: 100%
    padding: 1.5em 0
    
    &:nth-child(2n)
        background-color: $grey
    
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
    margin-bottom: 1.5em
    font-size: 1.2em

#more
    font-size: 18px
    border: 1px solid $blue
    padding: .2em
    border-radius: 10px
    background-color: white
    outline: none
    cursor: pointer

    &:hover
        background-color: $blue
        color: white 
        border-color: transparent

.show-enter-from,
.show-leave-to
    opacity: 0

.show-enter-to,
.show-leave-from
    opacity: 1

.show-enter-active
    transition: 1s

.show-leave-active
    transition: .1s
</style>