# Rocket+ MCP Server

> **Multi-MCP Orchestration Hub** - Connect GHL, Stripe, Shopify, Supabase, and more through a single AI interface.

[![npm version](https://badge.fury.io/js/rocket-plus-mcp.svg)](https://www.npmjs.com/package/rocket-plus-mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)

## What's New in v3.0

**Multi-MCP Orchestration** - Rocket+ now acts as a central hub that can call other MCP servers:
- **GHL MCP Integration** - Native GoHighLevel MCP support
- **Workflow Chaining** - Create workflows that span multiple services
- **80+ Tools** - Expanded tool set for complete automation

## What You Can Do

Talk to your CRM and orchestrate multi-service workflows:

- **"Connect my GHL MCP"** - Set up GoHighLevel MCP integration
- **"Create a workflow: Shopify order → GHL contact → Slack notification"** - Chain actions across services
- **"Get my last 10 leads"** - Retrieve contacts instantly
- **"Run my welcome workflow"** - Execute saved multi-step workflows
- **"Create a course about email marketing"** - Generate complete courses with AI

## Quick Start

### 1. Get Your API Key

1. Sign up at [rocketadd.com](https://rocketadd.com)
2. Go to **Settings → API Keys**
3. Generate a new MCP API key (starts with `rp_`)

### 2. Configure Your MCP Client

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

```json
{
  "mcpServers": {
    "rocket-plus": {
      "command": "npx",
      "args": ["-y", "rocket-plus-mcp"],
      "env": {
        "ROCKET_API_KEY": "rp_your_key_here"
      }
    }
  }
}
```

**Claude Code** (`.mcp.json` in your project):

```json
{
  "mcpServers": {
    "rocket-plus": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "rocket-plus-mcp"],
      "env": {
        "ROCKET_API_KEY": "rp_your_key_here"
      }
    }
  }
}
```

### 3. Restart Your Client

The Rocket+ tools will now be available!

---

## GHL MCP Integration

Rocket+ can connect to GoHighLevel's official MCP server, giving you access to all native GHL tools through Rocket+.

### Setting Up GHL MCP

1. **Create a Private Integration Token (PIT) in GHL:**
   - Go to your GHL Sub-Account Settings
   - Navigate to **Integrations → Private Integrations**
   - Click **Create Token**
   - Enable scopes: contacts, conversations, workflows, calendars, opportunities
   - Copy the token (starts with `pit-`)

2. **Connect via Rocket+ MCP:**

```
"Connect my GHL MCP with pit-abc123..."
```

Or use the tool directly:

```json
{
  "tool": "connect_ghl_mcp",
  "args": {
    "pit": "pit-your-token-here",
    "ghlLocationId": "optional-location-id"
  }
}
```

3. **Use GHL MCP Tools:**

Once connected, you can call any GHL MCP tool:

```
"Call GHL MCP to get all contacts"
"Use ghl-mcp to send an SMS to John"
```

Or via `mcp_call_server`:

```json
{
  "tool": "mcp_call_server",
  "args": {
    "serverId": "ghl-mcp",
    "tool": "get_contacts",
    "serverArgs": { "limit": 10 }
  }
}
```

---

## Multi-MCP Orchestration

Rocket+ acts as a central hub that can route calls to multiple MCP servers:

```
┌─────────────────────────────────────────────────────────────┐
│                      YOUR AI ASSISTANT                       │
│                    (Claude Desktop/Code)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ROCKET+ MCP (Hub)                         │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│   │ GHL MCP  │  │ Stripe   │  │ Shopify  │  │ Supabase │   │
│   │ (CRM)    │  │ (Pay)    │  │ (Shop)   │  │ (DB)     │   │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│   │ Vercel   │  │ Slack    │  │ MCPFED   │                  │
│   │ (Deploy) │  │ (Notify) │  │ (More)   │                  │
│   └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

### Supported MCP Servers

| Server ID | Name | Status | Description |
|-----------|------|--------|-------------|
| `rocket-plus` | Rocket+ MCP | Built-in | 80+ tools for CRM, content, workflows |
| `ghl-mcp` | GoHighLevel MCP | Available | Native GHL CRM tools |
| `supabase` | Supabase MCP | Available | Database operations |
| `stripe-mcp` | Stripe MCP | Coming Soon | Payment processing |
| `shopify-mcp` | Shopify MCP | Coming Soon | E-commerce |
| `vercel-mcp` | Vercel MCP | Coming Soon | Deployment |
| `slack-mcp` | Slack MCP | Coming Soon | Team notifications |

---

## Available Tools (80+)

### MCP Orchestration
| Tool | What it does |
|------|--------------|
| `mcp_call_server` | Call any connected MCP server |
| `mcp_list_servers` | List available MCP servers |
| `list_mcp_connections` | Show your connected servers |
| `connect_ghl_mcp` | Connect GoHighLevel MCP |
| `disconnect_ghl_mcp` | Disconnect GHL MCP |
| `ghl_mcp_status` | Check GHL MCP connection |
| `ghl_mcp_tools` | List GHL MCP tools |
| `ghl_mcp_call` | Call a GHL MCP tool directly |

### Workflow Orchestration
| Tool | What it does |
|------|--------------|
| `run_workflow` | Execute a saved workflow |
| `create_workflow` | Create a new workflow from description |
| `list_workflows` | List your workflows |
| `get_workflow` | Get workflow details |

### CRM & Contacts
| Tool | What it does |
|------|--------------|
| `get_contacts` | Search and retrieve contacts |
| `create_contact` | Add new contacts with tags |
| `update_contact` | Update contact information |
| `add_tags` | Tag contacts for segmentation |
| `send_sms` | Send SMS messages |
| `send_email` | Send emails |

### Sales & Pipeline
| Tool | What it does |
|------|--------------|
| `get_opportunities` | View deals in pipelines |
| `create_opportunity` | Create new deals |

### AI Course Generator
| Tool | What it does |
|------|--------------|
| `course_generate` | Create full courses with modules, lessons, quizzes |

### Content Creation
| Tool | What it does |
|------|--------------|
| `content_generate` | Write blog posts, emails, social posts |
| `content_rewrite` | Improve existing content |

### Workflow Automation
| Tool | What it does |
|------|--------------|
| `rocketflow_deploy` | Deploy workflows, pipelines, tags |
| `rocketflow_validate` | Validate configurations |
| `rocketflow_templates` | Browse templates |

### AI Agents
| Tool | What it does |
|------|--------------|
| `agent_execute` | Run AI workflows (lead qual, proposals) |
| `skillforge_execute` | Execute AI skills |

### Analytics & Insights
| Tool | What it does |
|------|--------------|
| `insights_analyze` | AI-powered data analysis |
| `insights_predict` | Predictive analytics |

### SEO & Marketing
| Tool | What it does |
|------|--------------|
| `seo_analyze` | Audit pages for SEO |

---

## Workflow Examples

### Example 1: New Customer Onboarding

```json
{
  "name": "New Customer Onboarding",
  "trigger": "shopify_order",
  "actions": [
    { "toolId": "create_contact", "config": { "source": "Shopify" } },
    { "toolId": "add_tags", "config": { "tags": "customer,new" } },
    { "toolId": "send_sms", "config": { "message": "Welcome! Your order is confirmed." } },
    { "toolId": "mcp_call_server", "config": { "serverId": "slack-mcp", "tool": "send_message", "serverArgs": { "channel": "#sales", "text": "New customer!" } } }
  ]
}
```

### Example 2: Multi-MCP Lead Capture

```
"Create a workflow: when a Shopify purchase happens, create a contact in GHL, send a Slack notification, and add them to Supabase"
```

---

## Resources

The MCP server exposes these resources for context:

| Resource URI | Description |
|--------------|-------------|
| `rocket://location/info` | Your CRM location info |
| `rocket://workflows` | Your saved workflows |
| `rocket://mods` | Available Rocket+ mods |
| `rocket://connections` | Connected MCP servers |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ROCKET_API_KEY` | Yes | Your API key from rocketadd.com/settings |
| `ROCKET_API_URL` | No | API URL (default: https://rocketadd.com) |

---

## Pricing

| Plan | API Calls/Month | Multi-MCP | Price |
|------|-----------------|-----------|-------|
| Free | 100 | Limited | $0 |
| Starter | 1,000 | Yes | $29/mo |
| Growth | 10,000 | Yes | $79/mo |
| Scale | Unlimited | Yes | $199/mo |

---

## Troubleshooting

### "API key required"
Set `ROCKET_API_KEY` in your MCP config's `env` section.

### "GHL MCP not configured"
Run `connect_ghl_mcp` with your GHL PIT token first.

### "Authentication failed"
Your API key may be invalid. Generate a new one at rocketadd.com/settings.

### Tools not appearing
1. Restart your MCP client completely
2. Verify JSON syntax in config file
3. Check that the command path is correct

---

## Links

- **Website**: [rocketadd.com](https://rocketadd.com)
- **Documentation**: [rocketadd.com/docs/integrations/mcp](https://rocketadd.com/docs/integrations/mcp)
- **GHL MCP Docs**: [marketplace.gohighlevel.com/docs/other/mcp](https://marketplace.gohighlevel.com/docs/other/mcp)
- **Support**: support@rocketadd.com
- **GitHub**: [github.com/Crypto-Goatz/rocket-plus-mcp](https://github.com/Crypto-Goatz/rocket-plus-mcp)

---

## Changelog

### v3.0.0 (January 2026)
- **NEW**: GHL MCP Integration - Connect to GoHighLevel's official MCP server
- **NEW**: Multi-MCP Orchestration - Call any connected MCP server through Rocket+
- **NEW**: `mcp_call_server` - Universal MCP server routing
- **NEW**: `connect_ghl_mcp`, `ghl_mcp_status`, `ghl_mcp_tools`, `ghl_mcp_call`
- **NEW**: `list_mcp_connections` - View all connected servers
- **IMPROVED**: Workflow engine with cross-MCP action support
- **IMPROVED**: Resources now show actual connection status
- Expanded to 80+ tools

### v2.2.0
- Added workflow orchestration tools
- Improved session initialization
- Added prompts for common tasks

### v2.1.0
- Initial public release
- 56+ tools for CRM, content, and automation

---

## License

MIT - See [LICENSE](LICENSE) for details.

---

**Made with 🚀 by [RocketOpp](https://rocketopp.com)**
