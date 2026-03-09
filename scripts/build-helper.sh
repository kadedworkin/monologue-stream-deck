#!/bin/bash
set -e
PLUGIN_DIR="$(cd "$(dirname "$0")/.." && pwd)/com.kadedworkin.monologue-ptt.sdPlugin"
mkdir -p "$PLUGIN_DIR/bin"
echo "Compiling Swift key helper..."
swiftc src/key-helper.swift -o "$PLUGIN_DIR/bin/key-helper"
echo "Done: $PLUGIN_DIR/bin/key-helper"
