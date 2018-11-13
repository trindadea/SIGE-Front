#!/bin/bash

echo "Building up environment ..."

yarn install

yarn quasar dev --mode pwa
