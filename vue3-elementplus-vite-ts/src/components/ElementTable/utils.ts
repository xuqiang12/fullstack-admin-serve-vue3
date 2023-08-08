/**
 * @description table工具
 */
// 表格表头样式
export const HEADER_STYLE = { background: "#FAFAFA", color: "rgba(0,0,0,0.85)" };

export const unrepeated = (data: any, parameter: any) => {
  // 数组对象去重
  let temp: any = {};
  let tempData = JSON.parse(JSON.stringify(data)); // 深拷贝原来的数据
  let newData = tempData.reduce((pre: any, cur: any) => {
    if (!temp[cur[parameter]] && cur[parameter]) {
      temp[cur[parameter]] = true;
      pre.push(cur);
    }
    return pre;
  }, []);
  return newData;
};
