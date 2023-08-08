<template>
  <el-table
    ref="table"
    :border="border"
    :data="mainData"
    :row-key="getRowKey"
    :cell-class-name="addTdClass"
    :header-cell-style="HEADER_STYLE"
    @row-dblclick="handledblclick"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    header-cell-class-name="header-cell-class"
    highlight-current-row
    height="calc(100% - 0px)"
    class="custom-element-table"
  >
    <!-- :row-key="getRowKey" -->
    <template v-for="(item, index) of afterMergerColumns" :key="index">
      111
      <TableColumn :column="item" />
    </template>
  </el-table>
  <el-image-viewer v-if="imgList.length > 0" :url-list="imgList" @close="imgList = []" />
</template>

<script lang="ts" setup>
import { computed, ref, toRaw } from "vue";
import { useRoute } from "vue-router";
import { HEADER_STYLE } from "./utils";
import TableColumn from "./components/TableColumn.vue";

// const headerStyle = { background: "#FAFAFA", color: "rgba(0,0,0,0.85)" };

export interface ProTableProps {
  columns: any[];
  mainData: any[];
  rowKey?: string;
  border?: boolean;
}
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  mainData: () => [],
  rowKey: "id",
  border: true
});
// 绑定行id
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRowKey = (_row: any) => {
  // debugger;
  console.log(toRaw(_row));
  // if (Array.isArray(props.mainData)) {
  //   let arr = unrepeated(props.mainData, props.rowKey); // 根据唯一标识去重
  //   return arr.length === props.mainData.length ? row[props.rowKey] : row.__ob__.dep.id;
  // }
  return "id";
};

const emits = defineEmits(["handleButton", "handleCurrentChange", "handleSelectionChange", "openDetail", "setStatus"]);

const afterMergerColumns = computed(() => {
  const oldColumns = props.columns;
  const receiveBtn: any = useRoute().meta || [];
  const rbacBtn: any = [];
  const originalBtn = props.columns.filter(item => item.btn || item.switch);
  originalBtn.forEach(element => {
    if (Array.isArray(element.pram)) {
      if (element.role) {
        const visible = element.pram.filter((item: any) => receiveBtn.some((routebtn: any) => routebtn.type === item.flag));
        if (visible.length > 0) rbacBtn.push({ ...element, pram: visible });
      } else if (element.role === undefined) {
        const visible = element.pram.filter(
          (item: any) => (item.role && receiveBtn.some((routebtn: any) => routebtn.type === item.flag)) || !item.role
        );
        if (visible.length > 0) rbacBtn.push({ ...element, pram: visible });
      } else {
        rbacBtn.push({ ...element });
      }
    } else {
      if (element.role) {
        if (receiveBtn.some((item: any) => item.type === element.flag)) rbacBtn.push({ ...element });
      } else {
        rbacBtn.push({ ...element });
      }
    }
  });
  // 优化上一版本按钮会叠加在展示后面
  const exhibit: any = [];
  oldColumns.forEach(columns => {
    if (!columns.btn && !columns.switch) {
      exhibit.push(columns);
    } else {
      if (rbacBtn.some((item: any) => item.label === columns.label))
        exhibit.push(rbacBtn.find((item: any) => item.label === columns.label));
    }
  });
  // return [...exhibit, ...rbacBtn]
  return exhibit;
});
// ? 还没写完的当前行双击 2022-12-09
const handledblclick = (row: any) => {
  // 双击行事件
  emits("handleButton", "dbclick", row);
};
const handleCurrentChange = (row: any) => {
  emits("handleCurrentChange", row);
};
const handleSelectionChange = (row: any) => {
  emits("handleSelectionChange", row);
};

const addTdClass = (row: any) => {
  // 给图片列添加类名
  if (row.column.property === "img") {
    return "img-column";
  }
};
let imgList = ref([]);

// const unrepeated = (data: any, parameter: any) => {
//   // 数组对象去重
//   let temp: any = {};
//   let tempData = JSON.parse(JSON.stringify(data)); // 深拷贝原来的数据
//   let newData = tempData.reduce((pre: any, cur: any) => {
//     if (!temp[cur[parameter]] && cur[parameter]) {
//       temp[cur[parameter]] = true;
//       pre.push(cur);
//     }
//     return pre;
//   }, []);
//   return newData;
// };
// const aa = () => {
//   emit("onclick", 111);
// };
// console.log(props);
</script>
<style lang="scss" scoped>
.text-along {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-link {
  padding: 0px 5px;
}
:deep(.el-table_3_column_21) .is-center {
  padding: 0;
}
.custom-element-table {
  height: 100%;
  overflow: auto !important;
  //图片列样式
  :deep(.img-column) {
    padding: 0;
    .cell {
      padding: 0;
      .item .el-badge__content {
        transform: translateY(0%) translateX(50%);
      }
    }
  }
  :deep(.el-table__body-wrapper) {
    height: calc(100% - 45px) !important;
    overflow-y: auto;
  }
  :deep(.el-table__fixed-right) {
    height: calc(100% - 10px) !important;
  }
  :deep(::-webkit-scrollbar) {
    /*滚动条里面小方块*/
    width: 3px;
    height: 8px;
  }
  :deep(.cell) {
    word-break: keep-all !important;
    white-space: nowrap !important;
    .el-tooltip {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
  }
  :deep(::-webkit-scrollbar-thumb) {
    /*滚动条里面小方块*/
    border-radius: 5px;
    // -webkit-box-shadow: inset 0 0 5px rgba(1, 21, 48, 1);
    // box-shadow: inset 0 0 5px rgba(1, 21, 48, 1);
    background: #c1c8ce;
  }
  :deep(::-webkit-scrollbar-track) {
    /*滚动条里面轨道*/
    // -webkit-box-shadow: inset 0 0 5px rgba(14, 54, 94, 0.2);
    // box-shadow: inset 0 0 5px rgba(14, 54, 94, 0.2);
    border-radius: 5px;
    background: #fff;
  }
  :deep(.header-cell-class) {
    text-align: center !important;
  }
}

.scrollbar-view {
  height: 100%;
  max-height: calc(100%);
  overflow-y: auto;
  :deep(.el-scrollbar__wrap) .el-scrollbar__view {
    height: 100%;
  }
}
.specialItem {
  :deep(.el-button--success).is-plain {
    color: #26c2bc;
    background: #fff;
    border-color: #d3f4f2;
  }
  :deep(.el-button--info).is-plain {
    color: #939399;
    background: #fff;
    border-color: #d3d4d6;
  }
}
.routineBtn {
  background: #fff;
}
.clearradio {
  :deep(.el-radio__label) {
    display: none;
  }
}
.bubble_form {
  :deep(.el-form) {
    .el-col {
      padding-bottom: 0 !important;
      .formtitle {
        width: 80px !important;
        min-width: 80px !important;
      }
    }
  }
}
.column-container {
  //状态小圆点的基本样式
  width: 6px;
  height: 6px;
  display: inline-block;
  background: #f5222d;
  border-radius: 50%;
  margin-right: 3px;
}
</style>
