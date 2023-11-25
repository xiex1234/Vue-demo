// 获取sku的接口
import server from "@/utils/axios";

// 获取图片接口
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => {
  return server({
    url: `/admin/product/spuImageList/${spuId}`,
    method:"get"
  });
}

// 获取销售属性的数据
// /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => {
  return server({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method:'get'
  });
};

// 获取平台属性的数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return server({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
  });
};

// /admin/product/saveSkuInfo
// {
//   "category3Id": 0,
//   "createTime": "2023-01-14T04:20:16.066Z",
//   "id": 0,
//   "isSale": 0,
//   "price": 0,
//   "skuAttrValueList": [
//     {
//       "attrId": 0,
//       "attrName": "string",
//       "id": 0,
//       "skuId": 0,
//       "valueId": 0,
//       "valueName": "string"
//     }
//   ],
//   "skuDefaultImg": "string",
//   "skuDesc": "string",
//   "skuImageList": [
//     {
//       "id": 0,
//       "imgName": "string",
//       "imgUrl": "string",
//       "isDefault": "string",
//       "skuId": 0,
//       "spuImgId": 0
//     }
//   ],
//   "skuName": "string",
//   "skuSaleAttrValueList": [
//     {
//       "id": 0,
//       "saleAttrId": 0,
//       "saleAttrName": "string",
//       "saleAttrValueId": 0,
//       "saleAttrValueName": "string",
//       "skuId": 0,
//       "spuId": 0
//     }
//   ],
//   "spuId": 0,
//   "tmId": 0,
//   "weight": "string"
// }


// 添加SKU
// /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => {
  // console.log(skuInfo);
  return server({
    url: `/admin/product/saveSkuInfo`,
    method: "post",
    data: skuInfo,
  });
}

// 获取SKU列表数据的接口
// /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => {
  return server({
    url: `/admin/product/findBySpuId/${spuId}`,
  });
}


//sku列表
// /admin/product/list/{page}/{limit}
export const reqSkuLists = (page, limit) => {
  return server({
    url: `/admin/product/list/${page}/${limit}`,
  });
}

// 上架
// /admin/product/onSale/{skuId}
export const reqSale = (skuId) => {
  return server({
    url: `/admin/product/onSale/${skuId}`,
  });
}

// 下架
// /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => {
  return server({
    url: `/admin/product/cancelSale/${skuId}`,
  });
}

// 获取SKU详情的接口
// /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId) => {
  return server({
    url: `/admin/product/getSkuById/${skuId}`,
  });
}

