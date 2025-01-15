FROM nginx:stable-alpine

COPY .deploy/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
