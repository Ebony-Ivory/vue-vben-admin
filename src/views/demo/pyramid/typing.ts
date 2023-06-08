/*
 * @Date: 2023-03-20 22:14:40
 * @LastEditTime: 2023-03-27 16:51:43
 * @Description: file content
 */

export interface DataItem {
    value: number;
    superscript: string;
    subscript: string;
    bgColor: string;
  }
  
  export interface ColHeader {
    text: string;
    bgColor: string;
    superscript: string;
  }
  
  export interface Legend {
    text: string;
    markColor: string;
  }
  
  export interface Data {
    headerText: string;
    data: Array<DataItem>;
  }
  
  export interface TAItem {
    actual: Data;
    target: Data;
  }
  export type RowData = Array<TAItem>;
  
  export interface ChartData {
    title: {
      leftText1: string;
      leftText2: string;
      centerText: string;
    };
    legend: Array<Legend>;
    markLine: {
      show: boolean;
    };
    colHeader: Array<ColHeader>;
    rowData: RowData;
  }
  