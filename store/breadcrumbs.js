// class Bread {
//   constructor(text, disabled, href) {
//     this.text = text
//     this.disabled = disabled
//     this.href = href
//   }
// }
//
// export const state = () => ({
//   breadcrumbs: [
//     {
//       text: 'Dashboard',
//       disabled: false,
//       href: 'breadcrumbs_dashboard',
//     },
//     {
//       text: 'Link 1',
//       disabled: false,
//       href: 'breadcrumbs_link_1',
//     },
//     {
//       text: 'Link 2',
//       disabled: true,
//       href: 'breadcrumbs_link_2',
//     },
//   ]
// })
//
// export const mutations = {
//   createBreadcrumbs(state, payload) {
//     state.breadcrumbs.push(payload)
//   },
//   loadBreadcrumbs(state, payload) {
//     state.breadcrumbs = payload
//   },
// }
//
// export const actions = {
//   async pushBreadcrumbs({commit}, payload) {
//     try {
//       const newBread = new Bread(
//         payload.text,
//         payload.disabled,
//         payload.href,
//       )
//       commit("createBreadcrumbs", {newBread})
//     } catch (e) {
//       throw error
//     }
//
//   }
// }
//
// export const getters = {
//   breadcrumbs(state) {
//     return state.breadcrumbs
//   },
// }
//
// export default {
//   state,
//   mutations,
//   actions,
//   getters,
// }