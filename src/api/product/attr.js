// 平台属性
import server from "@/utils/axios";

// 获取一级分类数据接口
// /admin/product/getCategory1
export const reqCategory1List = () => {
  return server({
    url: "/admin/product/getCategory1",
  });
};
// 获取二级分类数据接口
// /admin/product/getCategory3/{category1Id}
export const reqCategory2List = (category1Id) => {
  return server({
    url: "/admin/product/getCategory2/" + category1Id,
  });
};
// 获取三级分类数据接口
// /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => {
  return server({
    url: "/admin/product/getCategory2/" + category2Id,
  });
};


// 获取平台的接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => {
  return server({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  });
};

// 添加属性 与属性值接口
// /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => {
  return server({
    url: "/admin/product/saveAttrInfo",
    method: "post",
    data
  });
}

// 删除品牌
// /admin/product/deleteAttr/{attrId}
export const deleteAttr = (attrId) => {
  return server({
    url: `/admin/product/deleteAttr/${attrId}`,
    method:"delete"
  });
};