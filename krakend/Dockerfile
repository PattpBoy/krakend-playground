FROM devopsfaith/krakend:2.0.5
USER root

ARG KRAKEND_CONFIG
ENV KRAKEND_CONFIG=${KRAKEND_CONFIG:-"krakend.json"}

COPY docker-entrypoint.sh /usr/bin/docker-entrypoint.sh

RUN set -eux && \
    apk upgrade --update --no-cache && \
    apk add --no-cache \
      curl && \
    curl -sLf -o /usr/bin/reflex https://github.com/cespare/reflex/releases/download/v0.3.1/reflex_linux_amd64.tar.gz && \
    chmod +x /usr/bin/reflex && \
    chmod +x /usr/bin/docker-entrypoint.sh

WORKDIR /etc/krakend
USER krakend
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]
CMD ["/usr/bin/reflex", "-r", "\/etc\/krakend\/*.json$", "-s",  "--", "/bin/sh", "-c", "/usr/bin/krakend run -c /etc/krakend/${KRAKEND_CONFIG} -d"]
