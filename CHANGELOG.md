# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-01-23

### Added
- **GHL MCP Integration** - Connect to GoHighLevel's official MCP server
  - `connect_ghl_mcp` - Connect using your GHL PIT token
  - `disconnect_ghl_mcp` - Disconnect GHL MCP
  - `ghl_mcp_status` - Check connection status
  - `ghl_mcp_tools` - List available GHL MCP tools
  - `ghl_mcp_call` - Execute GHL MCP tools directly

- **Multi-MCP Orchestration** - Rocket+ as a central hub
  - `mcp_call_server` - Route calls to any connected MCP (GHL, Stripe, Shopify, etc.)
  - `mcp_list_servers` - List all available MCP servers with connection status
  - `list_mcp_connections` - View your connected servers with usage stats

- **Workflow Orchestration**
  - `run_workflow` - Execute saved multi-step workflows
  - `create_workflow` - Create workflows from natural language descriptions
  - `list_workflows` - List all workflows
  - `get_workflow` - Get workflow details and actions

### Changed
- Expanded tool count to 80+
- Resources now show actual connection status from database
- Improved error messages with setup hints and documentation links
- Updated server banner to show Multi-MCP Hub status

### Architecture
- Added MCP hub capability for cross-server orchestration
- Backend now supports `mcp_connections` table for storing server credentials
- Added `mcp_server_registry` for available server catalog
- GHL MCP calls use JSON-RPC 2.0 protocol

## [2.2.0] - 2026-01-22

### Added
- Workflow orchestration tools
- Session initialization with location context
- Built-in prompts for common tasks

### Changed
- Improved API error handling with specific messages
- Better startup messages with usage hints

## [2.0.0] - 2026-01-13

### Added
- Initial public release with 50+ tools
- CRM Core tools (13): contacts, opportunities, calendars, messaging, workflows
- RocketFlow tools (3): workflow deployment, validation, templates
- Rocket Agents tools (3): AI workflow execution
- AI Course Generator tools (2): course generation
- Content AI tools (3): content generation, rewriting, ideas
- RSS Content Engine tools (3): feed management, content generation
- APEX Canvas tools (3): visual builder, AI generation, export
- Dashboard Builder tools (2): custom dashboards
- APEX AI tools (3): A/B testing, optimization
- AI Insights tools (3): analytics, predictions, reports
- Focus Flow tools (2): productivity sessions
- Auto-SEO tools (3): SEO analysis, meta tags, keywords
- Market Research tools (3): competitors, trends, ideas
- API Connections tools (2): endpoint testing
- Webhook Receiver tools (2): webhook management
- RocketPost Forms tools (2): form builder
- Realtime Visitors tools (2): visitor tracking
- CRO9 tools (2): conversion optimization (beta)
- RocketEQ Games tools (2): gamified lead capture (beta)
- MCPFED tools (2): MCP federation (beta)
- Utility tools (3): location stats, usage, mods list
- 6 MCP resources for context

### Changed
- Migrated to @modelcontextprotocol/sdk v0.5.0
- Updated to Node.js 18+ requirement

## [1.0.0] - 2025-12-01

### Added
- Initial internal release
- Basic CRM tools
- RocketFlow integration
