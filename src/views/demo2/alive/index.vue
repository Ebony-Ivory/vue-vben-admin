<template>
  <Card title="标签保持">
    <TypographyParagraph>
      <TypographyLink
        href="http://174.35.64.19:8080/vben280doc/guide/router.html#如何开启页面缓存"
        target="_blank"
        >查看文档</TypographyLink
      >
    </TypographyParagraph>
    <BasicForm @register="registerForm"> </BasicForm>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, TypographyParagraph, TypographyLink } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  defineOptions({ name: 'KeepAlivePage' });
  //form配置
  const formLabelWidth = 120;
  const formSchema: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      labelWidth: formLabelWidth,
      label: '文本1',
    },
  ];

  const [registerForm] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
</script>
