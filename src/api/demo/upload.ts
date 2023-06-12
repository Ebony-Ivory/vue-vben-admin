import { uploadServiceHttp } from '/@/utils/http/axios/httpInstance';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import type { UploadFileListParams } from '/#/axios';

enum Api {
  UploadFiles = '/file/uploadList',
}

export const uploadFileList = (params: UploadFileListParams) =>
  uploadServiceHttp.uploadFileList<string>(
    {
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
      },
      url: Api.UploadFiles,
    },
    params,
  );
