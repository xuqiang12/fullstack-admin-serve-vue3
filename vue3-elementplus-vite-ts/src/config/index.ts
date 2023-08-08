// ? 全局默认配置项
/**
 * @description：请求配置
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = "success"
}
// 后端菜单列表对应路由映射
export const ROUTER_PARAM_ENUM: any = {
  path: "path", // ==> 路由菜单访问路径
  name: "name", // ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
  redirect: "redirect", // ==> 路由重定向地址
  component: "component", // ==> 视图文件路径
  icon: "icon", // ==> 菜单和面包屑对应的图标
  title: "title", // ==> 路由标题 (用作 document.title || 菜单的名称)
  activeMenu: "activeMenu", // ==> 当前路由为详情页时，需要高亮的菜单
  isLink: "isLink", // ==> 路由外链时填写的访问地址
  isHide: "isHide", // ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
  isFull: "isFull", // ==> 菜单是否全屏 (示例：数据大屏页面)
  isAffix: "isAffix", // ==> 菜单是否固定在标签页中 (首页通常是固定项)
  isKeepAlive: "isKeepAlive", // ==> 当前路由是否缓存
  children: "children" // ==> 路由嵌套参数
};

// 首页地址（默认）
export const HOME_URL: string = "/home/index";

// 登录页地址（默认）
export const LOGIN_URL: string = "/login";

// 默认主题颜色
export const DEFAULT_PRIMARY: string = "#009688";

// 路由白名单地址（必须是本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ["/500"];

// 高德地图 key
export const AMAP_MAP_KEY: string = "";

// 百度地图 key
export const BAIDU_MAP_KEY: string = "";
