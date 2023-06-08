<template>
  <div id="container">
    <div class="mb-3"
      ><p>1400 ↓↓↓↓</p> <Pyramid :chart-id="'chart-1400'" :chart-data="chartData3"
    /></div>
    <div class="mb-3"
      ><p>1300 ↓↓↓↓</p> <Pyramid :chart-id="'chart-1300'" :width="1300" :chart-data="chartData2"
    /></div>
    <div class="mb-3"
      ><p>1200 ↓↓↓↓</p> <Pyramid :chart-id="'chart-1200'" :width="1200" :chart-data="chartData3"
    /></div>
    <div class="mb-3"
      ><p>1100 ↓↓↓↓</p> <Pyramid :chart-id="'chart-1100'" :width="1100" :chart-data="chartData2"
    /></div>
    <div class="mb-3"
      ><p>1000 ↓↓↓↓</p> <Pyramid :chart-id="'chart-1000'" :width="1000" :chart-data="chartData3"
    /></div>
    <div class="mb-3"
      ><p>900 ↓↓↓↓</p> <Pyramid :chart-id="'chart-900'" :width="900" :chart-data="chartData2"
    /></div>
    <div class="mb-3"
      ><p>800 ↓↓↓↓</p> <Pyramid :chart-id="'chart-800'" :width="800" :chart-data="chartData3"
    /></div>
    <div class="mb-3"
      ><p>700 ↓↓↓↓</p> <Pyramid :chart-id="'chart-700-1'" :width="700" :chart-data="chartData3"
    /></div>
    <div class="mb-3"
      ><p>700 ↓↓↓↓</p> <Pyramid :chart-id="'chart-700'" :width="700" :chart-data="chartData2"
    /></div>
    <div class="mb-3"
      ><p>600 ↓↓↓↓</p> <Pyramid :chart-id="'chart-600'" :width="600" :chart-data="chartData2"
    /></div>
    <div class="mb-3"
      ><p>500 ↓↓↓↓</p> <Pyramid :chart-id="'chart-500'" :width="500" :chart-data="chartData3"
    /></div>
    <div class="mb-3"
      ><p>400 ↓↓↓↓</p> <Pyramid :chart-id="'chart-400'" :width="400" :chart-data="chartData2"
    /></div>
    <div class="mb-3"
      ><p>300 ↓↓↓↓</p> <Pyramid :chart-id="'chart-300'" :width="300" :chart-data="chartData3"
    /></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Pyramid from './Pyramid.vue';
  import { ChartData } from './typing';
  import _chartData3 from './json/chart-data-3.json';
  import _chartData2 from './json/chart-data-2.json';
  const chartData3 = ref<ChartData>(_chartData3);
  const chartData2 = ref<ChartData>(_chartData2);
  const chart1 = ref<InstanceType<typeof Pyramid> | null>(null);
</script>

<style lang="less" scoped>
  #container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  p {
    font-size: larger;
    font-weight: 900;
  }
  p::before {
    content: 'width:';
  }
</style>
