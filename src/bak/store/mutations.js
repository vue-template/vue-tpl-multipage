// import * as types from './mutation-types'

export default {
  // setOrderList(state, data) {
  //   state.query = Object.assign(state.query, data)
  // },
  setOrderList(state, data) {
    state.orderList = data || []
  },
  setOrderPageInfo(state, data) {
    state.orderPageInfo = {
      pageCount: data.total_count,
      pageIndex: data.cur_page_index,
      pageSize: data.cur_page_size
    }
  },
  setOrderInfo(state, data) {
    state.orderInfo = data || {}
  },
  setOfferList(state, data) {
    state.offerList = data || []
  },
  setPayInfo(state, data) {
    state.payInfo = data
  }
}
