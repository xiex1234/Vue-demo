import server from "@/utils/axios";

// 获取SPU列表数据的接口
///admin/product/{page}/{limit} get 
export const reqSpuList = (page, limit, category3Id) => {
  return server({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params:{category3Id}
  });
}

// /admin/product/getSpuById/{spuId}
// 获取SPU信息
export const reqSpu = (spuId) => {
  return server({
    url: `/admin/product/getSpuById/${spuId}`,
  });
}

// /admin/product/baseTrademark/getTrademarkList
// 获取品牌的信息
export const reqTradMarkList = () => {
  return server({
    url: `/admin/product/baseTrademark/getTrademarkList`,
  });
}

// /admin/product/spuImageList/{spuId}
// 获取spu图片的接口
export const reqSpuImageList = (spuId) => {
  return server({
    url: `/admin/product/spuImageList/${spuId}`,
  });
};
// /admin/product/baseSaleAttrList
// 获取平台全部销售属性----整个平台销售属性一共三个
export const reqBaseSaleAttrList = () => {
  return server({
    url: `/admin/product/baseSaleAttrList`,
  });
}


// {
//   "category3Id": 0,
//   "description": "string",
//   "id": 0,
//   "spuImageList": [
//     {
//       "id": 0,
//       "imgName": "string",
//       "imgUrl": "string",
//       "spuId": 0
//     }
//   ],
//   "spuName": "string",
//   "spuSaleAttrList": [
//     {
//       "baseSaleAttrId": 0,
//       "id": 0,
//       "saleAttrName": "string",
//       "spuId": 0,
//       "spuSaleAttrValueList": [
//         {
//           "baseSaleAttrId": 0,
//           "id": 0,
//           "isChecked": "string",
//           "saleAttrName": "string",
//           "saleAttrValueName": "string",
//           "spuId": 0
//         }
//       ]
//     }
//   ],
//   "tmId": 0
// }


// 修改SPU||添加SPU：对于修改或者添加，携带的参数是一样的，唯一的区别就是携带的参数是否带id
export const reqAddorUpdateSpu = (spuInfo) => {
  // 携带的参数带有id----修改spu
  if (spuInfo.id) {
    return server({
      url: `/admin/product/updateSpuInfo`,
      method: "post",
      data:spuInfo
    });
  } else {
    // 携带的参数不带id---添加SPU
    return server({
      url: `/admin/product/saveSpuInfo`,
      method: 'post',
      data:spuInfo
    });
  }
}


// /admin/product/deleteSpu/{spuId}
// 删除spu
export const reqDeleteSpu = (spuId) => {
  return server({
    url: `/admin/product/deleteSpu/${spuId}`,
    method:"delete"
  });
}