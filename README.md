# Rocket+ MCP Server

[![npm version](https://badge.fury.io/js/rocket-plus-mcp.svg)](https://www.npmjs.com/package/rocket-plus-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue)](https://registry.modelcontextprotocol.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Model Context Protocol (MCP) server for integrating **Rocket+** with AI assistants like Claude. Provides **50+ tools** across 21 marketing automation mods.

## What is Rocket+?

[Rocket+](https://rocketadd.com) is an AI-powered marketing automation platform for GoHighLevel (GHL) CRM. It provides modular enhancements ("Mods") for CRM functionality, including workflow automation, AI content generation, A/B testing, and more.

## Quick Start

### For Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "rocket-plus": {
      "command": "npx",
      "args": ["-y", "rocket-plus-mcp"],
      "env": {
        "ROCKET_API_URL": "https://rocketadd.com",
        "ROCKET_API_KEY": "rp_your_api_key_here"
      }
    }
  }
}
```

### For Claude Code

```bash
claude mcp add --transport stdio rocket-plus -- npx -y rocket-plus-mcp
```

Then set environment variables in your shell or `.env`:
```bash
export ROCKET_API_URL=https://rocketadd.com
export ROCKET_API_KEY=rp_your_api_key_here
```

## Getting Your API Key

1. Go to [https://rocketadd.com/settings](https://rocketadd.com/settings)
2. Click **API Keys**
3. Create a new API key
4. Copy the key (it's only shown once!)

## Available Tools (50+)

### CRM Core (13 tools)
| Tool | Description |
|------|-------------|
| `get_contacts` | List contacts with optional search/filter |
| `create_contact` | Create a new contact |
| `update_contact` | Update contact details |
| `add_tags` | Add tags to a contact |
| `get_opportunities` | List opportunities/deals |
| `create_opportunity` | Create a new opportunity |
| `send_sms` | Send SMS to a contact |
| `send_email` | Send email to a contact |
| `get_calendars` | List all calendars |
| `get_appointments` | Get appointments from a calendar |
| `create_appointment` | Book an appointment |
| `get_workflows` | List all workflows |
| `add_to_workflow` | Add contact to a workflow |

### RocketFlow - Workflow Automation (3 tools)
| Tool | Description |
|------|-------------|
| `rocketflow_deploy` | Deploy JSON workflow to CRM |
| `rocketflow_validate` | Validate workflow JSON |
| `rocketflow_templates` | Get available templates |

### Rocket Agents - AI Workflows (3 tools)
| Tool | Description |
|------|-------------|
| `agent_execute` | Execute an AI agent workflow |
| `agent_list` | List available agent templates |
| `agent_status` | Check agent execution status |

### AI Course Generator (2 tools)
| Tool | Description |
|------|-------------|
| `course_generate` | Generate complete course with AI |
| `course_outline` | Generate course outline only |

### Content AI (3 tools)
| Tool | Description |
|------|-------------|
| `content_generate` | Generate marketing content |
| `content_rewrite` | Rewrite/improve content |
| `content_ideas` | Generate content ideas |

### RSS Content Engine (3 tools)
| Tool | Description |
|------|-------------|
| `rss_add_feed` | Add RSS feed to monitor |
| `rss_get_items` | Get latest RSS items |
| `rss_generate_post` | Generate post from RSS item |

### APEX Canvas / Rocket Canvas (3 tools)
| Tool | Description |
|------|-------------|
| `canvas_create` | Create new canvas project |
| `canvas_generate` | Generate content with AI |
| `canvas_export` | Export to HTML/PDF/image |

### Dashboard Builder (2 tools)
| Tool | Description |
|------|-------------|
| `dashboard_create` | Create custom dashboard |
| `dashboard_add_widget` | Add widget to dashboard |

### APEX AI - A/B Testing (3 tools)
| Tool | Description |
|------|-------------|
| `apex_create_test` | Create A/B test |
| `apex_get_results` | Get test results |
| `apex_optimize` | Get AI optimization suggestions |

### AI Insights (3 tools)
| Tool | Description |
|------|-------------|
| `insights_analyze` | Get AI-powered data insights |
| `insights_predict` | Get AI predictions |
| `insights_report` | Generate analytics report |

### Focus Flow - Productivity (2 tools)
| Tool | Description |
|------|-------------|
| `focus_create_session` | Create focused work session |
| `focus_get_tasks` | Get AI-suggested tasks |

### Auto-SEO (3 tools)
| Tool | Description |
|------|-------------|
| `seo_analyze` | Analyze page for SEO |
| `seo_generate_meta` | Generate meta tags |
| `seo_keyword_research` | Research keywords |

### Market Research (3 tools)
| Tool | Description |
|------|-------------|
| `research_competitors` | Research competitors |
| `research_trends` | Get market trends |
| `research_ideas` | Get product/feature ideas |

### Additional Tools

| Category | Tools |
|----------|-------|
| API Connections | `api_test`, `api_list_endpoints` |
| Webhook Receiver | `webhook_create`, `webhook_list` |
| RocketPost Forms | `form_create`, `form_get_submissions` |
| Realtime Visitors | `visitors_active`, `visitors_history` |
| CRO9 (Beta) | `cro_analyze`, `cro_heatmap` |
| RocketEQ Games (Beta) | `game_create`, `game_stats` |
| MCPFED (Beta) | `mcp_list_servers`, `mcp_call_server` |
| Utility | `get_location_stats`, `get_usage`, `list_mods` |

## Example Usage

Once connected, you can ask Claude things like:

### CRM Operations
```
"Show me my recent contacts"
"Create a contact for John Doe (john@example.com)"
"Send an SMS to contact abc123: 'Your appointment is confirmed'"
"Add 'VIP' tag to all contacts with @enterprise.com email"
```

### Content Creation
```
"Generate a blog post about email marketing tips"
"Create a 5-module course on social media marketing"
"Rewrite this email to be more persuasive: [content]"
```

### Automation
```
"Deploy this RocketFlow workflow: [JSON]"
"Execute the proposal-agent for contact xyz"
"Create an A/B test for my landing page headline"
```

### Analytics
```
"What's my current API usage?"
"Analyze my conversion rate trends"
"Generate a weekly analytics report"
```

## Resources

The MCP server provides these resources for context:

| Resource URI | Description |
|--------------|-------------|
| `rocket://location/info` | Current location information |
| `rocket://subscription/status` | Subscription plan and usage |
| `rocket://mods/available` | List of available mods |
| `rocket://agents/templates` | Available agent templates |
| `rocket://canvas/templates` | Canvas templates |
| `rocket://rss/feeds` | Configured RSS feeds |

## Development

```bash
# Clone the repository
git clone https://github.com/Crypto-Goatz/rocket-plus-mcp.git
cd rocket-plus-mcp

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ROCKET_API_URL` | Rocket+ API base URL | `https://rocketadd.com` |
| `ROCKET_API_KEY` | Your Rocket+ API key | Required |

## Requirements

- Node.js >= 18.0.0
- Rocket+ account with API key

## Links

- [Rocket+ Website](https://rocketadd.com)
- [MCP Documentation](https://rocketadd.com/docs/integrations/mcp)
- [API Reference](https://rocketadd.com/docs/api)
- [GitHub Repository](https://github.com/Crypto-Goatz/rocket-plus-mcp)
- [Support](mailto:support@rocketadd.com)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with love by [RocketOpp](https://rocketadd.com)
