<template>
  <div class="slurrypump-home">
    <div class="slurrypump-home-top">
      <div class="left">
        <div class="btns">
          <div
            v-for="item in units"
            :key="item.id"
            class="btn"
          >
            <el-button
              size="mini"
              :type="activeUnit === item.id ? item.isRun ? 'danger' : 'success' : 'info'"
              @click="changeUnit(item)"
            >
              <span :style="{color: activeUnit === item.id ? 'white' : item.isRun ? 'red' : 'green'}">#{{ item.unit.slice(0,1) }}</span>
            </el-button>
          </div>
        </div>
        <div class="info-content">
          <div class="info-content-boxs">
            <div
              v-for="item in infoList"
              :key="item.point_name"
              class="info-box"
            >
              <div class="info-box-num">{{ item.value || '--' }}</div>
              <div class="info-box-text">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <!-- 液位 -->
        <div
          class="right-bottom"
        >
          <div v-for="item in ywList" :key="item.point_name" class="box">
            <el-slider
              v-model="item.value"
              class="center-slider"
              vertical
              height="200px"
              :marks="item.marks"
            >
            </el-slider>
            <div class="yw">
              {{ item.name }}
            </div>
          </div>
        </div>
        <!-- 单塔 -->
        <img
          v-if="rowData.double === 0"
          class="center-gif"
          src="../assets/pump.gif"
          alt=""
        >
        <!-- 双塔 -->
        <img v-else class="center-gif-double" src="../assets/doublePump.gif" alt="">
        <img
          class="line"
          src="../assets/line.png"
          alt=""
        >
        <div class="sg">
          <div class="sg-title">
            <div class="title">优化建议</div>
            <div class="time">({{ date }})</div>
            <el-button
              class="btn"
              type="text"
              icon="el-icon-warning"
            ></el-button>
          </div>
          <div class="sg-content">
            {{ suggestion }}
          </div>
        </div>
        <div class="left-bar">
          <div class="pump-bar">
            <div class="pump-bar-title">
              <img
                class="pumpicon"
                src="../assets/pumpicon.png"
                alt=""
              >
              循环泵
            </div>
            <div
              v-for="item in pumpBar"
              :key="item.point_name"
              class="pump-bar-box"
            >
              <div
                class="big"
                :style="{color: item.state ? 'rgba(249, 69, 91, 1)' : 'rgba(16, 165, 61, 1)'}"
              >{{ item.name }}</div>
              <div>
                {{ item.value || '--' }}A
                <span style="color: rgba(190, 190, 190, 1);"> | </span>
                <span :style="{color: item.state ? 'rgba(249, 69, 91, 1)' : 'rgba(16, 165, 61, 1)'}">
                  {{ item.state ? '运行' : '停运' }}
                </span>
              </div>
              <el-button
                class="btn"
                type="text"
                size="mini"
              >挂起</el-button>
            </div>
          </div>
          <div class="pump-bar">
            <div class="pump-bar-title">
              <img
                class="pumpicon"
                src="../assets/pumpicon.png"
                alt=""
              >
              搅拌机
            </div>
            <div class="jbj">
              <div
                v-for="item in jbjList"
                :key="item.point_name"
                class="jbj-box"
              >
                <div
                  class="name"
                  :style="{color: item.state ? 'rgba(249, 69, 91, 1)' : 'rgba(16, 165, 61, 1)'}"
                >{{ item.name }}</div>
                <div>{{ item.value || '--' }}A</div>
              </div>
            </div>
          </div>
          <div class="pump-bar">
            <div class="pump-bar-title">
              <img
                class="pumpicon"
                src="../assets/pumpicon.png"
                alt=""
              >
              浆液密度
            </div>
            <div class="md">
              <div v-for="item in mdList" :key="item.name" class="md-box">
                <div class="name">{{ item.name }}</div>
                <div>{{ item.value || '--' }} mg/m³</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="right">
        <div
          ref="supply"
          class="pump-supply"
        ></div>
        <div
          ref="consum"
          class="pump-consum"
        ></div>
      </div>
    </div>

    <div class="slurrypump-home-bottom">
      <homeTable :table-data="tableData" @look="look"></homeTable>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="60%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="base-info">
        <el-divider content-position="left">基本信息</el-divider>
        <div class="base-info-content">
          <div class="box">
            <div class="name">
              机组名字：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.unit"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
          </div>
          <div class="box">
            <div class="name">
              模型调用时间：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.time"
                class="ipt"
                size="mini"
              ></el-input>
              <el-select
                v-model="timeType"
                class="sel"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in timeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box">
            <div class="name">
              是否双塔：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.double"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
          </div>
          <div class="box">
            <div class="name">
              泵机数量：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.pumpSize"
                class="ipt"
                size="mini"
              ></el-input>
              <div class="dimission">
                个
              </div>
            </div>
          </div>
          <div class="box">
            <div class="name">
              机组容量：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.capacity"
                class="ipt"
                size="mini"
              ></el-input>
              <div class="dimission">
                KWh
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="base-info">
        <el-divider content-position="left">基础设置</el-divider>
        <div
          class="base-info-content"
          style="height: 20rem;"
        >
          <div class="so-box">
            <div class="name">
              <span class="red">*</span> SO₂目标值：
            </div>
            <div class="lg-ipt">
              <el-input
                v-model="rowData.soTarget"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              上限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.soTop"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              上上限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.soVipTop"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              下限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.soFoot"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              下下限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.soVipFoot"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
          </div>
          <div class="so-box">
            <div class="name">
              <span class="red">*</span> 吸收塔浆液PH值：
            </div>
            <div class="lg-ipt">
              <el-input
                v-model="rowData.phTarget"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              上限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.phTop"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              上上限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.phVipTop"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              下限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.phFoot"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
            <div class="limit">
              下下限：
            </div>
            <div class="ipts">
              <el-input
                v-model="rowData.phVipFoot"
                class="ipt"
                size="mini"
              ></el-input>
            </div>
          </div>
          <div class="so-box">
            <div class="name">
              <span class="red">*</span> 最少启动泵数量：
            </div>
            <div class="lg-ipt">
              <el-input
                v-model="rowData.pumpLimit"
                class="ipt"
                size="mini"
              ></el-input>
              <div class="dimission">
                台
              </div>
            </div>
          </div>
          <div class="so-box">
            <div class="name">
              <span class="red">*</span> 泵操作最小间隔时间：
            </div>
            <div class="lg-ipt">
              <el-input
                v-model="rowData.pumpLastTime"
                class="ipt"
                size="mini"
              ></el-input>
              <div class="dimission">
                台
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="success"
            size="mini"
            @click="save"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import homeTable from './homeTable'
import { getSupplyOption, formateSupplyData } from '../echartOptions/supply'
import { getConsumOption, formateConsumData } from '../echartOptions/consum'
import { getAllUnit, getConfig, saveProjectConfig, getPointList, getlastSuggestion, getPumpSupplyData, getPumpConsumData } from '../api/home'
import { socketUrl } from '@/config/config'
export default {
  name: 'Home',
  components: {
    homeTable
  },
  data () {
    return {
      dialogVisible: false,
      timeType: 'h',
      rowData: {},
      timeOption: [
        {
          value: 'h',
          label: '小时'
        },
        {
          value: 'm',
          label: '分钟'
        }
      ],
      tableData: [],
      marks: {
        0: '0m',
        100: '20m'
      },
      units: [],
      activeUnit: '',
      infoList: [], // 点位
      pumpBar: [], // 循环泵
      jbjList: [], // 搅拌机
      ywList: [], // 液位
      mdList: [], // 密度
      suggestion: '',
      date: '',
      isSinglePump: true,
      propPlantId: new FormData(),
      unitId: new FormData()
    }
  },
  mounted () {
    window.addEventListener('message', (event) => {
      // event.data获取传过来的数据
      if (typeof event.data === 'string') {
        const data = event.data
        this.propPlantId.append('id', data)
        // 第一次进入循环泵模型的时候初始化配置信息
        getAllUnit(this.propPlantId).then(res => {
          const data = res.data.data
          if (data && data.length > 0) {
            this.units = data
            this.activeUnit = data[0].id
            this.unitId.append('id', data[0].id)
            // 如果该机组未初始化，则弹窗进行初始化
            if (data[0].isDefault === 1) {
              this.dialogVisible = true
              // 调用默认配置信息
              this.getOneUnitConfig()
            } else {
              // 如果该机组已初始化，则初始化页面信息
              this.dialogVisible = false
              this.init()
            }
          }
        })
      }
    });
    this.sendMsg()
  },
  methods: {
    sendMsg () {
      // 向父页面传值1，表示子页面加载完成
      window.parent.postMessage('1', '*')
    },
    init () {
      // 调用已初始化的机组信息
      this.getOneUnitConfig()
      // 调用左侧点位信息
      this.getInfoList()
      // 调用下方历史寻优结果
      this.getTableData()
      // 调用供浆量曲线
      this.getPumpSupply()
      // 调用循环泵组合曲线
      this.getPumpConsum()
      // 调用ws
      this.initWebSocket()
    },
    // 获取单个机组的配置信息
    getOneUnitConfig () {
      getConfig(this.unitId).then(res => {
        const data = res.data.data
        if (data) {
          this.rowData = data
        }
      })
    },
    // 切换机组
    changeUnit (item) {
      this.activeUnit = item.id
      this.unitId.set('id', item.id)
      if (item.isDefault === 1) {
        this.dialogVisible = true
        // 调用默认配置信息
        this.getOneUnitConfig()
      } else {
        this.init()
      }
    },
    // 保存弹窗初始化信息
    save () {
      const rowData = JSON.parse(JSON.stringify(this.rowData))
      const saveData = new FormData()
      Object.keys(rowData).map(k => {
        saveData.append(k, rowData[k])
      })
      saveProjectConfig(saveData).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
          // 保存成功后关闭弹框，初始化页面
          this.dialogVisible = false
          this.init()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          // 初始化失败则不取消弹框
          this.dialogVisible = true
        }
      })
    },
    // 获取左侧点位信息
    getInfoList () {
      getPointList(this.unitId).then(res => {
        if (res.data.code === 200) {
          const { left, blender, density, place, pump } = res.data.data
          this.infoList = left
          this.jbjList = blender
          this.pumpBar = pump
          this.mdList = density
          place.forEach(ele => {
            ele.marks = {
              0: '0m',
              100: '20m'
            }
          })
          this.ywList = place
        }
      })
    },
    // 历史寻优
    getTableData() {
      getlastSuggestion(this.propPlantId).then(res => {
        if (res.data.code === 200) {
          const { sg, date, other } = res.data.data
          this.suggestion = sg
          this.date = date
          this.tableData = other
        }
      })
    },
    // 供浆量
    getPumpSupply() {
      getPumpSupplyData(this.unitId).then(res => {
        const data = res.data.data
        const option = getSupplyOption(formateSupplyData(data))
        const supply = this.$echarts.init(this.$refs['supply'])
        supply.setOption(option)
      })
    },
    // 循环泵组合
    getPumpConsum() {
      getPumpConsumData(this.unitId).then(res => {
        const data = res.data.data
        const option = getConsumOption(formateConsumData(data))
        const consum = this.$echarts.init(this.$refs['consum'])
        consum.setOption(option)
      })
    },
    look(row) {
      console.log(row, 11);
    },
    // 初始化weosocket
    initWebSocket() {
      if (this.websock) {
        this.websock.close()
      }
      this.websock = new WebSocket(socketUrl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen() {
      // let actions = { test: "12345" };
      this.websocketsend(1);
    },
    // 连接建立失败重连
    websocketonerror() {
      this.initWebSocket(this.path)
    },
    // 数据接收
    websocketonmessage(e) {
      const data = JSON.parse(e.data)
      const { msg, type } = data
      if (type === 1) {
        const { left, blender, density, place, pump } = msg

        const infoList = JSON.parse(JSON.stringify(this.infoList))
        infoList.forEach(ele => {
          left.forEach(item => {
            if (ele.point_name === item.name) {
              ele.value = item.value
              ele.state = item.state
            }
          })
        })
        this.infoList = infoList

        const jbjList = JSON.parse(JSON.stringify(this.jbjList))
        jbjList.forEach(ele => {
          blender.forEach(item => {
            if (ele.point_name === item.name) {
              ele.value = item.value
              ele.state = item.state
            }
          })
        })
        this.jbjList = jbjList

        const pumpBar = JSON.parse(JSON.stringify(this.pumpBar))
        pumpBar.forEach(ele => {
          pump.forEach(item => {
            if (ele.point_name === item.name) {
              ele.value = item.value
              ele.state = item.state
            }
          })
        })
        this.pumpBar = pumpBar

        const mdList = JSON.parse(JSON.stringify(this.mdList))
        mdList.forEach(ele => {
          density.forEach(item => {
            if (ele.point_name === item.name) {
              ele.value = item.value
              ele.state = item.state
            }
          })
        })
        this.mdList = mdList

        const ywList = JSON.parse(JSON.stringify(this.ywList))
        ywList.forEach(ele => {
          place.forEach(item => {
            if (ele.point_name === item.name) {
              ele.marks = {
                0: '0m',
                [item.value * 5 ]: item.value + 'm',
                100: '20m'
              }
              ele.value = item.value * 5
              ele.state = item.state
            }
          })
        })
        this.ywList = ywList
      }
      if (type === 2) {
        this.suggestion = msg.sg
        this.date = msg.date
        const other = msg.other
        this.tableData = other.concat(this.tableData).slice(0, 20)
      }
    },
    // 数据发送
    websocketsend(Data) {
      this.websock.send(Data);
    },
    // 关闭连接
    websocketclose(e) {
      // console.log("断开连接", e);
    }
  }
};
</script>
<style lang="less" scoped>
.slurrypump-home {
  overflow: hidden;
  background-color: rgba(231, 241, 229, 1);
  .slurrypump-home-top {
    height: 50rem;
    display: flex;
    .left {
      width: 22%;
      .btns {
        display: flex;
        margin-bottom: .8rem;
        .btn {
          padding: 0.5rem;
          border-radius: 0.2rem;
        }
        .actborder {
          border: 0.1rem solid rgb(255, 0, 0);
        }
      }
      .info-content {
        background-color: #fff;
        height: calc(100% - 7.4rem);
        border-radius: 1rem;
        padding: 1rem;
        margin-bottom: .8rem;
        .info-content-boxs {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .info-box {
            width: 48%;
            padding: 1%;
            margin-bottom: 1rem;
            .info-box-num {
              font-size: 1.6rem;
              font-weight: 600;
              color: #2d4c51;
              line-height: 2.2rem;
            }
            .info-box-text {
              font-size: 1.4rem;
              font-weight: 400;
              color: #46705b;
              line-height: 2rem;
            }
          }
        }
      }
      @media screen and (max-width: 1366px) {
        .info-content {
          height: calc(100% - 8.2rem);
        }
      }
    }
    .center {
      width: 56%;
      background-image: url("../assets/bgWg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: relative;
      .right-bottom {
        width: 20%;
        display: flex;
        position: absolute;
        top: 40%;
        left: 80%;
        z-index: 200;
        .box {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .center-slider {
            margin-bottom: 2rem;
          }
          .yw {
            width: 7.8rem;
            height: 2.4rem;
            font-size: 1.2rem;
            background: #eff8fd;
            border-radius: 1.1rem;
            opacity: 0.8;
            border: 0.1rem solid #9ccaff;
            text-align: center;
            line-height: 2.4rem;
            color: #2d4c51;
          }
        }
      }

      :deep(.el-slider__runway) {
        height: 20rem !important;
      }
      .el-slider {
        --el-slider-main-background-color: #00a322;
        --el-slider-runway-background-color: rgba(64, 169, 105, 0.2);
        --el-slider-stop-background-color: transparent;
        --el-slider-margin: 0;
        --el-slider-border-radius: 1rem;
        --el-slider-height: 1.6rem;
        --el-slider-button-size: 0;
        --el-slider-button-wrapper-size: 0;
        --el-slider-button-wrapper-offset: 0;
      }
      :deep(.el-slider.is-vertical .el-slider__marks-text) {
        left: -16rem;
        width: 15rem;
        text-align: right;
        color: rgba(64, 169, 105, 1);
      }
      :deep(.el-slider.is-vertical .el-slider__bar) {
        border-radius: 1rem;
        background: linear-gradient(180deg, #00a322 0%, #77d79c 100%);
      }

      .line {
        width: 10%;
        position: absolute;
        top: 13%;
        left: 54%;
      }
      .center-gif {
        width: 74%;
        position: absolute;
        top: 3%;
        left: 15%;
      }
      .center-gif-double {
        width: 74%;
        position: absolute;
        top: 4%;
        left: 15%;
      }
      .sg {
        width: 35%;
        border: 1px solid #9ccaff;
        background: #eff8fd;
        margin-bottom: 1rem;
        position: absolute;
        top: 1%;
        left: 64%;
        .sg-title {
          padding: 0 1rem;
          min-width: 13rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-size: 1.4rem;
            font-weight: 600;
            color: #46705b;
          }
          .time {
            font-size: 1.2rem;
            font-weight: 400;
            color: #87a69c;
          }
          .btn {
            color: #ff8888;
            .el-button--text {
              font-size: 1.2rem;
            }
          }
          :deep(.el-button) {
            padding-right: 1rem;
          }
        }
        .sg-content {
          font-size: 1.4rem;
          color: #ff4c4c;
          padding: 0.5rem 1rem 1rem;
        }
      }

      .left-bar {
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        position: absolute;
        top: 1%;
        left: 1%;
        .pump-bar {
          background: #eff8fd;
          padding: 1rem;
          border: 0.1rem solid #9ccaff;
          margin-bottom: 0.5rem;
          margin-right: 1rem;
          .pump-bar-title {
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 2rem;
            color: #2d4c51;
            .pumpicon {
              width: 1.4rem;
              margin-right: 0.5rem;
            }
          }
          .pump-bar-box {
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(45, 76, 81, 1);
            line-height: 3rem;
            display: flex;
            justify-content: space-between;
            .btn {
              color: rgba(255, 185, 0, 1);
            }
            .big {
              font-weight: 600;
            }
          }
          .md {
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(45, 76, 81, 1);
            line-height: 3rem;
            .md-box {
              display: flex;
              justify-content: space-between;
            }
          }
          .jbj {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(45, 76, 81, 1);
            line-height: 3rem;
            .jbj-box {
              width: 50%;
              display: flex;
              .name {
                margin-right: 1rem;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
    .right {
      width: 22%;
      margin-bottom: .8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .pump-supply {
        width: 100%;
        height: 49.5%;
        background-color: #fff;
        border-radius: 0.5rem;
      }
      .pump-consum {
        width: 100%;
        height: 49%;
        background-color: #fff;
        border-radius: 0.5rem;
      }
    }
  }

  .slurrypump-home-bottom {
    width: 100%;
    height: calc(100vh - 50rem);
    background-color: #fff;
    border-radius: 1rem;
  }
  .el-divider--horizontal {
    margin: 0;
    // background-color: rgba(226, 226, 226, 1);
  }
  .base-info {
    margin-bottom: 2rem;
    .base-info-content {
      border: 0.1rem solid rgba(226, 226, 226, 1);
      border-top: 0;
      height: 15rem;
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      .box {
        width: 50%;
        display: flex;
        align-items: center;
        .name {
          width: 30%;
          text-align: right;
          font-size: 1.4rem;
          font-weight: 400;
          color: #62807f;
          line-height: 2.2rem;
        }
        .ipts {
          width: 70%;
          display: flex;
          align-items: center;
          .ipt {
            width: 60%;
            margin-right: 1rem;
          }
          .sel {
            width: 30%;
          }
          .dimission {
            width: 30%;
          }
        }
      }
      .so-box {
        width: 100%;
        display: flex;
        align-items: center;
        .name {
          width: 22rem;
          min-width: 22rem;
          text-align: right;
          font-size: 1.4rem;
          font-weight: 400;
          color: #62807f;
          line-height: 2.2rem;
          .red {
            color: #f00;
          }
        }
        .ipts {
          display: flex;
          align-items: center;
        }
        .lg-ipt {
          display: flex;
          align-items: center;
          .ipt {
            margin-right: 1rem;
            width: 18rem;
            min-width: 16rem;
          }
        }
        .limit {
          width: 10rem;
          min-width: 8rem;
          text-align: right;
          font-size: 1.4rem;
          font-weight: 400;
          color: #62807f;
          line-height: 2.2rem;
        }
      }
    }
  }
}
</style>
