<template>
  <div class="home">
    <el-button @click="doClick">点击</el-button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      propData: ''
    }
  },
  mounted() {
    window.addEventListener('message', (event) => {
      // event.data获取传过来的数据
      if (typeof event.data === 'string') {
        this.propData = event.data;
      }
    });
    this.sendMsg()
  },
  methods: {
    doClick() {
      console.log(this.propData, 1000212)
    },
    sendMsg() {
      // 向父页面传值1，表示子页面加载完成
      window.parent.postMessage('子页面给父页面传的值', '*')
    }
  }
};
</script>
