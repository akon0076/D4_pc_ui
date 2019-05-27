<template>

  <el-select v-model="value" placeholder="请选择">
      <el-tree
        :data="data"
        node-key="code"
        :default-expanded-keys="[1]"
        :props="defaultProps">
      </el-tree>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: '',
        data: [{
          code: 1,
          label: '一级 1',
          nodes: [{
            code: 2,
            label: '二级 1-1',
            nodes: [{
              code: 3,
              label: '三级 1-1-1'
            }, {
              code: 4,
              label: '三级 1-1-2'
            }]
          }]
        }],
        defaultProps: {
          children: 'nodes',
          label: 'label'
        }
      };
    }
  };
</script>
