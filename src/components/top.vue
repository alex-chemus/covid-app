<template>
    <header>
        <button id="switcher">
            <div id="burger" @click="(event) => {
                    show_switcher = !show_switcher;
                    event.stopPropagation()
                }">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>

            <nav v-if="show_switcher">
                <router-link :to="type === 'world' ? '/total' : `/${country}/total`" class="link">Latest data</router-link>
                <router-link :to="type === 'world' ? '/by-days' : `/${country}/by-days`" class="link">Data by days</router-link>
            </nav>
        </button>

        <div class="wrapper">
            <p class="message">{{ message }}</p>
            <search/>
        </div>
    </header>
</template>


<script>
import search from './search.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'top',

    setup() {
        const message = ref('See the latest data by country:')
        const store = useStore()
        const router = useRouter()
        const route = router.currentRoute._value.path
        const show_switcher = ref(false)

        document.addEventListener('click', () => {
            show_switcher.value = false;
        })

        let type;
        if (route === '/' ||
            route === '/total' ||
            route === '/by-days') {
                type = ref('world')
            } else {
                type = ref('country')
            }

        return { 
            message, 
            type,
            country: store.getters.country_total?.name,
            show_switcher
        }
    },

    components: { search }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

header
    font-size: 18px
    padding: 1em 10px
    padding-left: 100px
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, .15)
    font-family: 'Roboto'
    height: auto


    @extend %centralize

    position: relative

.message
    font-size: 1em
    margin: 0

#switcher
    background-color: transparent
    border: none
    outline: none

    position: absolute
    top: 1em
    left: 1em

.line
    width: 28px
    height: 5px
    border-radius: 2px
    background: $blue
    cursor: pointer

    &:not(:last-child)
        margin-bottom: 3px

.wrapper
    max-width: 1240px
    width: 100%

nav
    position: absolute
    top: calc(100% + .5em)

    display: flex
    flex-direction: column

    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .25)
    background-color: white
    font-size: 14px

.link
    text-decoration: none
    color: black
    font-size: 1em
    font-family: 'Roboto'
    padding: 1em
    white-space: nowrap
</style>