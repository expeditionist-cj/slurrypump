import * as echarts from 'echarts'
export const formateSupplyData = (data) => {
  const xData = []
  const yData = []
  data.forEach(ele => {
    xData.push(ele.time)
    yData.push(ele.amount)
  })
  const series = []
  series.push({
    name: '循环供浆量',
    type: 'line',
    stack: '总量',
    smooth: true,
    lineStyle: {
      width: 0
    },
    showSymbol: false,
    areaStyle: {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(128, 255, 165)'
      }, {
        offset: 1,
        color: 'rgba(1, 191, 236)'
      }])
    },
    emphasis: {
      focus: 'series'
    },
    data: yData
  })
  return {
    x: xData,
    y: series
  }
}

export const getSupplyOption = (data) => {
  return {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: '循环供浆量',
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: '#46705B'
      },
      top: 10,
      left: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['循环供浆量'],
      right: '10'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.x
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: data.y
  }
}

