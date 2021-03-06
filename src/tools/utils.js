/**
 *
 * @param file
 * @returns {Promise<any>}
 */
export function imageBase64(file) {
  const reader = new FileReader();
  const AllowImgFileSize = 2100000;
  if (file) {
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (AllowImgFileSize !== 0 && AllowImgFileSize < reader.result.length) {
          reject(new Error(`请上传小于2M到图,${e}`))
        } else {
          resolve(reader.result)
        }
      }
    })
  }
}

/**
 * 判断数组里面的某个值是否存在另一个数组里
 * @param roles
 * @param meta
 * @returns {boolean}
 */
export function hasPermission(roles = [], meta) {
  return roles.indexOf(meta)>-1?true:false;
}

/**
 * 监听窗口变化
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(...[*]=): *}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null
    }

    return result
  }
}
