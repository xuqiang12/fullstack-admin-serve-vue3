import { App, Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLElement {
  __handleClick__: () => any;
}
const directivesList: { [key: string]: Directive } = {
  debounce: {
    // 按钮或者输入框防抖
    // 例子 <el-button v-debounce="reset">刷新</el-button>
    // <el-input v-model="aa" v-debounce="[reset,`input`,1000]" placeholder="输入框数组防抖" />
    // <el-button v-debounce="[reset,`click`,1000]">刷新</el-button>
    mounted(el: ElType, binding: DirectiveBinding) {
      if (!(typeof binding.value === "function") && !Array.isArray(binding.value)) {
        throw "防抖参数类型错误";
      }
      const [fn, event = "click", time = 1000] = Array.isArray(binding.value) ? binding.value : [binding.value, "click", 1000];
      let timer: NodeJS.Timeout | null = null;
      let flag = true; // 输入法标记
      if (event === "input") {
        // 监听中文输入开始
        el.addEventListener("compositionstart", () => {
          flag = false;
        });
        // 监听中文输入结束
        el.addEventListener("compositionend", () => {
          flag = true;
        });
      }
      el.addEventListener(event, () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          if (flag) fn();
        }, time);
      });
    },
    beforeUnmount(el: ElType) {
      el.removeEventListener("click", () => {});
    }
  }
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
