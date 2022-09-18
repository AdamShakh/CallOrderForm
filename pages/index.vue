<template>
<div class="min-w-full" style="min-height: 660px;">

    <form-modal></form-modal>

    <div class="flex pt-5 pl-5 ml-16">
       <btn v-for="(city, i) in cities" :key="i" v-bind="{...city, color: colorsForBtns[i]}" class="mr-5"/> 
    </div>

</div>
</template>

<script>
import Btn from '@/components/Btn.vue';
import FormModal from '@/components/FormModal.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'IndexPage',
    components: {
        Btn, FormModal
    },
    computed: {
        ...mapGetters({
            cities: 'getCitiesForFrontPage',
        })
    },
    data: () => ({
        colorsForBtns: [
            ['bg-blue-500', 'hover:bg-blue-600', 'active:bg-blue-700'],
            ['bg-teal-600', 'hover:bg-teal-700', 'active:bg-teal-800'],
        ],
    }),
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Inter');
body {
    font-family: 'Inter';
}
</style>