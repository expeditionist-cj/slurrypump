import request from '../utils/request'
// 获取当前项目所有机组
export function getAllUnit(data) {
  return request({
    url: '/pump/getAllUnit',
    method: 'post',
    data
  })
}
// 根据机组获取配置信息
export function getConfig(data) {
  return request({
    url: '/pump/getConfig',
    method: 'post',
    data
  })
}
// 保存配置
export function saveProjectConfig(data) {
  return request({
    url: '/pump/saveProjectConfig',
    method: 'post',
    data
  })
}
// 点位信息
export function getPointList(data) {
  return request({
    url: '/pump/showPoint',
    method: 'post',
    data
  })
}
// 历史寻优
export function getlastSuggestion(data) {
  return request({
    url: '/pump/lastSuggestion',
    method: 'post',
    data
  })
}
// 供浆量
export function getPumpSupplyData(data) {
  return request({
    url: '/pump/pulpSupply',
    method: 'post',
    data
  })
}
// 循环泵组合
export function getPumpConsumData(data) {
  return request({
    url: '/pump/pumpCombination',
    method: 'post',
    data
  })
}
