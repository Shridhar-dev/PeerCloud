#!/bin/bash
echo "Uninstalling 'peer://' protocol handler from macOS..."

PLIST=~/Library/LaunchAgents/peer.protocol.plist

launchctl unload $PLIST
rm $PLIST

echo "Done."
