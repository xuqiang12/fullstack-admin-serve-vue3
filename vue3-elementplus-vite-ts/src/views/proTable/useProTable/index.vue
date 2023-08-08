<template>
  <div class="home card">
    <ElementTable />
    <!-- <el-button v-debounce="aaa">aaa </el-button>
    <el-button v-debounce="reset">刷新</el-button>
    <el-input v-model="value" v-debounce="[aaa, `input`, 1000]" placeholder="输入框数组防抖" />
    <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" /> -->
  </div>
</template>

<script setup lang="ts" name="home">
import ElementTable from "@/components/ElementTable/index.vue";
// import { ref } from "vue";

// const value = ref("");
// const aaa = () => {
//   console.log(11111);
// };
// const reset = () => {
//   console.log("999999");
// };
</script>

<style scoped lang="scss"></style>
