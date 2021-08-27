<template>
  <div class="homeTable">
    <div class="homeTable-title">
      其他历史寻优结果
    </div>
    <el-table
      :data="tableData"
      stripe
      size="mini"
      height="39rem"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="历史时间"
        align="center"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="weight"
        label="负荷(MW)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="rawSo2Obv"
        label="入口SO2浓度(mg/m³)"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="ph"
        label="PH值"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="rawFlow"
        label="原烟气流量(Knm³/h)"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="disSo2Obv"
        label="出口SO2浓度(mg/m³)"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="runPumps"
        label="循泵组合"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="距下一次切泵时长(min)"
        min-width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="difference"
        label="相似距离                      "
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template #default="scope">
          <el-button type="text" size="mini" @click="look(scope.row)">曲线</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    look(row) {
      this.$emit('look', row)
    }
  }
}
</script>
<style lang="less" scoped>
.homeTable {
  padding: 1rem;
  .homeTable-title {
    font-size: 1.6rem;
    font-weight: 500;
    color: #46705b;
    line-height: 2.2rem;
    margin-bottom: 1rem;
  }
}
</style>
