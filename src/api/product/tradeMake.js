// 这个模块主要获取的是品牌管理的数据的模块
import server from "@/utils/axios";
import request from "@/utils/request";



// 获取品牌接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  server({ url: `/admin/product/baseTrademark/${page}/${limit}` });

// 处理添加品牌的操作
// /admin/product/baseTrademark/save  post

// 修改品牌
// /admin/product/baseTrademark/update put

export const reqAddOrUpdateTradeMark = (tradeMake) => {
  // 代表的是修改
  if (tradeMake.id) {
    return server({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMake,
    });
  } else {
    // 新增品牌
    return server({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMake,
    });
  }
};



// 删除品牌的接口
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMake = (id) => {
  // console.log(data);
  return server({
    method: "delete",
    url: `/admin/product/baseTrademark/remove/${id}`,
    // params:data
  });
}