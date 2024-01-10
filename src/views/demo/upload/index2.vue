<template>
  <Card title="文件和数据混合表单">
    <BasicForm @register="registerForm">
      <template #FileUpload="{ model, field }">
        <Upload
          v-model:file-list="selectedFileList"
          :before-upload="beforeUpload"
          @remove="handleRemove"
        >
          <Button>
            <upload-outlined></upload-outlined>
            点击选择要上传的文件
          </Button>

          <template #itemRender="{ file, actions }">
            <div class="mt-1">
              <a href="javascript:;" @click="actions.remove">
                <Tag :color="'red'">Delete</Tag>
              </a>
              <span>{{ file.name }}</span>
            </div>
          </template>
        </Upload>
      </template></BasicForm
    >
    <Button class="mt-1" @click="handleOk"> 提交 </Button>
  </Card>
</template>
<script lang="ts" setup>
  import { Upload, Button, Tag, Card } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { submitFileAndData } from '/@/api/demo/upload';
  import { FormSchema } from '/@/components/Table';
  import { ref } from 'vue';
  // import { commit } from '/@/api/bcs/syncControllerApi';;
  const selectedFileList = ref<UploadProps['fileList']>([]);

  //form配置
  const formLabelWidth = 120;
  const formSchema: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      labelWidth: formLabelWidth,
      label: '文本1',
    },

    {
      field: 'field2',
      component: 'InputTextArea',
      labelWidth: formLabelWidth,
      label: '文本2',
      required: true,
    },

    {
      field: 'fileList',
      component: 'Input',
      labelWidth: formLabelWidth,
      label: '上传附件',
      required: true,
      slot: 'FileUpload',
    },
  ];

  const [registerForm, { getFieldsValue, validateFields, setFieldsValue }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  //选择自行上传
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    //@ts-ignore
    let temp: File[] = [...(selectedFileList.value?.map((x) => x.originFileObj) as File[]), file];
    setFieldsValue({
      fileList: temp,
    });
    return false;
  };

  const handleRemove: UploadProps['onRemove'] = (file) => {
    //@ts-ignore
    const index = selectedFileList.value.indexOf(file);
    selectedFileList.value?.splice(index, 1);
    setFieldsValue({
      fileList: [...(selectedFileList.value?.map((x) => x.originFileObj) as File[])],
    });
  };

  async function handleOk() {
    //调用提交API
    await validateFields();
    let formData = getFieldsValue();
    console.log('🚀 🔶 handleOk 🔶 formData=>', formData);

    //@ts-ignore
    //接口处转换数据类型
    let res = await submitFileAndData(formData);
  }
</script>
