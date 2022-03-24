import request from './request'
const apiVersion = '/api/v1'

export const ConfigService = {
  getTicket: (params) => {
    return request.get(apiVersion + '/login/signature/nonce', params).then(res => res)
  },
  /**
   * @param tenantAccount true/false
   */
  getKeyAndSecret: (params) => {
    return request.get(apiVersion + '/umeet/configs/network-api', { params }).then(res => res)
  },
  // 批量上传文件
  batchUploadFile: (params) => {
    return request.post(apiVersion + '/system/file/upload/batch', params).then(res => res);
  },
}
