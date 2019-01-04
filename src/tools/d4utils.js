
export class d4utils {

  static validateIntRange(min, max) {
    var min = min;
    var max = max;
    return (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      var newValue = value;
      setTimeout(() => {
        if (isNaN(newValue)) {

          callback(new Error('请输入整数'));

        } else {
          if (parseInt(newValue) != parseFloat(newValue)) {
            callback(new Error('请输入整数'));
          }
          var v1 = parseInt(newValue)
          if (v1 < min || v1 > max) {

            callback(new Error('输入的值必须在 ' + min + ' 和 ' + max + ' 之间'));
          }
          else {

            callback();
          }
        }
      }, 500);
    };
  }

  static validateFloatRange(min, max) {
    var min = min;
    var max = max;
    return (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      var newValue = value;
      setTimeout(() => {
        if (isNaN(newValue)) {

          callback(new Error('请输入数字'));

        } else {
          var v1 = parseFloat(newValue)
          if (v1 < min || v1 > max) {

            callback(new Error('输入的值必须在 ' + min + ' 和 ' + max + ' 之间'));
          }
          else {

            callback();
          }
        }
      }, 500);
    };
  }

  /**
   *
   * @param min 最小长度
   * @param max 最大长度
   * @param pattern 正则表达,例如:
   * 邮件地址:      /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/
   * 身份证:        /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
   * 数字：         /^([1-9]\d*(\.\d+)?)|(\d+(\.\d+))$/; isNumber=/^\d+(\.\d+)?$/
   * 整数：         /^\d+$/
   * 邮编：         /^[1-9]\d{5}(?!\d)$/
   * 手机号码：     /^1[3|4|5|7|8]\d{9}$/
   * @param patternMessage 正则表达是消息
   * @returns {function(*, *, *)}
   */


  static validateString(min, max, pattern, patternMessage) {
    var min = min;
    var max = max;
    return (rule, value, callback) => {

      var newValue = value;
      setTimeout(() => {
        if (!newValue) {
          if (min == 0) {
            callback();
            return
          }
          else {
            return callback(new Error('不能为空'));
          }
        }

        var v1 = newValue.trim();

        if (v1.length < min || v1.length > max) {
          callback(new Error('输入的字符串长度必須在 ' + min + '- ' + max + "之间"));
          return;
        }

        if (pattern) {
          if (!pattern.test(v1)) {
            if (patternMessage) {
              callback(new Error(patternMessage));
            }
            else {
              callback(new Error("格式不正确，格式为：" + pattern));
            }
          }
        }
        callback();
      }, 500);
    };
  }
  static objectsCached = {};
  static keysCached = new Array();

  static getObjectCached(key) {
    return this.objectsCached[key];
  }

  static cacheObject(key, obj) {
    this.objectsCached[key] = obj;
    this.keysCached.unshift(key);
    if (this.keysCached.length > 120) {
      for (i = this.keysCached.length - 1; i >= 100; i--) {
        delete this.objectsCached[this.keysCached[i]];
      }
    }
  }

   /**
   * 前端导出表格数据接口
   *
  */
 static downloadData(fileName,tableDatas,borderAll){
  let wb = XLSX.utils.table_to_book(document.querySelector("#tableKey"),{raw:true});
  let wbSheet = wb.Sheets.Sheet1;
  //todo 获取列的最大值（A-Z）
  let ascCol = ((wbSheet["!ref"].split(":")[1].charAt(0)).charCodeAt() - 1);
  let maxCol = String.fromCharCode(ascCol);
  wbSheet['!cols'] = this.setCols(wbSheet,100,maxCol,tableDatas);;
  let count = 0;
  for(let key in wb.Sheets.Sheet1){
    if((/[A-Z]/.test((key.charAt(0)))) && (key.charAt(0)) <= maxCol){
      wb.Sheets.Sheet1[key].s = {
        border:borderAll,
        numFmt:''
      }
    }

    if((/[B-Z]/.test((key.charAt(0))))){
      if((key.charAt(0)) == maxCol){
        if(tableDatas[count] && tableDatas[count].color){
          wb.Sheets.Sheet1[key].s = {
            border:borderAll,
            fill:{
              fgColor:{
                rgb: tableDatas[count].color.split('#')[1]
              }
            }
          }
        }
        count = 0;
      }else{
        if(((key.charAt(0)).charCodeAt()) <= ascCol){
          if(tableDatas[count] && tableDatas[count].color){
            wb.Sheets.Sheet1[key].s = {
              border:borderAll,
              fill:{
                fgColor: {
                  rgb: tableDatas[count].color.split('#')[1]
                }
              }
            }
          }
          count++;
        }
      }
    }
  }
  let wbout = xlsxStyle.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'buffer'
  });
  try{
    FileSaver.saveAs(new Blob([wbout],{type : 'application/octet-stream;charset=utf-8' }), fileName + ".xlsx");
  }catch(e){
    console.log(e,wb);
  }
  return wb;
}

static setCols(sheet,orderNumber,maxCol,tableDatas){
  let cols = [];
  let temp = {};
  let count = 0;
  let tempWidth = 0;
  for(let key in sheet){
    if((/[A-Z]/.test((key.charAt(0))))){
      if((key.charAt(0)) == 'A'){
        temp = {wpx:orderNumber};
        cols.push(temp);
      }
      else if((key.charAt(0)) == maxCol){
        if(tableDatas[count] && tableDatas[count].width){
          tempWidth = parseInt(tableDatas[count].width);
          temp = {wpx:tempWidth};
          cols.push(temp);
        }
        break;
      }
      else{
        if(tableDatas[count] && tableDatas[count].width){
          tempWidth = parseInt(tableDatas[count].width);
          temp = {wpx:tempWidth}
          cols.push(temp);
        }
      }
    }
  count++;
  }
  return cols;
}


}
