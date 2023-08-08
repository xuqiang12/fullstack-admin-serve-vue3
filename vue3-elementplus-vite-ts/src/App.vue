<template>
  <el-config-provider :button="buttonConfig">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useTheme } from "@/hooks/useTheme";
import { ElConfigProvider } from "element-plus";

// init theme
const { initTheme } = useTheme();
initTheme();

onMounted(() => {});

// element language
// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
