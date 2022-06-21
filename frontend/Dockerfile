FROM node:14-alpine

ARG APP_ENV
ARG APP_PORT
ARG APP_WORKDIR

ENV NODE_ENV=${APP_ENV:-production}
ENV PORT=${APP_PORT:-3000}
ENV WORK_DIR=${APP_WORKDIR:-/home/node/app}

USER root
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN set -x && \
  apk add --no-cache --update \
    bash \
    curl \
    nano \
    vim && \
  chmod +x /usr/local/bin/docker-entrypoint.sh

COPY --chown=node:node . ${WORK_DIR}
WORKDIR ${WORK_DIR}
USER node

EXPOSE ${APP_PORT}
STOPSIGNAL SIGTERM
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "start:dev"]
