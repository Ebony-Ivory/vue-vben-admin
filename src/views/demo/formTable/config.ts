import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      defaultHidden: true,
    },

    {
      title: 'A列',
      dataIndex: 'a',
      width: 100,
    },
    {
      title: 'B列',
      dataIndex: 'b',
      width: 100,
    },
    {
      title: 'C列',
      dataIndex: 'c',
      width: 100,
    },
   
  ];
}

export function getTableSearchFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD']],
    schemas: [
      {
        field: 'p1',
        component: 'Select',
        label: 'Select',
        colProps: {
          span: 6,
        },
        componentProps: {
          options: [
            {
              value: 'HDP6',
              label: 'HDP6',
            },
          ],
        },
      },
      {
        field: 'p2',
        component: 'Input',
        labelWidth: 120,
        label: 'Input',
        colProps: {
          span: 6,
        },
      },

      {
        field: 'fieldTime',
        component: 'RangePicker',
        label: '时间范围',
        colProps: {
          span: 6,
        },
      },
    ],
  };
}
