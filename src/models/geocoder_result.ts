import { LatLng } from './lat_lng';
import { WsApiResult } from './ws_api_result';

export interface GeocoderResult extends WsApiResult {
    result: {
        address: string;
        location: LatLng;
        formatted_addresses: {
            recommend: string;
            rough: string;
        };
        pois: {
            _dir_desc: string;
            _distance: number;
            ad_info: {
                adcode: string;
                city: string;
                district: string;
                province: string;
            };
            address: string;
            category: string;
            id: string;
            location: LatLng;
            title: string;
        }[];
    }
}