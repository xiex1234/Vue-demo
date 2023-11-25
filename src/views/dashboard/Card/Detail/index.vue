<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <svg t="1673930575579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2684" width="16" height="16"><path d="M512 65.984C266.048 65.984 65.984 266.048 65.984 512S266.048 958.016 512 958.016 958.016 757.952 958.016 512 757.952 65.984 512 65.984zM544 736c0 17.696-14.304 32-32 32s-32-14.304-32-32l0-288c0-17.696 14.304-32 32-32s32 14.304 32 32L544 736zM512 352c-26.496 0-48-21.536-48-48C464 277.472 485.504 256 512 256s48 21.472 48 48C560 330.464 538.496 352 512 352z" p-id="2685" fill="#cdcdcd"></path></svg>
      </svg>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Detail",
  props:['title','count']
};
</script>
<style scoped>
.card-header{
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
  font-size: 16px;
}
.card-content{
  font-size: 30px;
  padding: 10px 0px;
}
.card-charts{
  height: 30px;
}
.card-footer{
  padding: 10px 0;
  border-top: 1px solid #d9d9d9;
}

</style>