# 2.1.0 (2017-11-17)

## 功能调整

1. 将`OpaqueToken`替换为`InjectionToken`, 以配合`angular 5`的升级

# 2.0.0 (2017-06-07)

## breaking changes

1. 使用`generator-angular2-library`重新发布了包, 现在提供`ESM`和`UMD`两种版本的输出, 不再为各个导出方法/服务提供独立的js文件.

# 1.0.1

## bug fixes

1. 修复`QQMapWsApi`中`translate`和`geocoder`接口参数的错误

# 1.0.0

## 新增功能

1. 建立项目
2. 添加了`QQMapWsApi`服务
3. 添加了`translate`方法用户将其他图商的坐标转换为qq地图的坐标
4. 添加了`geocoder`逆地理解析接口, 用于将坐标转换为地址信息(文本描述)