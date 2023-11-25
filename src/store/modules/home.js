// import mockRequest from "@/utils/mockRequest";
import server from "@/utils/axios";

const state = { list: {} };
const mutations = {
  GETDATA(state, list) {
    state.list = list;
  },
};
const actions = {
  // 发请求
  async getDate({ commit }) {
    let result = await server.get("/home/list");
    // console.log(result);
    if (result.code == 200) {
      commit("GETDATA", result.data);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
