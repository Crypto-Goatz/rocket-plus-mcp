# Rocket+ MCP Server v2.0

Model Context Protocol (MCP) server for integrating Rocket+ with AI assistants like Claude. Provides **50+ tools** across all 21 Rocket+ mods.

## Installation

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

Add to your project's `.claude/settings.json`:

```json
{
  "mcpServers": {
    "rocket-plus": {
      "command": "node",
      "args": ["./mcp/dist/server.js"],
      "env": {
        "ROCKET_API_URL": "https://rocketadd.com",
        "ROCKET_API_KEY": "rp_your_api_key_here"
      }
    }
  }
}
```

## Getting Your API Key

1. Go to https://rocketadd.com/settings
2. Click API Keys
3. Create a new API key
4. Copy the key (it's only shown once!)

## Available Tools (50+)

### CRM Core
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

### RocketFlow - Workflow Automation
| Tool | Description |
|------|-------------|
| `rocketflow_deploy` | Deploy JSON workflow to CRM |
| `rocketflow_validate` | Validate workflow JSON |
| `rocketflow_templates` | Get available templates |

### Rocket Agents - AI Workflows
| Tool | Description |
|------|-------------|
| `agent_execute` | Execute an AI agent workflow |
| `agent_list` | List available agent templates |
| `agent_status` | Check agent execution status |

### AI Course Generator
| Tool | Description |
|------|-------------|
| `course_generate` | Generate complete course with AI |
| `course_outline` | Generate course outline only |

### Content AI
| Tool | Description |
|------|-------------|
| `content_generate` | Generate marketing content |
| `content_rewrite` | Rewrite/improve content |
| `content_ideas` | Generate content ideas |

### RSS Content Engine
| Tool | Description |
|------|-------------|
| `rss_add_feed` | Add RSS feed to monitor |
| `rss_get_items` | Get latest RSS items |
| `rss_generate_post` | Generate post from RSS item |

### APEX Canvas / Rocket Canvas
| Tool | Description |
|------|-------------|
| `canvas_create` | Create new canvas project |
| `canvas_generate` | Generate content with AI |
| `canvas_export` | Export to HTML/PDF/image |

### Dashboard Builder
| Tool | Description |
|------|-------------|
| `dashboard_create` | Create custom dashboard |
| `dashboard_add_widget` | Add widget to dashboard |

### APEX AI - A/B Testing
| Tool | Description |
|------|-------------|
| `apex_create_test` | Create A/B test |
| `apex_get_results` | Get test results |
| `apex_optimize` | Get AI optimization suggestions |

### AI Insights
| Tool | Description |
|------|-------------|
| `insights_analyze` | Get AI-powered data insights |
| `insights_predict` | Get AI predictions |
| `insights_report` | Generate analytics report |

### Focus Flow - Productivity
| Tool | Description |
|------|-------------|
| `focus_create_session` | Create focused work session |
| `focus_get_tasks` | Get AI-suggested tasks |

### Auto-SEO
| Tool | Description |
|------|-------------|
| `seo_analyze` | Analyze page for SEO |
| `seo_generate_meta` | Generate meta tags |
| `seo_keyword_research` | Research keywords |

### Market Research
| Tool | Description |
|------|-------------|
| `research_competitors` | Research competitors |
| `research_trends` | Get market trends |
| `research_ideas` | Get product/feature ideas |

### API Connections
| Tool | Description |
|------|-------------|
| `api_test` | Test an API endpoint |
| `api_list_endpoints` | List available endpoints |

### Webhook Receiver
| Tool | Description |
|------|-------------|
| `webhook_create` | Create webhook endpoint |
| `webhook_list` | List webhooks and events |

### RocketPost - Forms
| Tool | Description |
|------|-------------|
| `form_create` | Create lead capture form |
| `form_get_submissions` | Get form submissions |

### Realtime Visitors
| Tool | Description |
|------|-------------|
| `visitors_active` | Get active site visitors |
| `visitors_history` | Get visitor history |

### CRO9 (Beta)
| Tool | Description |
|------|-------------|
| `cro_analyze` | Analyze conversion rate |
| `cro_heatmap` | Get heatmap data |

### RocketEQ Games (Beta)
| Tool | Description |
|------|-------------|
| `game_create` | Create gamified lead capture |
| `game_stats` | Get game statistics |

### MCPFED (Beta)
| Tool | Description |
|------|-------------|
| `mcp_list_servers` | List federated MCP servers |
| `mcp_call_server` | Call tool on federated server |

### Utility Tools
| Tool | Description |
|------|-------------|
| `get_location_stats` | Get location statistics |
| `get_usage` | Get API usage and limits |
| `list_mods` | List all available mods |

## Example Usage

Once connected, you can ask Claude things like:

### CRM Operations
- "Show me my recent contacts"
- "Create a contact for John Doe (john@example.com)"
- "Send an SMS to contact abc123: 'Your appointment is confirmed'"
- "Add 'VIP' tag to all contacts with @enterprise.com email"

### Content Creation
- "Generate a blog post about email marketing tips"
- "Create a 5-module course on social media marketing"
- "Rewrite this email to be more persuasive: [content]"

### Automation
- "Deploy this RocketFlow workflow: [JSON]"
- "Execute the proposal-agent for contact xyz"
- "Create an A/B test for my landing page headline"

### Analytics
- "What's my current API usage?"
- "Analyze my conversion rate trends"
- "Generate a weekly analytics report"

### Visitors & Forms
- "Show me currently active visitors on my site"
- "Get submissions from form abc123 in the last 7 days"

## Resources

The MCP server also provides these resources for context:

- `rocket://location/info` - Current location information
- `rocket://subscription/status` - Subscription plan and usage
- `rocket://mods/available` - List of available mods
- `rocket://agents/templates` - Available agent templates
- `rocket://canvas/templates` - Canvas templates
- `rocket://rss/feeds` - Configured RSS feeds

## Development

```bash
cd mcp
npm install
npm run dev
```

## Building

```bash
npm run build
```

## License

Proprietary - Rocket+
