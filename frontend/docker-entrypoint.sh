#!/usr/bin/env bash
set -x
PATH=$PATH:$HOME/.local/bin
echo 'export PATH="$PATH:$HOME/.local/bin"' >> /home/node/.bashrc
npm config set prefix /home/node/.local
ADDITION_NPM_INSTALL_PARAM=""
if [[ ${APP_ENV:-production} == "production" ]]; then
  ADDITION_NPM_INSTALL_PARAM="--production"
fi
npm install ${ADDITION_NPM_INSTALL_PARAM}
exec "$@"
