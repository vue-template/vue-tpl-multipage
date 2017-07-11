// import * as types from './mutation-types'
import ddb from '../assets/js/ddb/'

export const getOrderList = ({commit}, opts = {}) => {
  ddb.loading()
  return new Promise((resolve, reject) => {
    ddb.get('chartered/get_order_list', opts.data).then(res => {
      ddb.hideLoading(800)
      resolve(res)

      if (res.ret === 0) {
        commit('setOrderList', res.data.order_list)
        commit('setOrderPageInfo', res.data)
      } else {
        ddb.tips(res.msg)
      }
    }).catch(err => {
      ddb.hideLoading(800)
      reject(err)
    })
  })
}

export const getOrderInfo = ({commit}, opts = {}) => {
  ddb.loading()
  return new Promise((resolve, reject) => {
    ddb.get('chartered/get_order_detail', opts.data).then(res => {
      ddb.hideLoading(800)
      resolve(res)

      if (res.ret === 0) {
        commit('setOrderInfo', res.data)
      } else {
        // ddb.tips(res.msg)
        ddb.notify(res.msg)
      }
    }).catch(err => {
      ddb.hideLoading(800)
      reject(err)
    })
  })
}

// export const getOfferList = ({commit}, opts = {}) => {
//   ddb.get('chartered/company_offer_list', opts.data).then(res => {
//     opts.done && opts.done(res)
//     if (res.ret === 0 && res.data) {
//       commit('setOfferList', res.data.offer_list)
//     } else {
//       ddb.tips(res.msg)
//     }
//   })
// }

export const getOfferList = ({commit}, opts = {}) => {
  return new Promise((resolve, reject) => {
    ddb.get('chartered/company_offer_list', opts.data).then(res => {
      resolve(res)

      if (res.ret === 0 && res.data) {
        commit('setOfferList', res.data.offer_list)
      } else {
        ddb.tips(res.msg)
      }
    })
  })
}

export const setPayInfo = ({state, commit, dispatch}, opts = {}) => {
  commit('setPayInfo', opts.data)
  // if (!state.goodsList.length) {
  //   dispatch('getGoods', {api, data})
  // }
}
