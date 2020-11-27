<template>
    <main>
        <div class="wrapper">

            <p>some value</p>
            <p>total confirmed: {{ total_confirmed }}</p>

        </div>
    </main>
</template>


<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
    name: 'country_total',

    setup() {
        const store = useStore()
        const route = useRoute()
        const country = route.params.country
        
        store.dispatch('country_total')

        const stats = store.getters.get_countries.find(item => {
            console.log( item )
            return item.Slug == country
        })

        console.log( stats )

        return {
            new_confirmed: stats.NewConfirmed,
            new_recovered: stats.NewRecovered,
            new_dead: stats.NewDeaths,
            total_confirmed: stats.TotalConfirmed,
            total_recovered: stats.TotalRecovered,
            total_dead: stats.TotalDeaths 
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

main
    font-size: 24px
    font-family: 'Roboto'

.wrapper, main
    @extend %centralize
    flex-direction: column

.wrapper
    width: 100%
    max-width: 1240px
    margin: auto
</style>