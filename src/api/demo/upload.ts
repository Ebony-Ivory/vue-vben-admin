import { uploadServiceHttp } from '/@/utils/http/axios/httpInstance';
import { MixSubmitModel } from '/@/api/demo/model/uploadModel';
import type { UploadFileListParams } from '/#/axios';
import { toUploadFileListParams } from '/@/utils/http/axios/helper';

enum Api {
  UploadFiles = '/file/uploadList',
  submitFileAndData = '/file/submitFileAndData',
}

//仅文件上传,不需要额外包装
export const uploadFileList = (params: UploadFileListParams) =>
  uploadServiceHttp.uploadFileList<string>(
    {
      //默认就是FORM_DATA
      // headers: {
      //   'Content-Type': ContentTypeEnum.FORM_DATA,
      // },
      url: Api.UploadFiles,
    },
    params,
  );
//数据和文件上传混合,需要额外转换
export const submitFileAndData = (data: MixSubmitModel) =>
  uploadServiceHttp.uploadFileList<string>(
    {
      url: Api.UploadFiles,
      //默认POST,有特殊情况在这里指定
      method: 'PUT',
    },
    //统一转换方法
    toUploadFileListParams(data),
  );
