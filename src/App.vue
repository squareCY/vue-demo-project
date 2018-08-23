<template>
  <div id="app">
    <icon name="logo" scale="5" class="title-logo"></icon>
    <icon name="people" scale="2" class="title-people"></icon>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo header-bar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1" @click="jumpTo('/foo')">foo</el-menu-item>
        <el-menu-item index="2-2" @click="jumpTo('/bar')">bar</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data: function () {
      return {
        height: window.innerHeight
    }
  },
  methods: {
    jumpTo(path){
      this.$router.push({path});
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header-bar{
  padding-left: 50px;
}
.side-nav{
  background-color: #e0e0e0;
}
.title-logo{
  position: fixed;
  z-index: 99;
  margin: 6px;
  top: 0;
  left: 0;
}
.title-people{
  position: fixed;
  z-index: 99;
  margin: 20px;
  top: 0;
  right: 0;
}
</style>
