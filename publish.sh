#!/bin/bash
# ===========================================
# Rocket+ MCP Server - NPM Publish Script
# ===========================================

set -e

echo "🚀 Publishing rocket-plus-mcp to npm..."

# Navigate to MCP directory
cd "$(dirname "$0")"

# Clean previous build
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Add shebang to compiled file for CLI usage
echo "#!/usr/bin/env node" | cat - dist/server.js > temp && mv temp dist/server.js
chmod +x dist/server.js

# Check if logged into npm
echo "🔐 Checking npm login..."
npm whoami || (echo "❌ Not logged in. Run: npm login" && exit 1)

# Publish to npm
echo "📤 Publishing to npm..."
npm publish --access public

echo ""
echo "✅ Published successfully!"
echo ""
echo "Users can now install with:"
echo "  npx -y rocket-plus-mcp"
echo ""
echo "Or add to Claude Desktop config:"
echo '  {
    "mcpServers": {
      "rocket-plus": {
        "command": "npx",
        "args": ["-y", "rocket-plus-mcp"],
        "env": {
          "ROCKET_API_URL": "https://rocketadd.com",
          "ROCKET_API_KEY": "rp_YOUR_API_KEY"
        }
      }
    }
  }'
