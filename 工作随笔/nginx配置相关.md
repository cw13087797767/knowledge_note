## 2022-02-17遇到一个nginx配置问题，因为错的很巧妙，所以一直没有发现

### 问题起因及具体处理过程
因为之前部署前端资源后，页面访问时会有一个缓存，加载之前旧的资源。所以特地改了nginx的配置，加上请求头 add_header Cache-Control 'no-cache, no-store'; 用于禁用强缓存和协商缓存。
配置如下：

location ~* \.(js|css|woff|ttf|png|jpg|gif|swf|html|htm|ico)$ {
    charset utf-8;
    root /opt/szgj/szgj-rest-51908/staticpage/dist/;   
    break;
}

location / {
	add_header Cache-Control 'no-cache, no-store';
    root /opt/szgj/szgj-admin-51808/staticpage/dist/;
    try_files $uri $uri/ @router;
    index  index.html index.htm;
    break;
}

location @router {
    rewrite ^.*$ /index.html last;
}

我们处理的方法时在匹配路由时加上一个禁止缓存的请求头，然后把请求静态资源的正则配置把html|htm给他删掉，然后这时候问题出现了。我们访问页面的时候发现html文件可以正常加载，但是加载的js文件和css文件是不一样的，应该是配置在转发的时候出现了问题。

多亏了一个同事帮忙发现了问题，原来是两个配置的路径不一样，之前有一个旧的版本，路径是 szgj-admin-51808。现在新的版本用的是szgj-admin-51808。所以在路由匹配的时候，能正常访问，因为匹配静态资源的时候，上面的优先执行，匹配到了新的目录去。但是如果把html|htm给删了之后，就会去旧的目录进行匹配。
