#!/usr/bin/env sh

echo "Linting KrakenD configuration"
/usr/bin/krakend check -t --lint -d -c /etc/krakend/krakend.json

echo "Watching changes on files /etc/krakend/"
exec "$@"
