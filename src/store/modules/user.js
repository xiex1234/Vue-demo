import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, anyRoutes, asyncRoutes, constantRoutes } from "@/router";
// import { use } from "echarts";
import router from "@/router";
const getDefaultState = () => {
  return {
    // token: getToken(),
    // 获取token
    token: getToken(),
    // 存储用户名
    name: "",
    // 存储用户头像
    avatar: "",
    // 菜单标记
    routes: [],
    // 角色信息
    roles: [],
    // 按钮权限的信息
    buttons: [],
    // 对比之后的路由信息
    resultAsyncRoutes: [],
    resultAllRoutes: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name;
    // 用户头像
    state.avatar = userInfo.avatar;
    // 菜单权限比较
    state.routes = userInfo.routes;
    // 按钮权限标记
    state.buttons = userInfo.buttons;
    // 角色信息
    state.roles = userInfo.roles;
  },
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    // vuex保存的路由信息
    state.resultAsyncRoutes = asyncRoutes;
    state.resultAllRoutes = constantRoutes.concat(
      state.resultAsyncRoutes,
      anyRoutes
    );
    router.addRoutes(state.resultAllRoutes)
  },
};

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    // console.log(userInfo);
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    let result = await login({ username: username.trim(), password: password });
    // console.log(result);

    if (result.code === 20000) {
      commit("SET_TOKEN", result.data.token);
      // console.log(result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          // console.log(response);
          const { data } = response;
          // 存储用户全部的信息
          commit("SET_USERINFO", data);
          commit(
            "SET_RESULTASYNCROUTES",
            computedAsyncRoutes(asyncRoutes, data.routes)
          );
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      // console.log(resolve);
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // console.log(asyncRoutes, routes);
  console.log(routes);
  return asyncRoutes.filter((item) => {
    console.log(item);
    if (routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true;
    }
  });
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
