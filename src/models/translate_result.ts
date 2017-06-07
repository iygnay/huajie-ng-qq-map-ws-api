import { LatLng } from './lat_lng';
import { WsApiResult } from './ws_api_result';

export interface TranslateResult extends WsApiResult {
    status: number,
    message: string,
    locations: LatLng[]
}