# Базовый образ PHP с FPM
FROM php:8.2-fpm-alpine

RUN apk update && \
    apk add --no-cache \
      libpng-dev \
      libjpeg-turbo-dev \
      freetype-dev \
      libzip-dev \
      zip \
      unzip \
      git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install \
      pdo_mysql \
      bcmath \
      gd \
      zip && \
    rm -rf /var/cache/apk/*

COPY  .docker/prod/php.ini /usr/local/etc/php/conf.d/

WORKDIR /var/www

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www && \
    chmod -R 775 /var/www/storage && \
    chmod -R 775 /var/www/bootstrap/cache

USER www-data

EXPOSE 9000

CMD ["php-fpm"]



