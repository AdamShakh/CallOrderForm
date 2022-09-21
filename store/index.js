import axios from "axios";

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
    showResponseModal: false,
    response: ``,
    responseStatus: 0,
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
    openFormModal(state, id=state.currentCityId) {
        state.showFormModal = true;
        state.currentCityId = id;
    },
    closeFormModal(state) {
        state.showFormModal = false;
    },
    openResponseModal(state, payload) {
        state.showResponseModal = true;
        state.response = payload.response;
        state.responseStatus = payload.status;
    },
    closeResponseModal(state) {
        state.showResponseModal = false;
    },
}

export const actions = {
    PostRequest({ commit }, request) {
        const url = 'http://hh.autodrive-agency.ru/test-tasks/front/task-7/';
        axios.post(url, request)
          .then(response => {
            commit('openResponseModal', {response: response.data, status: response.status})
          })
          .catch(error => {
            commit('openResponseModal', {response: `<p>Неверный запрос</p>`, status: 400})
          });
    }
}