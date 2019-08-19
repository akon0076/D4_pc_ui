// var fs = require('fs');                //获取fs模块
//
// console.log('start sync read'); //同步读取开始
// var data = fs.readFileSync('./src/view/ps/wisdomCatering/CommodityService.js','utf-8');
// console.log('end sync read');    //同步读取结束
//
// console.log(data)
//

var fs = require("fs")
var path = require("path")

//var walk = require('walk')

var root = path.join('./src/view')

module.exports = {
  prepareMangle:prepareMangle,
  restoreNomangleParams:restoreNomangleParams,
  cleanNomangle:cleanNomangle,
}
function prepareMangle() {
  console.log("==================== ");
  var paramsSet = new Set();
  var fileSignatureMap = new Map();
  var files =[];

  getFileList(path.join(root),files,'Service.js')
  debugger
  console.log("files============111 "+files);
  files.forEach(function (file,index,array) {
    console.log("==================== "+file);
    nomangleParams(file,paramsSet,fileSignatureMap)
  });
  var content = fs.readFileSync('./build/webpack.prod.conf.js', 'utf8');

  var nomangledNames = '\''+Array.from(paramsSet).join('\',\'')+'\''
  //console.log(nomangledNames);

  content = content.replace(/reserved.*\[?.+?\]{1,1}?/g,'reserved:['+nomangledNames+']');
  fs.writeFileSync('./build/webpack.prod.conf.js', content, 'utf8');

  return fileSignatureMap;
}


function getFileList(filePath,serviceFiles,surfix){
  //根据文件路径读取文件，返回文件列表
  //console.log(filePath);

  var  files=fs.readdirSync(filePath);

  //遍历读取到的文件列表
  files.forEach(function(filename){
    //获取当前文件的绝对路径
    var filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    var stats = fs.statSync(filedir);

      var isFile = stats.isFile();//是文件
      var isDir = stats.isDirectory();//是文件夹
      if(isFile){

        if (filedir.endsWith(surfix)) {
          serviceFiles.push(filedir);
          console.log(filedir);
        }
        //console.log(filedir);
        // 读取文件内容
        //var content = fs.readFileSync(filedir, 'utf-8');
        //console.log(content);
      }
      if(isDir){
        getFileList(filedir,serviceFiles,surfix);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
  });

}
// function getFileList(path,files){
//   var walker  = walk.walk(path, { followLinks: false });
//
//   walker.on('file', function(roots, stat, next) {
//     if (stat.name.endsWith('Service.js')) {
//       files.push(roots + '/' + stat.name);
//     }
//     next();
//   });
//
//   walker.on('directory', function(roots, stat, next) {
//     //dirs.push(roots + '/' + stat.name);
//     next();
//   });
//   walker.on('end', function() {
//     console.log("files============ "+files);
//     //console.log("dirs "+dirs);
//   });
//   return files;
// }

function nomangleParams(file,paramsSet,fileSignatureMap){
  var content = fs.readFileSync(file, 'utf8');

  //var content="static saveFile(data,files) { adfadf   static findCommoditysWithIdNameByName(     ) {asdf}  static saveFile1(data,files1) "
  var funs  = content.match(/static +\w+? *\([\w, \n]*\)?/g);
  if(funs==null)return;
  //var paramsSet = new Set();
  var signatureMap = new Map();
  funs.forEach(function(signature,index,array){
    //document.write(signature+'<br>')
    var paramStart = signature.indexOf('(');
    var paramStop = signature.indexOf(')');
    rawParams = signature.substring(paramStart+1,paramStop);
    nomangleSignature = signature;
    params = rawParams.replace(/ +?/g,'');

    if(params.length > 0)
    {

      params = params.replace(/,+?/g,'_nomangle_,');
      params = params+'_nomangle_';
      nomangleSignature =  signature.substring(0,paramStart+1)+params+signature.substring(paramStop);
      params.split(',').forEach(function(p,index,array){
        paramsSet.add(p)
      });
      //debugger
    }
    signatureMap.set(signature,nomangleSignature)
    //document.write('params:'+params+'||'+params.length+'||<br>')

  });
  signatureMap.forEach(function(nomangleSignature, signature, map){
    content = content.replace(signature,nomangleSignature);
  });
  //console.log(content)
  fs.writeFileSync(file, content,'utf8');

  fileSignatureMap.set(file,signatureMap);

}

function restoreNomangleParams(fileSignatureMap){

  fileSignatureMap.forEach(function(signatureMap,file , map){
    var content = fs.readFileSync(file, 'utf8');
    signatureMap.forEach(function(nomangleSignature, signature, map){
      signature = signature.replace(/_nomangle_/g,'')
      content = content.replace(nomangleSignature,signature);
    });
    console.log("restoreNomangleParams:"+file);
    fs.writeFileSync(file, content,'utf8');
  });
}

function cleanNomangle(){

  var files =[];
  getFileList(path.join('dist/static/js'),files,'.js')
  files.forEach(function (file,index,array) {
    var content = fs.readFileSync(file, 'utf8');
    content = content.replace(/_nomangle_/g,'');
    fs.writeFileSync(file, content,'utf8');
  });

  files =[];
  getFileList(path.join('dist/static/js'),files,'.map')
  files.forEach(function (file,index,array) {
    var content = fs.readFileSync(file, 'utf8');
    content = content.replace(/_nomangle_/g,'');
    fs.writeFileSync(file, content,'utf8');
  });
}

