/**
 * @description 数组对象去重
 * @param {array} data 需要去重的原数组对象
 * @param {string} parameter 去重数组的唯一码(关键字)
 */
export function unrepeated(data: any, parameter: any) {
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
}
