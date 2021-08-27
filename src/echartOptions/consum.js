import * as echarts from 'echarts'
export const formateConsumData = (data) => {
  const xData = []
  const yData = []
  data.forEach(ele => {
    xData.push(ele.pump)
    yData.push(ele.consumption)
  })
  const series = []
  series.push({
    name: '循环泵组合',
    type: 'bar',
    barWidth: 5,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ]
      )
    },
    emphasis: {
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ]
        )
      }
    },
    data: yData
  })
  return {
    x: xData,
    y: series
  }
}

export const getConsumOption = (data) => {
  return {
    title: {
      text: '循环泵组合',
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
      data: ['循环泵组合'],
      right: '10'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.x
    },
    yAxis: {
      type: 'value'
    },
    series: data.y
  }
}

