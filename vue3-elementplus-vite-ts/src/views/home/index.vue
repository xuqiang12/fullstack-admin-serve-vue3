<template>
  <div class="home card">
    <element-table :columns="columns" :main-data="tableData" @open-detail="aaa" />
    <!-- <el-image-viewer :url-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" /> -->
    <!-- <el-image
      src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
      :zoom-rate="1.2"
      :initial-index="4"
      :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
      style="width: 75px; height: 55px; display: flex"
    /> -->

    <!-- <el-button v-debounce="aaa">aaa </el-button>
    <el-button v-debounce="reset">刷新</el-button>
    <el-input v-model="value" v-debounce="[aaa, `input`, 1000]" placeholder="输入框数组防抖" />
    <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" /> -->
  </div>
</template>

<script setup lang="ts" name="home">
import ElementTable from "@/components/ElementTable/index.vue";
const columns = [
  { pram: "code", label: "详情跳转", openDetail: true },
  { pram: "status", label: "开关", switch: true, disabled: false, activeValue: "1", inactiveValue: "2" },
  { pram: "url", label: "商品图片", img: true },
  { pram: "status1", label: "过滤器展示状态", funName: "isAcceptStatus" },
  { pram: "cname", label: "符号分割展示", division: true, musterPram: "arr", delimiter: "/" },
  { pram: [], label: "多个SVG按钮", btn: true },

  {
    pram: "name",
    label: "正常展示"
  },
  {
    pram: "name",
    label: "正常展示"
  },
  {
    pram: "name",
    label: "正常展示"
  }
];
const tableData: any = [
  {
    code: 123456,
    name: "徐强",
    status: "1",
    status1: "1",
    url: [
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg.search2.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2Fi3%2F394104740%2FTB2UBhSwB4lpuFjy1zjXXcAKpXa_%21%21394104740.jpg&refer=http%3A%2F%2Fg.search2.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639731533&t=5d6a47cff02f17dafc458536b0e18836",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df9b59e55b0fa80121ae0cad4326.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639731452&t=20de2fa6e437262cdb9a12df2d903bce"
    ],
    arr: [{ cname: "张三" }, { cname: "李四" }, { cname: "王五" }]
  },
  {
    code: 123456,
    name: "徐强",
    status: "9",
    status1: "9",
    url: [
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg.search2.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2Fi3%2F394104740%2FTB2UBhSwB4lpuFjy1zjXXcAKpXa_%21%21394104740.jpg&refer=http%3A%2F%2Fg.search2.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639731533&t=5d6a47cff02f17dafc458536b0e18836",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df9b59e55b0fa80121ae0cad4326.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639731452&t=20de2fa6e437262cdb9a12df2d903bce"
    ],
    arr: [{ cname: "张三" }, { cname: "李四" }, { cname: "王五" }]
  }
];
// import { ref } from "vue";

// const value = ref("");
const aaa = () => {
  console.log(11111);
};
// const reset = () => {
//   console.log("999999");
// };
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
