import { OpaqueToken } from '@angular/core';

export interface QQMapWsApiConfig {

    /**
     * 接口调用凭证, 需求前往腾讯地图处申请.
     * 
     * @type {string}
     * @memberof QQMapWsApiConfig
     */
    key: string;
}

export const QQ_MAP_WS_API_CONFIG = new OpaqueToken('QQ_MAP_WS_API_CONFIG');