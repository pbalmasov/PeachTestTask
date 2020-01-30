export const state = () => ({
  items: [],
  sections: []
})

export const mutations = {
  setItems(state, items) {
    state.items = items
  },
  setSections(state, sections) {
    state.sections = sections
  }
}

export const getters = {
  getItemsBySectionId: state => id =>
    state.items.filter(item => item.sectionId === String(id)),
  getItemByCode: state => code => state.items.find(item => item.code === code),
  getSectionByCode: state => code =>
    state.sections.find(section => section.code === code)
}

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const {
        data: { items, sections }
      } = await this.$axios.get('/api/mock.php')
      commit('setItems', Object.values(items))
      commit('setSections', Object.values(sections))
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }
  }
}
