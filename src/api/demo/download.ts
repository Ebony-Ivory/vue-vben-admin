import { downloadServiceHttp } from '/@/utils/http/axios/httpInstance';

enum Api {
  DownloadFiles = '/file/export',
}

export const downloadApi = () =>
  downloadServiceHttp.get(
    {
      responseType: 'blob',
      url: Api.DownloadFiles,
    },
    {
      isReturnNativeResponse: true,
    },
  );
