<template>
  <div>
    <Card title="跨页面通讯(源页面)">
      <BasicForm @register="registerForm"></BasicForm>
      <Button
        type="primary"
        class="m-1"
        @click="postMsg"
        :loading="btnLoad"
        :preIcon="'solar:round-transfer-vertical-linear'"
      >
        传输数据
      </Button>
    </Card>
    <Card title="跨页面通讯(目标页面)" class="mt-2">
      <iframe
        id="targetPage"
        ref="iframeRef"
        height="1000"
        width="100%"
        frameborder="no"
        scrolling="no"
        :src="iframeSrcRef"
      ></iframe>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { Button } from '/@/components/Button';
  import { ref, onMounted } from 'vue';

  //参考.ReceiverPage.vue,自行搭建测试页面
  let iframeSrcRef = ref('http://localhost:9999');
  let iframeRef = ref();
  let btnLoad = ref(true);

  //form配置
  const formLabelWidth = 120;
  const formSchema: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      labelWidth: formLabelWidth,
      // label: '传输文本',
      // defaultValue: 'aaaa',
      componentProps: {
        placeholder: '要传输的内容',
      },
    },
  ];

  const [registerForm, { getFieldsValue, validateFields }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  //等待ifram加载
  function waitIframeLoad() {
    if (iframeRef.value.attachEvent) {
      iframeRef.value.attachEvent('onload', function () {
        btnLoad.value = false;
      });
    } else {
      iframeRef.value.onload = function () {
        btnLoad.value = false;
      };
    }
  }

  //提交数据
  async function postMsg() {
    await validateFields();
    let formData = getFieldsValue();
    console.log('🚀 🔶 源页面发送 🔶 formData.field1=>', formData.field1);
    iframeRef.value.contentWindow.postMessage(formData.field1, '*');
  }

  onMounted(() => {
    waitIframeLoad();
  });
</script>
