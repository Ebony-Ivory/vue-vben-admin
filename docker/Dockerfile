FROM registry.cn-shanghai.aliyuncs.com/c7n/frontbase:0.10.0

RUN rm /etc/nginx/conf.d/default.conf 

ADD default.conf /etc/nginx/conf.d/

COPY dist/  /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
