#!/bin/bash

cp './docs/lhs.config.json' './dist'
zip -r "./release/https-server-$npm_package_version.zip" \
  './dist' './mocks-response' \
  package.json README.md
