const Mock = require("mockjs");

const data = require('./data.json')

// module.exports = [
//   {
//     url: '/home/list',
//     type: 'get',
//     Response: config => {
//       const items = data.items
//       return {
//         code: 20000,
//         data
//       }
//     }
//   }
// ]
Mock.mock("/home/list",{code:200,data});