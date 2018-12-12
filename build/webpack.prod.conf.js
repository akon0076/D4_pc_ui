'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        },
        mangle: {
          toplevel: true,
          reserved:['data_nomangle_','operatorId_nomangle_','moduleType_nomangle_','pageDTO_nomangle_','admissionAgencyId_nomangle_','organizationId_nomangle_','admissionAgency_nomangle_','organization_nomangle_','admissionAgencyName_nomangle_','files_nomangle_','condition_nomangle_','agencyEvaluateId_nomangle_','agencyEvaluate_nomangle_','agencyEvaluateName_nomangle_','manageStatusId_nomangle_','manageStatus_nomangle_','manageStatusName_nomangle_','meetingRoomId_nomangle_','meetingRoom_nomangle_','meetingRoomName_nomangle_','conferenceRoomId_nomangle_','conferenceRoom_nomangle_','conferenceRoomName_nomangle_','meetingReserveId_nomangle_','meetingReserve_nomangle_','meetingReserveName_nomangle_','newspaperReportId_nomangle_','map_nomangle_','consumablesId_nomangle_','consumables_nomangle_','consumablesName_nomangle_','findEquipmentDetailDto_nomangle_','equipmentDetailId_nomangle_','equipmentDetail_nomangle_','equipmentDetailName_nomangle_','findEquipmentDto_nomangle_','equipmentId_nomangle_','equipment_nomangle_','equipmentDto_nomangle_','equipmentName_nomangle_','type_nomangle_','name_nomangle_','file_nomangle_','equipmentSettlementDto_nomangle_','equipmentSettlementId_nomangle_','equipmentSettlement_nomangle_','equipmentSettlementName_nomangle_','newspaperReportDto_nomangle_','newspaperReport_nomangle_','newspaperReportName_nomangle_','businessReceptionAndEmployeeId_nomangle_','businessReceptionAndEmployee_nomangle_','businessReceptionAndEmployeeName_nomangle_','businessReceptionId_nomangle_','businessReception_nomangle_','businessReceptionName_nomangle_','governmentReceptionAndEmployeeId_nomangle_','governmentReceptionAndEmployee_nomangle_','governmentReceptionAndEmployeeName_nomangle_','governmentReceptionAndParkPlaceId_nomangle_','governmentReceptionAndParkPlace_nomangle_','governmentReceptionAndParkPlaceName_nomangle_','governmentReceptionId_nomangle_','governmentReception_nomangle_','governmentReceptionName_nomangle_','parkPlaceId_nomangle_','parkPlace_nomangle_','parkPlaceName_nomangle_','visitorsId_nomangle_','visitors_nomangle_','visitorsName_nomangle_','buildingInformationEditDto_nomangle_','BuildingInformationEditDto_nomangle_','buildingInformationId_nomangle_','buildingInformation_nomangle_','buildingInformationName_nomangle_','dormitoryFeeId_nomangle_','dormitoryFee_nomangle_','dormitoryFeeName_nomangle_','DormitoryInformationEditDto_nomangle_','dormitoryInformationId_nomangle_','dormitoryInformation_nomangle_','dormitoryInformationName_nomangle_','dormitoryTypeEditDto_nomangle_','dormitoryTypeId_nomangle_','dormitoryType_nomangle_','dormitoryTypeName_nomangle_','FloorInformationEditDto_nomangle_','buildingName_nomangle_','floorInformationId_nomangle_','floorInformation_nomangle_','floorInformationName_nomangle_','SpaceInformationEditDto_nomangle_','spaceInformationId_nomangle_','spaceInformation_nomangle_','spaceInformationName_nomangle_','SpaceTypeEditDto_nomangle_','spaceTypeId_nomangle_','spaceType_nomangle_','spaceTypeName_nomangle_','dormitoryRentBillId_nomangle_','dormitoryFlowCodeId_nomangle_','dormitoryFlowCode_nomangle_','dormitoryFlowCodeName_nomangle_','dormitoryLeaseContractId_nomangle_','dormitoryLeaseContract_nomangle_','dormitoryLeaseContractName_nomangle_','dormitoryRentBill_nomangle_','dormitoryRentBillName_nomangle_','dormitoryUtilityBillId_nomangle_','dormitoryUtilityBill_nomangle_','dormitoryUtilityBillName_nomangle_','rentBillId_nomangle_','spaceFlowCodeId_nomangle_','spaceFlowCode_nomangle_','spaceFlowCodeName_nomangle_','spaceLeaseContractId_nomangle_','spaceLeaseContract_nomangle_','spaceLeaseContractName_nomangle_','formId_nomangle_','formName_nomangle_','spaceRentBillId_nomangle_','spaceRentBill_nomangle_','spaceRentBillName_nomangle_','spaceUtilityBillId_nomangle_','spaceUtilityBill_nomangle_','spaceUtilityBillName_nomangle_','dormitoryBookId_nomangle_','dormitoryBook_nomangle_','dormitoryBookName_nomangle_','spaceBookId_nomangle_','employeeId_nomangle_','spaceBook_nomangle_','spaceBookName_nomangle_','bookType_nomangle_','refundAuditId_nomangle_','bookId_nomangle_','auditNumber_nomangle_','refundAudit_nomangle_','refundAuditName_nomangle_','spaceBookAuditId_nomangle_','spaceBookAudit_nomangle_','spaceBookAuditName_nomangle_','floorId_nomangle_','obj_nomangle_','roomObj_nomangle_','commodityId_nomangle_','commodity_nomangle_','commodityName_nomangle_','attachmentId_nomangle_','commodityTypeId_nomangle_','commodityType_nomangle_','commodityTypeName_nomangle_','customerId_nomangle_','customer_nomangle_','customerName_nomangle_','memberId_nomangle_','member_nomangle_','memberName_nomangle_','orderItemId_nomangle_','orderItem_nomangle_','orderId_nomangle_','orderItemName_nomangle_','order_nomangle_','orderName_nomangle_','restaurantEvaluationId_nomangle_','restaurantEvaluation_nomangle_','restaurantEvaluationName_nomangle_','restaurantMessageId_nomangle_','restaurantMessage_nomangle_','restaurantMessageName_nomangle_','attachment_nomangle_','attachmentName_nomangle_','departmentId_nomangle_','department_nomangle_','departmentName_nomangle_','employee_nomangle_','employeeName_nomangle_','organizationName_nomangle_','testEmployeeId_nomangle_','testEmployee_nomangle_','testEmployeeName_nomangle_','testOpeatorId_nomangle_','testOpeator_nomangle_','testOpeatorName_nomangle_','testStudentId_nomangle_','testStudent_nomangle_','testStudentName_nomangle_','moduleId_nomangle_','module_nomangle_','moduleName_nomangle_','operatorAndRoleId_nomangle_','operatorAndRole_nomangle_','operatorAndRoleName_nomangle_','operator_nomangle_','operatorName_nomangle_','permissionId_nomangle_','permission_nomangle_','permissionName_nomangle_','roleId_nomangle_','roleAndPermissionId_nomangle_','roleAndPermission_nomangle_','roleAndPermissionName_nomangle_','role_nomangle_','roleName_nomangle_','empOpenIdId_nomangle_','empOpenId_nomangle_','empOpenIdName_nomangle_','employeRegistId_nomangle_','employeRegist_nomangle_','employeRegistName_nomangle_','organizationRegistId_nomangle_','organizationRegist_nomangle_','codeTableId_nomangle_','codeTable_nomangle_','codeTableName_nomangle_','systemConfigId_nomangle_','systemConfig_nomangle_','systemConfigName_nomangle_'],
        },
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
