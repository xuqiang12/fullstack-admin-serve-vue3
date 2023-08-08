<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="tsx" name="TableColumn">
defineProps<{ column: any }>();
import { useSlots } from "vue";
const slots = useSlots();
const RenderTableColumn = (item: any) => {
  return (
    <>
      (
      <el-table-column prop="date" label="Date" align={item.align ?? "center"}>
        {{
          default: (scope: any) => {
            "111";
            {
              {
                scope;
              }
            }
          },
          header: (scope: any) => {
            if (item.headerRender) return item.headerRender(scope);
            if (slots[`123`]) return slots[`456`]!(scope);
            return item.label;
          }
        }}
      </el-table-column>
      )
    </>
  );
};
</script>
