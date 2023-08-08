module.exports = {
  formatTree(arr, key = 'pid') { // list转tree
    const newArr = []
    const map = {}
    arr.forEach(item => {
      if (!item.children) item.children = []; // 判断数据是否有子级   没有则进行子级的添加
      map[item.id] = item // 添加对应的映射关系
    })
    arr.forEach(item => {
      if (map[item[key]]) {
        map[item[key]].children.push(item)
      } else {
        newArr.push(item)
      }
    })
    return newArr
  },
  arrayToTree(array, pid) {
    let result = []
    array.forEach(item => {
      if (item.pid == pid) {
        item.children = arrayToTree(array, item.id)
        result.push(item)
      }
    })
    return result
  },

  /**
   * @description 递归方法
   * @param {array} previous 树形结构数据
   * @param {function} funName 递归重构数据方法的方法名 作为参数时不需要加()
   * @param {string} bind 树形节后下级节点的绑定属性 默认children
   */
  recursionFunction(previous, funName, bind = 'children', initial = previous, cur = []) {//初始数据，方法名 绑定值 第一次调用  需要返回值
    previous.forEach((element, i) => {
      let menus = {};
      if (initial[i]) {
        menus = funName(initial[i]);
        menus = { [bind]: [], ...menus }
        cur.push(menus);
      }
      if (element[bind] && Array.isArray(element[bind]) && element[bind].length > 0) {
        recursionFunction(element[bind], funName, bind, element[bind], menus[bind]);
      }
    });
    return cur
  }
}
