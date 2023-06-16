<template>
  <div>
    <Button class="m-2" type="primary" @click="donwloadFun1">
      <DownloadOutlined></DownloadOutlined>
      下载方法A
    </Button>
    <Button class="m-2" type="primary" @click="donwloadFun2">
      <DownloadOutlined></DownloadOutlined>
      下载方法B
    </Button>
  </div>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { DownloadOutlined } from '@ant-design/icons-vue';
  import { downloadByData, downloadByUrl } from '/@/utils/file/download';
  import { downloadApi } from '/@/api/demo/download';
  //方式1
  //a标签打开,浏览器方式处理
  const donwloadFun1 = () => {
    const param = {
      url: 'http://localhost:8080/file/export',
      target: '_self',
    };
    //@ts-ignore
    downloadByUrl(param);
  };

  //方式2
  const donwloadFun2 = () => {
    downloadApi().then((res) => {
      let { headers, data } = res;
      //WxP默认解析方式,有需求的话自行实现
      let cdStr = decodeURIComponent(headers['content-disposition']);
      let fileName = cdStr?.split(';')[1].match(/\"(.+)\"/)![1];
      downloadByData(data, fileName || 'defaultName.xlsx');
    });
  };
</script>
