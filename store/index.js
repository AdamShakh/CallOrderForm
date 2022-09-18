
export const state = () => ({
    Cities: [
        {
            id: 1,
            name: "Москва"
        },
        {
            id: 2,
            name: "Санкт-Петербург"
        },
        {
            id: 3,
            name: "Казань"
        },
    ],
    CitiesFrontPage: [
        {
            id: 1,
            name: "Заказать в Москву"
        },
        {
            id: 2,
            name: "Заказать в Санкт-Петербург"
        },
    ],
    showFormModal: false,
    currentCityId: 1,
})

export const getters = {
    getCitiesForSelect(state) {
        return state.Cities
    },
    getCitiesForFrontPage(state) {
        return state.CitiesFrontPage
    },
}

export const mutations = {
    openFormModal(state, id) {
        state.showFormModal = true;
        state.currentCityId = id;
    }
}