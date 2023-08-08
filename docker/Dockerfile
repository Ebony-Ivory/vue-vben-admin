FROM registry.cn-shanghai.aliyuncs.com/c7n/frontbase:0.10.0

RUN rm /etc/nginx/conf.d/default.conf 

ADD default.conf /etc/nginx/conf.d/

COPY dist/  /usr/share/nginx/html/

# 添加运行时的环境变量
COPY ./build /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/env.sh
ENTRYPOINT ["/usr/share/nginx/html/env.sh"]

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
