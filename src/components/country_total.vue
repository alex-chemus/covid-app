<template>
    <main>
        <div class="wrapper">

            <p>some value</p>
            <p>total confirmed: {{ info?.confirmed }}</p>
            <p>{{ country }}</p>

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