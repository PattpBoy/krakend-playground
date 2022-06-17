#!/usr/bin/env sh
/usr/bin/krakend check -t --lint -d -c /etc/krakend/${KRAKEND_CONFIG}
exec "$@"