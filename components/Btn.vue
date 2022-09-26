<template>
    <div>
        <button type="button" @click="openFormModal" class="action-btn" :class="color">
            {{ name }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'ActionButton',
    props: {
        id:    { type: Number, required: true },
        name:  { type: String, required: true },
        color: { type: Array, required: true },
    },
    methods: {
        openFormModal() {
            this.$store.commit('openFormModal', this.id)
        }
    },
}
</script>

<style scoped lang="postcss">
.action-btn {
    @apply py-2 px-4 w-full sm:w-auto
            rounded-md shadow-sm text-white not-italic font-medium text-base leading-5
            hover:text-white hover:border-transparent 
            focus:outline-none focus:ring focus:ring-gray-300;
}
</style>