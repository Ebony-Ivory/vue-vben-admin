import * as echarts from 'echarts/core';

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
  GaugeChart,
  EffectScatterChart,
} from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  //标记组件
  MarkLineComponent,
  MarkPointComponent,
  // 数据集组件
  DatasetComponent,
  //通过ComposeOption引入?
  // DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  SVGRenderer,
  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  ScatterChart,
  GaugeChart,
  EffectScatterChart,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  MarkLineComponent,
  MarkPointComponent,
  CanvasRenderer,
]);

export default echarts;
