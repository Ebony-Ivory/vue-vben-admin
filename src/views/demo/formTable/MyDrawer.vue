<template>
  <BasicDrawer
    @register="register"
    v-bind="$attrs"
    :title="getTitle"
    width="30%"
    showFooter
    @ok="handleOk"
  >
    <BasicForm @register="registerForm"> </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { computed } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);
  let getTitle = computed(() => {
    return '新增';
  });

  //form配置
  const formSchema: FormSchema[] = [
    {
      field: 'p1',
      component: 'Select',
      labelWidth: 120,
      label: 'Select',
      colProps: {
        span: 24,
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
        span: 24,
      },
    },
    {
      field: 'p3',
      component: 'DatePicker',
      labelWidth: 120,
      label: '日期',
      colProps: {
        span: 24,
      },
    },
  ];

  const [registerForm, { resetFields, getFieldsValue, validateFields, setFieldsValue }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  //drawer打开的操作
  const [register, { closeDrawer }] = useDrawerInner((data) => {
    resetFields();
    setFieldsValue({
      id: '11111',
      p1: '22222',
      p2: '33333',
    });
  });

  async function handleOk() {
    //调用提交API
    await validateFields();
    let formData = getFieldsValue();
    console.log('🚀 🔶 handleOk 🔶 formData=>', formData);

    //@ts-ignore
    //模拟提交接口
    let res = await Promise.resolve(true);

    if (res) {
      closeDrawer();
      emit('success', {});
    } else {
      createMessage.error('提交失败,请检查输入');
      return;
    }
  }
</script>
