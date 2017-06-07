
import { Injectable, Inject } from '@angular/core';
import { QQ_MAP_WS_API_CONFIG, QQMapWsApiConfig } from './qq_map_ws_api_config';
import { Http, Response, URLSearchParams, Headers, RequestOptions, Jsonp } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LatLng } from './models/lat_lng';
import { GeocoderResult } from './models/geocoder_result';
import { GeocoderPoiOptions } from './models/geocoder_poi_options';
import { TranslateResult } from './models/translate_result';
import { WsApiResult } from './models/ws_api_result';

@Injectable()
export class QQMapWsApi {
    constructor(
        @Inject(QQ_MAP_WS_API_CONFIG) private _apiConfig: QQMapWsApiConfig,
        private _jsonp: Jsonp,
    ) { 
    }

    /**
     * 实现从其它图商坐标系或标准GPS坐标系，批量转换到腾讯地图坐标系。
     * 
     * @param locations 需要转换的值.
     * @param type 源坐标类型. type的可选值为 1：gps经纬度；2：搜狗经纬度；3：百度经纬度；4：mapbar经纬度；5：google经纬度；6：搜狗墨卡托。
     */
    async translate(locations: LatLng[], type: number) {
        let u = 'http://apis.map.qq.com/ws/coord/v1/translate';
        return this._execJsonpApi<TranslateResult>(u, {
            locations: locations.map(latLng => `${latLng.lat},${latLng.lng}`).join(';'),
            type: type.toString(),
        });
    }

    /**
     * 获取指定坐标的信息和poi列表
     * 
     * @param location
     * @param coord_type
     * @param opt
     */
    geocoder(location: LatLng, coord_type: number = 5, opt: GeocoderPoiOptions = null) : Promise<GeocoderResult> {
        let optPairs = [];
        for (let key in Object.keys(opt || {})) {
            optPairs.push(`${key}=${opt[key]}`);
        }

        let u = 'http://apis.map.qq.com/ws/geocoder/v1/';
        return this._execJsonpApi<GeocoderResult>(u, {
            get_poi: (opt ? '1' : null),
            coord_type: coord_type && coord_type.toString(),
            poi_options: optPairs.length ? encodeURIComponent(optPairs.join(';')) : null,
            location: [location.lat,location.lng].join(','),
        });
    }

    private async _execJsonpApi<T extends WsApiResult>(url: string, o: { [key: string]: string }) {
        let params = [
            `callback=JSONP_CALLBACK`,
            `output=jsonp`,
            `key=${this._apiConfig.key}`,
        ];

        for (let key of Object.keys(o)) {
            if (o[key] != null)
                params.push(`${key}=${encodeURIComponent(o[key])}`);
        }
        
        url = url + '?' + params.join('&');
        let p = this._jsonp.request(url).toPromise()
            .then(rsp => rsp.json() as T);

        let result = await p;
        if (result.status != 0)
            throw new Error(result.message);

        return result; 
    }
}