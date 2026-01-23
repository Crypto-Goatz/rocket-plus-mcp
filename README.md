# Rocket+ MCP Server

> AI-powered CRM automation with 56+ tools for contacts, content, courses, workflows, and marketing.

[![npm version](https://badge.fury.io/js/rocket-plus-mcp.svg)](https://www.npmjs.com/package/rocket-plus-mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)

## What You Can Do

Talk to your CRM using natural language:

- **"Get my last 10 leads"** - Retrieve contacts instantly
- **"Create a course about email marketing for beginners"** - Generate complete courses with AI
- **"Send a follow-up SMS to John about our meeting"** - Message contacts directly
- **"Write a blog post about AI automation"** - Generate marketing content
- **"Analyze my sales performance this month"** - Get AI-powered insights

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

**Claude Code** (`~/.claude.json`):

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

The Rocket+ tools will now be available. Try saying:
- "Show me my recent contacts"
- "Create a new contact for john@example.com"

## Available Tools (56+)

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
| `course_outline` | Generate course structure |

### Content Creation
| Tool | What it does |
|------|--------------|
| `content_generate` | Write blog posts, emails, social posts |
| `content_rewrite` | Improve existing content |
| `content_ideas` | Get content topic suggestions |

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
| `agent_list` | List available agents |
| `skillforge_execute` | Execute AI skills |

### Analytics & Insights
| Tool | What it does |
|------|--------------|
| `insights_analyze` | AI-powered data analysis |
| `insights_predict` | Predictive analytics |
| `insights_report` | Generate reports |

### SEO & Marketing
| Tool | What it does |
|------|--------------|
| `seo_analyze` | Audit pages for SEO |
| `seo_keyword_research` | Get keyword suggestions |
| `research_competitors` | Analyze competitors |

### And More...
- RSS Content Engine
- Canvas Builder
- Dashboard Builder
- A/B Testing
- Form Builder
- Visitor Tracking
- Webhook Management

## Natural Language Prompts

The server includes built-in prompts for common tasks:

| Prompt | Description |
|--------|-------------|
| `get_my_leads` | Retrieve recent contacts |
| `create_course` | Generate a course on any topic |
| `follow_up` | Send a follow-up message |
| `generate_content` | Create marketing content |
| `analyze_performance` | Get CRM insights |
| `qualify_lead` | Run AI lead scoring |

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                   YOUR MACHINE                          │
│                                                         │
│   ┌───────────────┐      ┌───────────────────────┐     │
│   │ Claude Desktop │ ←──→ │ Rocket+ MCP Server   │     │
│   │  Claude Code   │      │ (runs locally)       │     │
│   └───────────────┘      └───────────────────────┘     │
│                                   │                     │
└───────────────────────────────────│─────────────────────┘
                                    │ HTTPS API
                                    ▼
                          ┌───────────────────┐
                          │  rocketadd.com    │
                          │  (Rocket+ API)    │
                          └───────────────────┘
```

- **Local execution**: MCP server runs on your machine
- **Secure**: API key stored locally, never exposed
- **Fast**: Direct stdio communication

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ROCKET_API_KEY` | Yes | Your API key from rocketadd.com/settings |
| `ROCKET_API_URL` | No | API URL (default: https://rocketadd.com) |

## Pricing

| Plan | API Calls/Month | Price |
|------|-----------------|-------|
| Free | 100 | $0 |
| Starter | 1,000 | $29/mo |
| Growth | 10,000 | $79/mo |
| Scale | Unlimited | $199/mo |

## Troubleshooting

### "API key required"
Set `ROCKET_API_KEY` in your MCP config's `env` section.

### "Authentication failed"
Your API key may be invalid. Generate a new one at rocketadd.com/settings.

### Tools not appearing
1. Restart your MCP client completely
2. Verify JSON syntax in config file
3. Check that the command path is correct

### Connection errors
1. Check internet connection
2. Verify https://rocketadd.com is accessible
3. Check firewall/proxy settings

## Links

- **Website**: [rocketadd.com](https://rocketadd.com)
- **Documentation**: [rocketadd.com/docs/integrations/mcp](https://rocketadd.com/docs/integrations/mcp)
- **Support**: support@rocketadd.com
- **GitHub**: [github.com/Crypto-Goatz/rocket-plus-mcp](https://github.com/Crypto-Goatz/rocket-plus-mcp)

## License

MIT - See [LICENSE](LICENSE) for details.

---

**Made with 🚀 by [RocketOpp](https://rocketopp.com)**
