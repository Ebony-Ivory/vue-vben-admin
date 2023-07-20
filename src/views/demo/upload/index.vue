<template>
  <Card title="仅文件">
    <Upload
      v-model:file-list="selectedFileList"
      :multiple="true"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <Button>
        <upload-outlined></upload-outlined>
        点击选择要上传的文件
      </Button>

      <template #itemRender="{ file, actions }">
        <div class="mt-1">
          <a href="javascript:;" @click="actions.remove"> <Tag :color="'red'">Delete</Tag></a>
          <span>{{ file.name }}</span>
        </div>
      </template>
    </Upload>
    <Button class="m-1" @click="handleOk"> 提交 </Button>

    <Authority :value="['wxp-template-vue.demo.upload1.btn.updateSth', 'defaultValue']">
      <Button class="m-1" type="primary"> 上传页面的鉴权按钮 </Button>
    </Authority>
  </Card>
</template>
<script lang="ts" setup>
  import { Upload, Button, Tag } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { Card } from 'ant-design-vue';
  import { uploadFileList } from '/@/api/demo/upload';
  import { ref } from 'vue';
  import { Authority } from '/@/components/Authority';
  import type { UploadFileListParams } from '/#/axios';
  const selectedFileList = ref<UploadProps['fileList']>([]);

  //选择绑定selectedFileList之前自行处理
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    //不含当前选择文件的文件列表(原始类型)
    //@ts-ignore
    let temp: File[] = [...(selectedFileList.value?.map((x) => x.originFileObj) as File[])];
    return false;
  };

  //删除文件
  const handleRemove: UploadProps['onRemove'] = (file) => {
    //@ts-ignore
    const index = selectedFileList.value.indexOf(file);
    //@ts-ignore
    //删除文件
    selectedFileList.value?.splice(index, 1);
  };

  //提交文件
  async function handleOk() {
    //调用上传API
    let uploadParam: UploadFileListParams = { files: [] };
    //自定义的额外信息
    uploadParam.data = {};
    //类型转换
    uploadParam.files = selectedFileList.value?.map((x) => x.originFileObj) as File[];
    uploadParam.name = 'fileListField';

    //@ts-ignore
    let res = await uploadFileList(uploadParam);
  }
</script>
