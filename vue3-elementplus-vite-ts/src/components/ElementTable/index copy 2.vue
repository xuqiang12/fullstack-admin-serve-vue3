<template>
  <div>
    <el-table
      ref="table"
      height="calc(100% - 10px)"
      style="overflow: auto"
      highlight-current-row
      :data="Array.isArray(mainData) ? mainData : []"
      :row-key="getRowKey"
      class="custom-element-table"
      header-cell-class-name="header-cell-class"
      :border="border"
      :header-cell-style="headerStyle"
      :cell-class-name="addTdClass"
      @row-dblclick="handledblclick"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showRadio" width="55" fixed="left" align="center">
        <template #default="{ row }">
          <el-radio v-model="checkedRadio" :label="row[radioFlag]" class="clearradio" @change="radioChange(row)" />
        </template>
      </el-table-column>
      <el-table-column v-if="showcheckbox" fixed="left" type="selection" :selectable="selectable" width="55" align="center" :reserve-selection="true" />
      <el-table-column v-if="showIndex" fixed="left" type="index" label="序号" width="50" align="center" />
      <template v-for="(item, index) of afterMergerColumns" :key="index">
        <el-table-column
          min-width="100"
          :width="item.width ? item.width : 'auto'"
          :label="item.label"
          :align="item.align ? item.align : 'center'"
          :prop="item.img ? 'img' : ''"
          :fixed="item.fixed"
          :show-overflow-tooltip="translate(item.tooltip)"
        >
          <template #header="{ row, $index }">
            <slot :row="row" :index="$index" :label="item.label" :name="item.pram + 'Title'">
              <el-tooltip :content="item.label" placement="top" :disabled="item.label.length < 5">
                <div>
                  {{ item.label }}
                  <slot :row="row" :index="$index" :label="item.label" :name="item.pram + 'Icon'">
                    <el-popover v-if="item.headerTips" placement="top" trigger="hover">
                      <div v-for="(tip, i) in item.headerTips" :key="i" style="display: flex; align-items: center">
                        <div class="column-container" :style="{ background: `var(--${tip.color})` }"></div>
                        {{ tip.tips }}
                      </div>
                      <!-- <i slot="reference" class="el-icon-question" style="font-size: 15px; color: #2bb1f5; cursor: pointer"></i> -->
                    </el-popover>
                  </slot>
                </div>
              </el-tooltip>
            </slot>
          </template>
          <template #default="{ row, $index }">
            <slot :row="row" :index="$index" :name="item.pram">
              <!-- 跳转详情 -->
              <el-link v-if="item.openDetail" :underline="false" type="primary" class="text-along" style="display: block" @click="openDetail(row)">
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
                :disabled="eval(row, item.disabled)"
                @change="setStatus(row, row[item.pram])"
              />
              <!-- 图片模块 -->
              <div v-else-if="item.img">
                <el-image v-if="!row[item.pram] || row[item.pram].length < 1" :src="nopicture" style="width: 75px; height: 55px" />
                <el-badge v-else :value="imgData(row[item.pram], item.key).length" :hidden="imgData(row[item.pram], item.key).length < 2" class="item" :max="9">
                  <el-image :src="imgData(row[item.pram], item.key)[0]" :preview-src-list="imgData(row[item.pram], item.key)" style="width: 75px; height: 55px; display: flex" />
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
                          :style="eval(row, btn.disabled) ? '' : 'color:#1890ff'"
                          :underline="false"
                          :disabled="eval(row, btn.disabled)"
                          @click.stop="handleButton(btn, row, $index)"
                        >
                          <svg-icon :style="eval(row, btn.style)" :icon-class="btn.btnlable" />
                        </el-link>
                        <el-link v-else :underline="false" :disabled="eval(row, btn.disabled)" :style="eval(row, btn.disabled) ? '' : 'color:#1890ff'" @click.stop="handleButton(btn, row, $index)">
                          <i style="font-size: 18px; color: #1890ff" :style="eval(row, btn.style)" :class="btn.btnlable"></i>
                        </el-link>
                      </div>
                      <el-button
                        v-else-if="btn.btnType === 'routine'"
                        :style="{ marginRight: btnData(item).length > btnindex + 1 ? '10px' : '0' }"
                        size="mini"
                        :type="eval(row, btn.type)"
                        plain
                        :disabled="eval(row, btn.type) === 'info'"
                        @click="handleButton(btn, row, $index)"
                      >
                        {{ eval(row, btn.btnlable) }}
                      </el-button>
                      <el-link v-else :underline="false" type="primary" :disabled="eval(row, btn.disabled)" :style="eval(row, item.style)" @click.stop="handleButton(btn, row, $index)">
                        {{ btn.btnlable }}
                      </el-link>
                      <div v-if="!(btn.btnType === 'svgIcon' || btn.btnType === 'icon' || btn.btnType === 'routine')" style="display: inline-block; color: #1890ff">
                        {{ btnData(item)[btnindex + 1] && btnVisible(row, btnData(item)[btnindex + 1]) && btnData(item).length > btnindex + 1 ? "|" : "" }}
                      </div>
                    </div>
                  </slot>
                </div>
              </div>
              <!-- 气泡显示 -->
              <div v-else-if="item.bubble" :class="{ 'text-along': translate(item.tooltip) }" style="display: flex; flex-direction: row; justify-content: center; align-items: center">
                <slot :row="row" :index="$index" :label="item.label" :name="item.pram + 'left'"></slot>
                <el-popover :placement="item.placement ? item.placement : 'bottom'" :disabled="eval(row, item.disabled)" :trigger="item.trigger ? item.trigger : 'click'">
                  <div v-for="(popover, bindex) of bubbleData(item)" :key="bindex">
                    <element-table v-if="unstateAttrs[popover.label] && popover.type === 'table'" :columns="unstateAttrs[popover.label] || []" :main-data="row[popover.data] || []" :showcheckbox="false" />
                    <custom-form v-if="unstateAttrs[popover.label] && popover.type === 'form'" class="bubble_form" :columns="unstateAttrs[popover.label] || []" :form-data="popover.data ? row[popover.data] : row || {}" />
                    <div v-if="popover.type === 'tips'">
                      <div>{{ popover.label }}:{{ row[popover.data] }}</div>
                    </div>
                  </div>
                  <!-- <el-link slot="reference" :underline="false" type="primary" :style="evalStyle(row, item.style)">
                    {{ new RegExp("[\\u4E00-\\u9FFF]+", "g").test(item.pram) ? item.pram : row[item.pram] }}
                  </el-link> -->
                </el-popover>
                <slot :row="row" :index="$index" :label="item.label" :name="item.pram + 'right'"></slot>
              </div>
              <!-- 过滤展示模块 -->
              <div v-else-if="item.funName" :class="{ 'text-along': translate(item.tooltip) }">
                <div v-if="item.iconColor" class="column-container" :style="{ background: `var(--${eval(row, item.iconColor)})` }"></div>
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

              <!-- 默认展示模块 -->
              <div v-else class="text-along">
                {{ row[item.pram] }}
              </div>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <preview :dialog-state="dialogState" />
    <batch-preview v-model:visible="visiblePreview" :file-list="fileList" />
  </div>
</template>
<script>
import props from "./props.js";
export default {
  name: "ElementTable",
  components: {
    preview: () => import("@/components/BaseCom/preview/index"),
    batchPreview: () => import("@/components/BaseCom/batchPreview/index"),
    customForm: () => import("@/components/BaseCom/customForm/index")
  },
  mixins: [props],
  props: {
    columns: {
      // 表头数据
      type: Array,
      default: function () {
        return [];
      }
    },
    mainData: {
      // 表格数据
      type: Array,
      default: function () {
        return [];
      }
    },
    showcheckbox: {
      // 判断是多选
      type: Boolean,
      default: true
    },
    showRadio: {
      // 判断是单选且有radio框
      type: Boolean,
      default: false
    },
    radioFlag: {
      // 单选时需要绑定一个唯一值  如果不传默认是id
      type: String,
      default: "id"
    },
    selectRadio: {
      // 单选时需要绑定一个唯一值  如果不传默认是id
      type: Number,
      default: 0
    },
    showIndex: {
      // 是否显示序号
      type: Boolean,
      default: false
    },
    border: {
      // 缓存选中行数据
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      checkedRadio: this.selectRadio,
      nopicture: require("@/assets/image/nopicture.png"),
      isloading: false, // fasle  交易完成        true  交易进行中
      headerStyle: { background: "#FAFAFA", color: "rgba(0,0,0,0.85)" },
      dialogState: { show: false, url: "" },
      fileList: [],
      visiblePreview: false
    };
  },
  computed: {
    // afterMergerColumns() { // 根据角色整合需要展示的按钮
    //   const receiveBtn = this.$route.meta.btnlist || []
    //   const rbacBtn = []
    //   const exhibit = this.columns.filter(item => !item.btn && !item.switch)
    //   const originalBtn = this.columns.filter(item => item.btn || item.switch)
    //   originalBtn.forEach(element => {
    //     if (Array.isArray(element.pram)) {
    //       if (element.role) {
    //         const visible = element.pram.filter(item => receiveBtn.some(routebtn => routebtn.type === item.flag))
    //         if (visible.length > 0) rbacBtn.push({ ...element, pram: visible })
    //       } else if (element.role === undefined) {
    //         const visible = element.pram.filter(item => (item.role && receiveBtn.some(routebtn => routebtn.type === item.flag) || !item.role))
    //         if (visible.length > 0) rbacBtn.push({ ...element, pram: visible })
    //       } else {
    //         rbacBtn.push({ ...element })
    //       }
    //     } else {
    //       if (element.role) {
    //         if (receiveBtn.some(item => item.type === element.flag)) rbacBtn.push({ ...element })
    //       } else {
    //         rbacBtn.push({ ...element })
    //       }
    //     }
    //   });
    //   return [...exhibit, ...rbacBtn]
    // }
    afterMergerColumns() {
      // 根据角色整合需要展示的按钮
      const oldColumns = JSON.parse(JSON.stringify(this.columns));
      const receiveBtn = this.$route.meta.btnlist || [];
      const rbacBtn = [];
      // const exhibit = this.columns.filter(item => !item.btn && !item.switch)
      const originalBtn = this.columns.filter(item => item.btn || item.switch);
      originalBtn.forEach(element => {
        if (Array.isArray(element.pram)) {
          if (element.role) {
            const visible = element.pram.filter(item => receiveBtn.some(routebtn => routebtn.type === item.flag));
            if (visible.length > 0) rbacBtn.push({ ...element, pram: visible });
          } else if (element.role === undefined) {
            const visible = element.pram.filter(item => (item.role && receiveBtn.some(routebtn => routebtn.type === item.flag)) || !item.role);
            if (visible.length > 0) rbacBtn.push({ ...element, pram: visible });
          } else {
            rbacBtn.push({ ...element });
          }
        } else {
          if (element.role) {
            if (receiveBtn.some(item => item.type === element.flag)) rbacBtn.push({ ...element });
          } else {
            rbacBtn.push({ ...element });
          }
        }
      });
      // 优化上一版本按钮会叠加在展示后面
      const exhibit = [];
      oldColumns.forEach(columns => {
        if (!columns.btn && !columns.switch) {
          exhibit.push(columns);
        } else {
          if (rbacBtn.some((item: any) => item.label === columns.label)) exhibit.push(rbacBtn.find((item: any) => item.label === columns.label));
        }
      });
      // return [...exhibit, ...rbacBtn]
      return exhibit;
    },
    unstateAttrs() {
      return this.$attrs;
    }
  },
  watch: {
    mainData: {
      // 监听请求是否完成
      handler() {
        this.isloading = false;
      }
    },
    selectRadio: {
      // 监听请求是否完成
      handler() {
        this.checkedRadio = this.selectRadio;
      }
    },
    deep: true,
    immediate: true // 关键
  },
  mounted() {},
  methods: {
    // 绑定行id
    getRowKey(row) {
      if (Array.isArray(this.mainData)) {
        let arr = this.unrepeated(this.mainData, this.rowKey); // 根据唯一标识去重
        return arr.length === this.mainData.length ? row[this.rowKey] : row.__ob__.dep.id;
      }
    },
    // 使用过滤器进行展示数据
    getFileter(funName, code) {
      if (JSON.stringify(code) === '""' || JSON.stringify(code) === "null" || JSON.stringify(code) === "undefined") {
        return "";
      } else {
        return this.$options.filters[funName](code);
      }
    },
    // ? 尝试优化过滤器优雅使用 2022-12-06
    //     getFileter(funName, code) {
    //   // console.log(this.$options.filters['isAcceptStatus1'](code, this.$options.filters['UPLOAD_FILE_FLAG']), this.$options.filters['UPLOAD_FILE_FLAG'])
    //   if (JSON.stringify(code) === '""' || JSON.stringify(code) === 'null' || JSON.stringify(code) === 'undefined') {
    //     return ''
    //   } else {
    //     return this.$options.filters['isAcceptStatus1'](code, 'name')
    //   }
    // },
    eval(row, condition) {
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
    },
    evalStyle(row, condition = {}) {
      const evalStyle = {};
      Object.keys(condition).forEach(key => {
        this.$set(evalStyle, key, this.eval(row, condition[key]));
        return 1;
      });
      return evalStyle;
    },
    // 开关方法
    setStatus(row, status) {
      this.$emit("setStatus", row, status);
    },
    // 操作按钮方法
    handleButton(btn, row, index) {
      if (btn.file) {
        this.previewFile(btn.file.split(","), row);
      }
      this.$emit("handleButton", btn.flag, row, index);
    },
    // ? 还没写完的当前行双击 2022-12-09
    handledblclick(row) {
      // 双击行事件
      // console.log("🚀 ~ file: index.vue:330 ~ handledblclick ~ row,event,c", row, event, c)
      this.$emit("handleButton", "dbclick", row);
    },
    previewFile(pram, row) {
      // 格式为['行参数','文件地址','文件名称']
      if (!row[pram[0]]) {
        this.$message.error("暂无文件可以预览");
        return;
      }
      if (pram.length === 1) {
        // 长度为一表示是字符串地址
        this.dialogState = { show: true, url: row[pram[0]] };
      } else if (pram.length === 2) {
        // 长度为2表示对象或数组
        if (Array.isArray(row[pram[0]])) {
          // 数组使用批量预览
          this.fileList = row[pram[0]].map(item => {
            return { url: item[pram[1]], name: item[pram[1]] };
          });
          this.visiblePreview = true;
        } else if (row[pram[0]] instanceof Object) {
          // 对象使用单个预览
          this.dialogState = { show: true, url: row[pram[0]][pram[1]] };
        }
      } else if (pram.length === 3) {
        // 长度为3表示需要展示名字和地址
        if (Array.isArray(row[pram[0]])) {
          // 数组使用批量预览
          this.fileList = row[pram[0]].map(item => {
            return { url: item[pram[1]], name: item[pram[2]] };
          });
          this.visiblePreview = true;
        }
      }
    },
    handleCurrentChange(row) {
      this.$emit("handleCurrentChange", row);
    },
    radioChange(row) {
      this.$emit("update:selectRadio", row[this.radioFlag]); // 通过vue.async实现子组件修改父组件数据
      this.$emit("radioChange", row);
    },
    handleSelectionChange(row) {
      this.$emit("handleSelectionChange", row);
    },
    openDetail(row) {
      this.$emit("openDetail", row);
    },
    translate(value) {
      // 转译，传参为true或者不传都为true 传参为false时为false
      return !(JSON.stringify(value) === "false");
    },
    btnVisible(row, btn) {
      if (btn.visible === undefined) {
        return true;
      } else if (btn.visible !== undefined && btn.visible && row) {
        console.log(this.$refs.btn);
        let pattern = new RegExp("[<>=+-]");
        // eslint-disable-next-line no-eval
        return eval(pattern.test(btn.visible) ? btn.visible : JSON.stringify(btn.visible));
      }
    },
    selectable() {
      // if (index === 2) {
      return true;
      // } else {
      //   return false
      // }
    }
  }
};
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
::v-deep .el-table_3_column_21 .is-center {
  padding: 0;
}
.custom-element-table {
  height: 100%;
  //图片列样式
  ::v-deep .img-column {
    padding: 0;
    .cell {
      padding: 0;
      .item .el-badge__content {
        transform: translateY(0%) translateX(50%);
      }
    }
  }
  ::v-deep .el-table__body-wrapper {
    height: calc(100% - 45px) !important;
    overflow-y: auto;
  }
  ::v-deep .el-table__fixed-right {
    height: calc(100% - 10px) !important;
  }
  ::v-deep ::-webkit-scrollbar {
    /*滚动条里面小方块*/
    width: 3px;
    height: 8px;
  }
  ::v-deep .cell {
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
  ::v-deep ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    // -webkit-box-shadow: inset 0 0 5px rgba(1, 21, 48, 1);
    // box-shadow: inset 0 0 5px rgba(1, 21, 48, 1);
    background: #c1c8ce;
  }
  ::v-deep ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // -webkit-box-shadow: inset 0 0 5px rgba(14, 54, 94, 0.2);
    // box-shadow: inset 0 0 5px rgba(14, 54, 94, 0.2);
    border-radius: 5px;
    background: #fff;
  }
  ::v-deep .header-cell-class {
    text-align: center !important;
  }
}

.scrollbar-view {
  height: 100%;
  max-height: calc(100%);
  overflow-y: auto;
  ::v-deep .el-scrollbar__wrap .el-scrollbar__view {
    height: 100%;
  }
}
.specialItem {
  ::v-deep .el-button--success.is-plain {
    color: #26c2bc;
    background: #fff;
    border-color: #d3f4f2;
  }
  ::v-deep .el-button--info.is-plain {
    color: #939399;
    background: #fff;
    border-color: #d3d4d6;
  }
}
.routineBtn {
  background: #fff;
}
.clearradio {
  ::v-deep .el-radio__label {
    display: none;
  }
}
.bubble_form {
  ::v-deep .el-form {
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
