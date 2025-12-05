FROM php:8.4-cli

RUN apt update && apt install --no-install-recommends -y \
  python3-pip chromium nodejs npm unzip curl \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

RUN cd /usr/bin && curl https://getcomposer.org/installer | php

WORKDIR /app

COPY composer.json composer.lock requirements.txt /app/

RUN composer.phar install

RUN npx -y playwright install --with-deps chromium

RUN pip install -r requirements.txt --break-system-packages

CMD php -S 0.0.0.0:8000 &
