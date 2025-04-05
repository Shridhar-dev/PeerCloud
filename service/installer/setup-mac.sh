#!/bin/bash
echo "Installing 'peer://' protocol handler on macOS..."

PLIST=~/Library/LaunchAgents/peer.protocol.plist

cat <<EOF > $PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
 "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>peer.protocol.handler</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Applications/PeerApp.app/Contents/MacOS/PeerApp</string>
        <string>%u</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF

launchctl load $PLIST

echo "Done."
