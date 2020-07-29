#!/bin/bash

zip -r "./release/https-server-$npm_package_version.zip" \
  './dist' './mocks-response' \
  package.json README.md lhs.config.json
