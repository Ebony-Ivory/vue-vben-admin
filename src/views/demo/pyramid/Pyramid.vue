<template>
  <div
    class="chart-wrap"
    :style="{
      width: getPxStr(curWidth),
      height: getPxStr(curHeight),
    }"
  >
    <div
      :style="{
        transform,
        transformOrigin,
      }"
      class="chart-inner"
    >
      <canvas :id="chartId"></canvas>
      <!-- 最底下一行方格文字 -->
      <div
        class="bottom-labels"
        :style="{
          width: getPxStr(canvasWidth),
        }"
        v-if="chartData.colHeader"
      >
        <div
          class="bl-item"
          :style="{
            width: getPxStr(getBLWidth(index)),
            height: getPxStr(bottomHeight),
            marginLeft: getPxStr(index === 0 ? firColScaleWidth : 0),
          }"
          v-for="(item, index) in chartData.colHeader"
          :key="`colHeader-${index}`"
        >
          <p class="text" v-html="item.text"></p>
          <div class="label">{{ item.superscript }}</div>
        </div>
      </div>
      <!-- 图例 -->
      <div
        class="legend"
        :style="{
          right: getPxStr(canvasWidth / 12),
          top: getPxStr(canvasWidth / 10),
        }"
        v-if="chartData.legend"
      >
        <div class="legend-item" v-for="(item, index) in chartData.legend" :key="`legend-${index}`">
          <div class="mark-color" :style="{ background: item.markColor }"></div>
          <p v-html="item.text"></p>
        </div>
      </div>
      <!-- 左侧大小标题 -->
      <div :style="{ top: getPxStr(canvasWidth / 10) }" class="titles" v-if="chartData.title">
        <h2>{{ chartData.title.leftText1 }}</h2>
        <h3>{{ chartData.title.leftText2 }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, computed, ref, onMounted } from 'vue';

  import { TAItem, ChartData } from './typing';
  defineExpose({ draw });

  const props = defineProps({
    chartId: {
      type: String,
      default: 'custom-chart',
    },
    width: {
      type: Number,
      default: 1400,
    },
    chartData: {
      type: Object as PropType<ChartData>,
      default: () => ({} as ChartData),
    },
  });
  // 画布默认宽度
  const canvasWidth = ref<number>(1400);
  // 画布默认高度
  const canvasHeight = ref<number>(700);
  // 最底下第一行高度
  const bottomHeight = ref<number>(85);
  // 台阶上面不规则矩形的高度
  const colHeight = ref<number>(60);
  // 第一个单元格缩进
  const firColScaleWidth = ref<number>(50);
  // 每一级台阶的正面总宽度
  const WidthList = [950, 760, 580, 390, 260, 130];
  // 每一级台阶正面高度
  const heighthList = [50, 50, 40, 30, 20];

  // 缩放比例
  const scaleRate = computed(() => {
    return props.width / canvasWidth.value;
  });
  // 缩放后实际高度
  const curHeight = computed(() => {
    return canvasHeight.value * scaleRate.value;
  });
  // 缩放后实际宽度
  const curWidth = computed(() => {
    return canvasWidth.value * scaleRate.value;
  });
  // 缩放相对偏移
  const transformOrigin = computed(() => {
    return scaleRate.value >= 1 ? '0px 0px' : `left 345px`;
  });
  // 缩放
  const transform = computed(() => {
    return `scale(${scaleRate.value}, ${scaleRate.value})`;
  });

  onMounted(() => {
    draw();
  });

  function getBLWidth(index: number) {
    return index === 0 ? getColWidth(0) + firColScaleWidth.value : getColWidth(0);
  }

  function getPxStr(size: number): string {
    return `${size}px`;
  }

  function draw() {
    const canvas = document.getElementById(props.chartId) as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = canvasWidth.value;
      canvas.height = canvasHeight.value;
      // ctx.scale(scaleRate, scaleRate);
      ctx.font = '16px Microsoft YaHei';
      //水平对齐方式
      ctx.textAlign = 'center';
      //垂直对齐方式
      ctx.textBaseline = 'middle';
      // drawBottom(ctx, canvas);
      drawBottom(ctx);

      const rowData = props.chartData.rowData;
      for (let index = 0; index < 5; index++) {
        const item = rowData[index];
        drawFront(ctx, index);
        drawTop(ctx, index);
        if (index < 3) {
          setFrontText(ctx, index, item);
          setTopText(ctx, index, item);
        }
      }
    }
  }

  function getColWidth(num: number): number {
    return WidthList[num] / 7;
  }

  function getBaseOffset(): number {
    return getColWidth(0) + firColScaleWidth.value * 2;
  }

  // 最最下面的header部分矩形
  function drawBottom(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'left';
    let w = getColWidth(0);
    const y = canvasHeight.value - bottomHeight.value;
    const x = firColScaleWidth.value;
    const h = bottomHeight.value;
    ctx.fillStyle = '#2d7eb5';
    ctx.rect(x, y, w + x, h);
    ctx.rect(getBaseOffset(), y, WidthList[0], h);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    for (let index = 0; index < 6; index++) {
      ctx.moveTo(getBaseOffset() + w * (index + 1), y);
      ctx.lineTo(getBaseOffset() + w * (index + 1), canvasHeight.value);
    }
    ctx.stroke();
    ctx.closePath();
  }

  // 计算当前台阶到第一级台阶的宽度差和
  function getDiffW(num: number): number {
    return WidthList.map((h: number, i: number) => h - WidthList[i + 1])
      .slice(0, num)
      .reduce((total: number, cur: number) => cur / 2 + total, 0);
  }

  function getXY(num: number, index: number): Array<number> {
    const w = WidthList[num] / 7;
    const oldH = heighthList
      .slice(0, num + 1)
      .reduce((total: number, cur: number) => cur + total, 0);
    const y = canvasHeight.value - bottomHeight.value - oldH - colHeight.value * num;
    return [getBaseOffset() + getDiffW(num) + w * (index + 1), y];
  }

  function fillText(
    ctx: CanvasRenderingContext2D,
    text: string,
    color: string,
    offsetY: number,
    w: number,
    x: number,
    y: number,
    h: number,
    isOffsetX = false,
  ) {
    let centerx = getCenterX(x - w, x - w, x, x, y, y - h, y - h, y) - 10;
    if (isOffsetX) {
      centerx += ctx.measureText(text).width + 12;
    }
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillText(text, centerx, y + offsetY);
    ctx.closePath();
  }

  // 寻找矩形中心点
  function getCenterX(
    x1: number,
    x2: number,
    x3: number,
    x4: number,
    y1: number,
    y2: number,
    y3: number,
    y4: number,
  ): number {
    return (
      (x2 * x3 * y1 -
        x3 * x4 * y1 -
        x1 * x4 * y2 +
        x3 * x4 * y2 -
        x1 * x2 * y3 +
        x1 * x4 * y3 +
        x1 * x2 * y4 -
        x2 * x3 * y4) /
      (x2 * y1 - x4 * y1 - x1 * y2 + x3 * y2 - x2 * y3 + x4 * y3 + x1 * y1 - x3 * y4)
    );
  }

  // 台阶正面的文字&左侧标签
  function setFrontText(ctx: CanvasRenderingContext2D, num: number, taItem: TAItem | null) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.setLineDash([5, 5]);
    for (let index = 0; index < 7; index++) {
      const ta = taItem?.target.data[index];
      const w = getColWidth(num);
      let [x, y] = getXY(num, index);
      const h = heighthList[num];

      // 左侧标签
      if (index == 0) {
        ctx.fillStyle = '#2d7eb5';
        ctx.textAlign = 'center';
        ctx.font = 'normal bold 18px Microsoft YaHei';
        const text = num < 4 && taItem && taItem.target.headerText ? taItem.target.headerText : '';
        const tw = ctx.measureText(text).width;
        const tx = x - tw / 2 - w - 15;
        ctx.fillText(text, tx, y + h / 2);

        // 虚线
        if (taItem && props.chartData?.markLine?.show && (num === 1 || num === 2)) {
          ctx.moveTo(x - w, y + h);
          ctx.lineTo(x - tw - w - 60, y + h);
          ctx.stroke();
        }
      }
      ctx.closePath();
      ctx.beginPath();

      // 台阶正面文字部分
      ctx.font = 'normal bold 20px Microsoft YaHei';
      ctx.textAlign = 'center';
      fillText(ctx, `${ta?.value || ''}`, '#2d7eb5', 5, w, x, y + h / 2, h);
      ctx.font = 'normal bold 16px Microsoft YaHei';
      fillText(ctx, `${ta?.subscript || ''}`, '#2d7eb5', 12, w, x, y + h / 2, h, true);
      fillText(ctx, `${ta?.superscript || ''}`, '#2d7eb5', -5, w, x, y + h / 2, h, true);
    }

    ctx.closePath();
    ctx.setLineDash([]);
  }

  // 台阶上面文字&左侧标签&颜色填充
  function setTopText(ctx: CanvasRenderingContext2D, num: number, taItem: TAItem | null) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    for (let index = 0; index < 7; index++) {
      const ta = taItem?.actual.data[index];
      const w = getColWidth(num);
      let [x, y] = getXY(num, index - 1);
      const [nx, ny] = getXY(num + 1, index - 1);

      const nh = heighthList[num + 1];
      const nw = getColWidth(num + 1);

      ctx.beginPath();
      ctx.fillStyle = ta ? ta.bgColor : '#ffffff';
      // 需要填充颜色部分的
      ctx.moveTo(nx, ny + nh);
      ctx.lineTo(x, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(nx + nw, ny + nh);
      // ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = '#2d7eb5';
      ctx.textAlign = 'center';
      ctx.font = 'normal bold 18px Microsoft YaHei';
      ctx.beginPath();
      // 左侧标签
      if (index == 0) {
        const text = num < 4 && taItem && taItem.actual.headerText ? taItem.actual.headerText : '';
        const tw = ctx.measureText(text).width;
        const tx = x - tw / 2;
        ctx.fillText(text, tx, y - colHeight.value / 2);
      }

      // 台阶上面文字
      const text = `${ta?.value || ''}${ta?.subscript || ''}${ta?.superscript || ''}`;
      ctx.font = 'normal bold 15px Microsoft YaHei';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      const cx = getCenterX(nx, x, x + w, nx + nw, ny + nh, y, y, ny + nh);
      text && ctx.fillText(text, cx, y - colHeight.value / 2);
    }

    ctx.closePath();
  }

  // 台阶的正面长方形方格
  function drawFront(ctx: CanvasRenderingContext2D, num: number) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'left';
    const h = heighthList[num];
    let [x, y] = getXY(num, -1);
    ctx.fillStyle = '#d9d9d9';
    ctx.rect(x, y, WidthList[num], h);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    for (let index = 0; index < 6; index++) {
      let [x, y] = getXY(num, index);
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + h);
    }
    ctx.stroke();
    ctx.closePath();
  }

  // 台阶的上面不规则矩形方格
  function drawTop(ctx: CanvasRenderingContext2D, num: number) {
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'left';
    const h = heighthList[num];
    ctx.beginPath();
    const apx = 70;
    for (let index = 0; index < 8; index++) {
      const [x, y] = getXY(num, index - 1);
      const [lx, ly] = getXY(num - 1, index - 1);
      ctx.moveTo(x, y + h);
      ctx.lineTo(lx, ly);
      if (num === 4) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [cx, _] = getXY(num, -1);
        ctx.moveTo(cx + WidthList[num] / 2, apx);
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.closePath();
    if (num == 4) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [cx, _] = getXY(num, -1);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [x, y] = getXY(num, 0);
      ctx.moveTo(cx + 50, apx * 2);
      ctx.lineTo(x + 170, apx * 2);
      ctx.stroke();
      ctx.fillStyle = '#2d7eb5';
      ctx.textAlign = 'center';
      ctx.font = '32px Microsoft YaHei';
      const text = props.chartData.title.centerText || '';
      ctx.fillText(text, cx + WidthList[num] / 2, apx + 35);
      ctx.closePath();
    }
  }
</script>

<style lang="less" scoped>
  .chart-wrap {
    line-height: normal;
    display: flex !important;
    margin: 0 auto;
    border: 4px dashed grey;
    .chart-inner {
      display: flex;
      transform-origin: left top;
      position: relative;
      align-self: center;
      justify-self: center;
      margin: 0 auto;
      canvas {
        position: relative;
      }
      .bottom-labels {
        position: absolute;
        bottom: 1px;
        left: 0;
        display: flex;
        align-items: center;
        .bl-item {
          position: relative;
          width: 100%;
          color: #fff;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          p {
            padding: 0;
            margin: 0;
            white-space: pre-wrap;
          }
          .label {
            position: absolute;
            right: 5px;
            top: 0;
            font-size: 12px;
          }
        }
      }
      .legend {
        width: 250px;
        position: absolute;
        top: 40px;
        right: 0;
        .legend-item {
          text-align: left;
          display: flex;
          margin-bottom: 1rem;
          .mark-color {
            width: 50px;
            height: 25px;
            margin-right: 15px;
            border: 1px #000 solid;
          }
          p {
            margin: 0;
            padding: 0;
            white-space: pre-wrap;
            line-height: 25px;
            font-size: 18px;
            color: #000;
          }
        }
      }
      .titles {
        width: 50%;
        position: absolute;
        left: 0;
        top: 0;
        h2,
        h3 {
          margin: 0;
          padding: 0;
          text-align: left;
        }
        h2 {
          font-size: 32px;
          margin-bottom: 1rem;
        }
        h3 {
          font-size: 28px;
        }
      }
    }
  }
</style>
