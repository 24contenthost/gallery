FROM php:8.2-fpm-alpine

RUN apk update && apk add --no-cache \
      libpng-dev \
      libzip-dev \
      zip \
      unzip \
      git && \
    docker-php-ext-install \
      pdo_mysql \
      bcmath \
      gd \
      zip && \
    rm -rf /var/cache/apk/*

COPY .docker/local/php.ini /usr/local/etc/php/conf.d/

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install

EXPOSE 9000

CMD ["php-fpm"]
