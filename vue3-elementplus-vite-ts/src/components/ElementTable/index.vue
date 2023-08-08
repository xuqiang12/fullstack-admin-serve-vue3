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
      <el-table-column
        min-width="100"
        :width="item.width ? item.width : 'auto'"
        :label="item.label"
        :align="item.align ? item.align : 'center'"
        :prop="item.img ? 'img' : ''"
        :fixed="item.fixed"
      >
        <template #header="{ column, $index }">
          <slot :row="column" :index="$index" :label="item.label" :name="item.pram + 'Title'">
            <el-tooltip :content="item.label" placement="top" :disabled="item.label.length < 5">
              <div>
                {{ item.label }}
                <slot :row="column" :index="$index" :label="item.label" :name="item.pram + 'Icon'">
                  <el-popover v-if="item.headerTips" placement="top" trigger="hover">
                    <div v-for="(tip, i) in item.headerTips" :key="i" style="display: flex; align-items: center">
                      <div class="column-container" :style="{ background: `var(--${tip.color})` }"></div>
                      {{ tip.tips }}
                    </div>
                    <!-- <i #slot="reference" class="el-icon-question" style="font-size: 15px; color: #2bb1f5; cursor: pointer" /> -->
                  </el-popover>
                </slot>
              </div>
            </el-tooltip>
          </slot>
        </template>
        <template #default="{ row, $index }">
          <slot :row="row" :index="$index" :name="item.pram">
            <!-- 跳转详情 -->
            <el-link
              v-if="item.openDetail"
              :underline="false"
              type="primary"
              class="text-along"
              style="display: block"
              @click="openDetail(row)"
            >
              {{ row[item.pram] }}
            </el-link>
            <!-- 开关模块 -->
            <el-switch
              v-else-if="item.switch"
              v-model="row[item.pram]"
              :active-color="item.activeColor ? item.activeColor : '#4778E5'"
              :active-value="item.activeValue ? item.activeValue : 1"
              :inactive-value="item.inactiveValue ? item.inactiveValue : 0"
              :inactive-color="item.inactiveColor ? item.inactiveColor : '#E5E5E5'"
              :disabled="evals(row, item.disabled)"
              @change="setStatus(row, row[item.pram])"
            />
            <!-- 图片模块 -->
            <div v-else-if="item.img" @click="previewPic(row[item.pram])">
              <el-image
                v-if="!row[item.pram] || row[item.pram].length < 1"
                :src="nopicture"
                style="width: 75px; height: 55px; display: inline-flex"
              />
              <el-badge
                v-else
                :value="imgData(row[item.pram], item.key).length"
                :hidden="imgData(row[item.pram], item.key).length < 2"
                class="item"
                :max="9"
              >
                <el-image
                  @click="previewPic(row[item.pram])"
                  :src="imgData(row[item.pram], item.key)[0]"
                  style="width: 75px; height: 55px; display: flex"
                />
              </el-badge>
            </div>
            <!-- 按钮模块 -->
            <div v-else-if="item.btn">
              <div v-for="(btn, btnindex) of btnData(item)" :key="btnindex" ref="btn" style="display: inline-block">
                <slot :row="row" :index="$index" :name="btn.btnlable">
                  <!-- <div v-if="translate(eval(row,btn.show))"> -->
                  <div v-if="btnVisible(row, btn)">
                    <div v-if="btn.btnType === 'svgIcon' || btn.btnType === 'icon'">
                      <el-link
                        v-if="btn.btnType === 'svgIcon'"
                        style="font-size: 18px"
                        :style="evals(row, btn.disabled) ? '' : 'color:#1890ff'"
                        :underline="false"
                        :disabled="evals(row, btn.disabled)"
                        @click.stop="handleButton(btn, row, $index)"
                      >
                        <!-- <SvgIcon name="xianxingdaoyu" /> -->

                        <!-- <svg-icon :style="evals(row, btn.style)" :icon-class="btn.btnlable" /> -->
                      </el-link>
                      <el-link
                        v-else
                        :underline="false"
                        :disabled="evals(row, btn.disabled)"
                        :style="evals(row, btn.disabled) ? '' : 'color:#1890ff'"
                        @click.stop="handleButton(btn, row, $index)"
                      >
                        <i style="font-size: 18px; color: #1890ff" :style="evals(row, btn.style)" :class="btn.btnlable"></i>
                      </el-link>
                    </div>
                    <el-button
                      v-else-if="btn.btnType === 'routine'"
                      :style="{ marginRight: btnData(item).length > btnindex + 1 ? '10px' : '0' }"
                      size="small"
                      :type="evals(row, btn.type)"
                      plain
                      :disabled="evals(row, btn.type) === 'info'"
                      @click="handleButton(btn, row, $index)"
                    >
                      {{ evals(row, btn.btnlable) }}
                    </el-button>
                    <el-link
                      v-else
                      :underline="false"
                      type="primary"
                      :disabled="evals(row, btn.disabled)"
                      :style="evals(row, item.style)"
                      @click.stop="handleButton(btn, row, $index)"
                    >
                      {{ btn.btnlable }}
                    </el-link>
                    <div
                      v-if="!(btn.btnType === 'svgIcon' || btn.btnType === 'icon' || btn.btnType === 'routine')"
                      style="display: inline-block; color: #1890ff"
                    >
                      {{
                        btnData(item)[btnindex + 1] &&
                        btnVisible(row, btnData(item)[btnindex + 1]) &&
                        btnData(item).length > btnindex + 1
                          ? "|"
                          : ""
                      }}
                    </div>
                  </div>
                </slot>
              </div>
            </div>
            <!-- 气泡显示 -->
            <!-- <div
              v-else-if="item.bubble"
              :class="{ 'text-along': translate(item.tooltip) }"
              style="display: flex; flex-direction: row; justify-content: center; align-items: center"
            >
              <slot :row="row" :index="$index" :label="item.label" :name="item.pram + 'left'" />
              <el-popover
                :placement="item.placement ? item.placement : 'bottom'"
                :disabled="evals(row, item.disabled)"
                :trigger="item.trigger ? item.trigger : 'click'"
              >
                <div v-for="(popover, bindex) of bubbleData(item)" :key="bindex">
                  <element-table
                    v-if="unstateAttrs[popover.label] && popover.type === 'table'"
                    :columns="unstateAttrs[popover.label] || []"
                    :main-data="row[popover.data] || []"
                    :showcheckbox="false"
                  />
                  <custom-form
                    v-if="unstateAttrs[popover.label] && popover.type === 'form'"
                    class="bubble_form"
                    :columns="unstateAttrs[popover.label] || []"
                    :form-data="popover.data ? row[popover.data] : row || {}"
                  />
                  <div v-if="popover.type === 'tips'">
                    <div>{{ popover.label }}:{{ row[popover.data] }}</div>
                  </div>
                </div>
                <el-link slot="reference" :underline="false" type="primary" :style="evalStyle(row, item.style)">
                  {{ new RegExp("[\\u4E00-\\u9FFF]+", "g").test(item.pram) ? item.pram : row[item.pram] }}
                </el-link>
              </el-popover>
              <slot :row="row" :index="$index" :label="item.label" :name="item.pram + 'right'" />
            </div> -->
            <!-- 过滤展示模块 -->
            <div v-else-if="item.funName">
              <div
                v-if="item.iconColor"
                class="column-container"
                :style="{ background: `var(--${evals(row, item.iconColor)})` }"
              ></div>
              {{ getFileter(item.funName, row[item.pram]) }}
            </div>
            <!-- 通过符号分割展示 -->
            <div v-else-if="item.division" :class="{ 'text-along': translate(item.tooltip) }">
              {{ divisionData(row[item.pram], item.key, item.delimiter) }}
            </div>
            <!-- 拼接展示 -->
            <div v-else-if="item.splice" :style="evalStyle(row, item.style)" :class="{ 'text-along': translate(item.tooltip) }">
              {{ spliceData(item, row) }}
            </div>
            <div v-else class="text-along">
              {{ row[item.pram] }}
            </div>
          </slot>
        </template>
        <!-- 无数据 -->
      </el-table-column>
    </template>
    <template #empty>
      <div class="table-empty">
        <slot name="empty">
          <img src="@/assets/images/notData.png" alt="notData" />
          <div>暂无数据</div>
        </slot>
      </div>
    </template>
  </el-table>
  <el-image-viewer v-if="imgList.length > 0" :url-list="imgList" @close="imgList = []" />
</template>

<script lang="ts" setup>
import { computed, ref, toRaw } from "vue";
import { useRoute } from "vue-router";
import { filterData } from "@/utils/filters";
import { HEADER_STYLE } from "./utils";
// import SvgIcon from "@/components/SvgIcon/index.vue";

// const headerStyle = { background: "#FAFAFA", color: "rgba(0,0,0,0.85)" };

const nopicture = "@/assets/images/nopicture.png";
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
const openDetail = (row: any) => {
  emits("openDetail", row);
};
const evals = (row: any, condition: any) => {
  // 将字符串当作代码块执行
  if (row) {
    let pattern = new RegExp("[<>=+-]");
    const stringVariable = pattern.test(condition) ? condition : JSON.stringify(condition);
    // 方法一
    // eslint-disable-next-line no-eval
    return eval(stringVariable);
    // 方法二
    // const func = new Function('row', `return ${stringVariable}`)
    // return func(row)
  }
};
// 开关方法
const setStatus = (row: any, status: any) => {
  emits("setStatus", row, status);
};
const imgData = (item: any, key: any) => {
  // 重构图片数据格式
  if (Array.isArray(item) && item.length > 0) {
    const exhibit = typeof item[0] === "string" || !key ? item : item.map(item => (item[key] ? item[key] : undefined));
    return exhibit;
  } else if (typeof item === "string") {
    return [item];
  } else {
    return [""];
  }
};
const btnData = (item: any) => {
  // 重构按钮数据格式
  if (Array.isArray(item.pram)) {
    return item.pram;
  } else if (typeof item.pram === "string") {
    return [
      {
        ...item,
        btnlable: item.pram,
        flag: item.flag,
        btnType: item.btnType
      }
    ];
  }
};
const btnVisible = (row: any, btn: any) => {
  if (btn.visible === undefined) {
    return true;
  } else if (btn.visible !== undefined && btn.visible && row) {
    let pattern = new RegExp("[<>=+-]");
    // eslint-disable-next-line no-eval
    return eval(pattern.test(btn.visible) ? btn.visible : JSON.stringify(btn.visible));
  }
};
// 操作按钮方法
const handleButton = (btn: any, row: any, index: any) => {
  if (btn.file) {
    previewFile(btn.file.split(","), row);
  }
  console.log(index);
  // this.$emit("handleButton", btn.flag, row, index);
};
const addTdClass = (row: any) => {
  // 给图片列添加类名
  if (row.column.property === "img") {
    return "img-column";
  }
};
let imgList = ref([]);
const previewPic = (item: any) => {
  imgList.value = item;
};
const getFileter = (funName: any, code: any) => {
  // debugger;
  // console.log("filterData.age ", (filterData as any)[funName][code], code);
  // console.log(this.$options.filters['isAcceptStatus1'](code, this.$options.filters['UPLOAD_FILE_FLAG']), this.$options.filters['UPLOAD_FILE_FLAG'])
  // if (JSON.stringify(code) === '""' || JSON.stringify(code) === "null" || JSON.stringify(code) === "undefined") {
  //   return "";
  // } else {
  //   return this.$options.filters["isAcceptStatus1"](code, "name");
  // }
  return (filterData as any)[funName][code] || "数据异常";
};
const previewFile = (pram: any, row: any) => {
  // 格式为['行参数','文件地址','文件名称']
  if (!row[pram[0]]) {
    // this.$message.error("暂无文件可以预览");
    return;
  }
  if (pram.length === 1) {
    // 长度为一表示是字符串地址
    // this.dialogState = { show: true, url: row[pram[0]] };
  } else if (pram.length === 2) {
    // 长度为2表示对象或数组
    if (Array.isArray(row[pram[0]])) {
      // 数组使用批量预览
      // this.fileList = row[pram[0]].map(item => {
      //   return { url: item[pram[1]], name: item[pram[1]] };
      // });
      // this.visiblePreview = true;
    } else if (row[pram[0]] instanceof Object) {
      // 对象使用单个预览
      // this.dialogState = { show: true, url: row[pram[0]][pram[1]] };
    }
  } else if (pram.length === 3) {
    // 长度为3表示需要展示名字和地址
    if (Array.isArray(row[pram[0]])) {
      // 数组使用批量预览
      // this.fileList = row[pram[0]].map(item => {
      //   return { url: item[pram[1]], name: item[pram[2]] };
      // });
      // this.visiblePreview = true;
    }
  }
};
const translate = (value: any) => {
  // 转译，传参为true或者不传都为true 传参为false时为false
  return !(JSON.stringify(value) === "false");
};
const evalStyle = (_row: any, condition = {}) => {
  const evalStyle = {};
  console.log(condition);
  // Object.keys(condition).forEach(key => {
  //   this.$set(evalStyle, key, this.eval(row, condition[key]));
  //   return 1;
  // });
  return evalStyle;
};
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
const spliceData = (item: any, value: any) => {
  // 重构拼接数据格式
  if (item.pram !== "" && item.pram !== "undefined") {
    const delimiter = (item.spliceType || "").split(",");
    const params = item.pram.split(item.spliceType && item.spliceType.length > 0 ? delimiter[0] : "/");
    const exhibit = params.map((items: any) => (value[items] ? value[items] : ""));
    return exhibit.join(delimiter.length > 1 ? delimiter[1] : "/");
  }
};
// ?暂时没有做
const divisionData = (arr = [], key: any, flag: any) => {
  // 重构分割数据格式
  const arr1 = arr.filter(item => item !== null && item !== "" && item !== undefined);
  if (Array.isArray(arr1) && arr1.length > 0) {
    const exhibit = typeof arr1[0] === "string" || !key ? arr1 : arr1.map(item => (item[key] ? item[key] : undefined));
    return exhibit.join(flag || "、");
  }
};
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
