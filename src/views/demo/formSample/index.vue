<template>
  <div>
    <BasicForm class="bg-white" @register="registerForm" @submit="submitFormInside"> </BasicForm>
    <Button type="success" @click="getFormOutside">外部获取Form</Button>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { Button } from '/@/components/Button';
  function getFormOutside() {
    console.log('🚀 🔶 getFormOutside 🔶 getFormOutside=>', getFieldsValue());
    console.log('date type=>', typeof getFieldsValue().sDate);
  }
  function submitFormInside(submitDataInside) {
    console.log('🚀 🔶 submitFormInside 🔶 submitDataInside=>', submitDataInside);
    console.log('date type=>', typeof submitDataInside.sDate);
  }

  const schemas: FormSchema[] = [
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
      field: 'sDate',
      component: 'DatePicker',
      label: '单个日期',
      colProps: {
        span: 6,
      },
      componentProps: {
        // 默认
        // valueFormat: 'YYYY-MM-DD HH:mm"ss',
        //手动指定格式
        valueFormat: 'YYYY-MM-DD',
      },
    },
  ];
  const [registerForm, { getFieldsValue }] = useForm({
    schemas: schemas,
    labelWidth: 100,
    actionColOptions: { span: 24 },
    showActionButtonGroup: true,
  });
</script>
