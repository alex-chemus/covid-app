<template>
    <main>
        <div class="wrapper">

            <p>{{ info[0]?.Country }}'s data by every day</p>

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


<style lang="sass">
@import '../styles/main.sass'

.container
    @extend %centralize    
</style>