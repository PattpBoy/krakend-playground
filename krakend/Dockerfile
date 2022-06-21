ARG KRAKEND_VERSION
FROM devopsfaith/krakend:${KRAKEND_VERSION:-2.0.5}
USER root

COPY docker-entrypoint.sh /usr/bin/docker-entrypoint.sh

RUN set -eux && \
    apk upgrade --update --no-cache && \
    apk add --no-cache \
      curl && \
    cd /tmp && \
    curl -sLf -o /tmp/reflex.tar.gz https://github.com/cespare/reflex/releases/download/v0.3.1/reflex_linux_amd64.tar.gz && \
    tar -xvf /tmp/reflex.tar.gz && \
    mv /tmp/reflex_linux_amd64/reflex /usr/bin/reflex && \
    chmod +x /usr/bin/reflex && \
    chmod +x /usr/bin/docker-entrypoint.sh

WORKDIR /etc/krakend
USER krakend
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]
CMD ["/usr/bin/reflex", "-g", "*.json", "-s", "--", "/usr/bin/krakend", "run", "-d", "-c", "krakend.json"]
