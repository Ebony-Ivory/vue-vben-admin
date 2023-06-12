<template>
  <div>
    <Upload
      v-model:file-list="fileList"
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
    <Button @click="handleOk"> 提交 </Button>
  </div>
</template>
<script lang="ts" setup>
  import { Upload, Button, Tag } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { uploadFileList } from '/@/api/demo/upload';
  import { ref } from 'vue';
  import type { UploadFileListParams } from '/#/axios';
  const fileList = ref<UploadProps['fileList']>([]);

  //选择自行上传
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    //@ts-ignore
    fileList.value = [...fileList.value, file];
    return false;
  };

  //删除文件
  const handleRemove: UploadProps['onRemove'] = (file) => {
    //@ts-ignore
    const index = fileList.value.indexOf(file);
    //@ts-ignore
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
  };

  //提交文件
  async function handleOk() {
    //调用上传API
    let uploadParam: UploadFileListParams = { files: [] };
    //自定义的额外信息
    uploadParam.data = {};
    uploadParam.files = fileList.value?.map((x) => x.originFileObj) as File[];
    uploadParam.name = 'fileListField';

    //@ts-ignore
    let res = await uploadFileList(uploadParam);
  }
</script>
