## 参考地址：https://zhuanlan.zhihu.com/p/72616216?utm_source=wechat_session&ivk_sa=1024320u

## http协议是什么
超文本传输协议，他是从web服务器传输超文本标记语言（html）到浏览器的传输协议。

## http原理
http是基于TCP/IP通信协议来传递数据的协议，传输的数据类型为HTML 文件,、图片文件, 查询结果等。
1、dns域名解析为服务器ip
2、发起TCP请求，三次握手建立连接
3、http请求
4、http响应

## http特点
1、http协议支持客户端/服务端模式，也是一种请求/响应模式的协议。
2、简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST、DELETE、PUT
3、灵活：HTTP允许传输任意类型的数据对象。传输的类型由Content-Type加以标记。
4、无连接：限制每次连接只处理一个请求。服务器处理完请求，并收到客户的应答后，即断开连接，但是却不利于客户端与服务器保持会话连接，为了弥补这种不足，产生了两项记录http状态的技术，一个叫做Cookie,一个叫做Session。
5、无状态：无状态是指协议对于事务处理没有记忆，后续处理需要前面的信息，则必须重传。

## URI和URL的区别
URI：Uniform Resource Identifier 统一资源标识符
URL：Uniform Resource Location 统一资源定位符

URI 是用来标示一个具体的资源的，我们可以通过 URI 知道一个资源是什么。（资源是什么）
URL 则是用来定位具体的资源的，标示了一个具体的资源位置。互联网上的每个文件都有一个唯一的URL。（资源地址是什么）

## post和get的区别
都包含请求头请求行，post多了请求body。
get多用来查询，请求参数放在url中，不会对服务器上的内容产生作用。post用来提交，如把账号密码放入body中。
GET是直接添加到URL后面的，直接就可以在URL中看到内容，而POST是放在报文内部的，用户无法直接看到。
GET提交的数据长度是有限制的，因为URL长度有限制，具体的长度限制视浏览器而定。而POST没有。

## 响应状态码

### 状态码分类：
1XX- 信息型，服务器收到请求，需要请求者继续操作。
2XX- 成功型，请求成功收到，理解并处理。
3XX - 重定向，需要进一步的操作以完成请求。
4XX - 客户端错误，请求包含语法错误或无法完成请求。
5XX - 服务器错误，服务器在处理请求的过程中发生了错误。

### 常见状态码
200 OK - 客户端请求成功
301 - 资源（网页等）被永久转移到其它URL
302 - 临时跳转
304 - 读取浏览器缓存
400 Bad Request - 客户端请求有语法错误，不能被服务器所理解
401 Unauthorized - 请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
404 - 请求资源不存在，可能是输入了错误的URL
500 - 服务器内部发生了不可预期的错误
503 Server Unavailable - 服务器当前不能处理客户端的请求，一段时间后可能恢复正常。

## http缺点：
请求信息明文传输，容易被窃听截取。
数据的完整性未校验，容易被篡改
没有验证对方身份，存在冒充危险

## https缺点：
HTTPS协议多次握手，导致页面的加载时间延长近50%；
HTTPS连接缓存不如HTTP高效，会增加数据开销和功耗；
申请SSL证书需要钱，功能越强大的证书费用越高。
SSL涉及到的安全算法会消耗 CPU 资源，对服务器资源消耗较大。

## https是什么
https理解为http请求+SSL/TLS，通过SSL整数来验证服务器的身份，并且浏览器和服务器之间的通信进行加密。

## SSL是什么
SSL（Secure Socket Layer，安全套接字层）：1994年为 Netscape 所研发，SSL 协议位于 TCP/IP 协议与各种应用层协议之间，为数据通讯提供安全支持。

TLS（Transport Layer Security，传输层安全）：其前身是 SSL，它最初的几个版本（SSL 1.0、SSL 2.0、SSL 3.0）由网景公司开发，1999年从 3.1 开始被 IETF 标准化并改名，发展至今已经有 TLS 1.0、TLS 1.1、TLS 1.2 三个版本。SSL3.0和TLS1.0由于存在安全漏洞，已经很少被使用到。TLS 1.3 改动会比较大，目前还在草案阶段，目前使用最广泛的是TLS 1.1、TLS 1.2。

## HTTPS传输数据流程 

### 参考地址：https://zhuanlan.zhihu.com/p/56663184

### 第一步：客户端向服务端发起请求
（1）客户端生成随机数R1 发送给服务端；
（2）告诉服务端自己支持哪些加密算法；

### 第二步：服务器向客户端发送数字证书
（1）服务端生成随机数R2;
（2）从客户端支持的加密算法中选择一种双方都支持的加密算法（此算法用于后面的会话密钥生成）;
（3）服务端生成把证书、随机数R2、会话密钥生成算法，一同发给客户端;

### 第三步：客户端验证数字证书
（1）验证证书的可靠性，先用CA的公钥解密被加密过后的证书,能解密则说明证书没有问题，然后通过证书里提供的摘要算法进行对数据进行摘要，然后通过自己生成的摘要与服务端发送的摘要比对。
（2）验证证书合法性，包括证书是否吊销、是否到期、域名是否匹配，通过后则进行后面的流程
（3）获得证书的公钥、会话密钥生成算法、随机数R2
（4）生成一个随机数R3。
（5）根据会话秘钥算法使用R1、R2、R3生成会话秘钥。
（6）用服务端证书的公钥加密随机数R3并发送给服务端。

### 第四步：服务器得到会话密钥
（1）服务器用私钥解密客户端发过来的随机数R3
（2）根据会话秘钥算法使用R1、R2、R3生成会话秘钥

### 第五步：客户端与服务端进行加密会话
（1）客户端发送加密数据给服务端
发送加密数据：客户端加密数据后发送给服务端。
（2）服务端响应客户端
解密接收数据：服务端用会话密钥解密客户端发送的数据；
加密响应数据：用会话密钥把响应的数据加密发送给客户端。
（3）客户端解密服务端响应的数据
解密数据：客户端用会话密钥解密响应数据；