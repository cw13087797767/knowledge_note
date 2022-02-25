## 简单请求
1、满足三种请求方式 HEAD、GET、POST
2、HTTP的头信息不超出以下几种字段 Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type
Content-Type的值，只限于三个值： application/x-www-form-urlencoded、multipart/form-data、text/plain

## 复杂请求
非简单请求就是复杂请求。复杂请求的CORS请求，会在正式通信之前，由浏览器代发一个http查询请求，也称预检。用来向服务器请求权限。预检请求为OPTIONS。
axios默认请求都是复杂请求，因为默认是Content-Type：application/json

## 参考地址：https://zhuanlan.zhihu.com/p/101074873