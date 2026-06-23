#!/usr/bin/env bash
set -e

# Clone repository if it doesn't exist
if [ ! -d "valkey" ]; then
  git clone https://github.com/valkey-io/valkey.git
fi

cd valkey
make distclean || true
make -j$(nproc)
echo "Valkey build completed"
