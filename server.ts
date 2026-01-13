#!/usr/bin/env node
// ============================================================
// Rocket+ MCP Server - Complete Mod Integration
// ============================================================
// Model Context Protocol server for AI integration
// Provides tools for all 21 Rocket+ mods
// ============================================================

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

// Initialize MCP server
const server = new Server(
  {
    name: 'rocket-plus-mcp',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
)

// Base URL for API calls
const API_BASE = process.env.ROCKET_API_URL || 'https://rocketadd.com'
const API_KEY = process.env.ROCKET_API_KEY || ''

// ============================================================
// Tools Definition - All 21 Mods
// ============================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // ========================================================
      // CRM CORE TOOLS (Contacts, Opportunities, Calendar)
      // ========================================================
      {
        name: 'get_contacts',
        description: 'Get a list of contacts from the CRM',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query to filter contacts' },
            limit: { type: 'number', description: 'Maximum number of contacts (default: 20)' },
            tags: { type: 'string', description: 'Filter by comma-separated tags' }
          }
        }
      },
      {
        name: 'create_contact',
        description: 'Create a new contact in the CRM',
        inputSchema: {
          type: 'object',
          properties: {
            firstName: { type: 'string', description: 'First name' },
            lastName: { type: 'string', description: 'Last name' },
            email: { type: 'string', description: 'Email address' },
            phone: { type: 'string', description: 'Phone number' },
            tags: { type: 'string', description: 'Comma-separated tags' },
            customFields: { type: 'object', description: 'Custom field key-value pairs' }
          },
          required: ['email']
        }
      },
      {
        name: 'update_contact',
        description: 'Update an existing contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID to update' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            tags: { type: 'string', description: 'Tags to set (replaces existing)' }
          },
          required: ['contactId']
        }
      },
      {
        name: 'add_tags',
        description: 'Add tags to a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            tags: { type: 'string', description: 'Comma-separated tags to add' }
          },
          required: ['contactId', 'tags']
        }
      },
      {
        name: 'get_opportunities',
        description: 'Get opportunities/deals from pipelines',
        inputSchema: {
          type: 'object',
          properties: {
            pipelineId: { type: 'string', description: 'Filter by pipeline ID' },
            stageId: { type: 'string', description: 'Filter by stage ID' }
          }
        }
      },
      {
        name: 'create_opportunity',
        description: 'Create a new opportunity/deal',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Opportunity name' },
            pipelineId: { type: 'string', description: 'Pipeline ID' },
            stageId: { type: 'string', description: 'Stage ID' },
            contactId: { type: 'string', description: 'Associated contact ID' },
            monetaryValue: { type: 'number', description: 'Deal value' }
          },
          required: ['name', 'pipelineId', 'stageId']
        }
      },
      {
        name: 'send_sms',
        description: 'Send an SMS message to a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            message: { type: 'string', description: 'Message content' }
          },
          required: ['contactId', 'message']
        }
      },
      {
        name: 'send_email',
        description: 'Send an email to a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            subject: { type: 'string', description: 'Email subject' },
            body: { type: 'string', description: 'Email body (HTML supported)' }
          },
          required: ['contactId', 'subject', 'body']
        }
      },

      // ========================================================
      // ROCKETFLOW - Workflow Automation
      // ========================================================
      {
        name: 'rocketflow_deploy',
        description: 'Deploy a RocketFlow JSON workflow to the CRM. Automatically detects type and deploys contacts, custom fields, custom values, tags, pipelines, or workflows.',
        inputSchema: {
          type: 'object',
          properties: {
            json: { type: 'string', description: 'The RocketFlow JSON configuration to deploy' },
            dryRun: { type: 'boolean', description: 'If true, validates without deploying' }
          },
          required: ['json']
        }
      },
      {
        name: 'rocketflow_validate',
        description: 'Validate a RocketFlow JSON configuration without deploying',
        inputSchema: {
          type: 'object',
          properties: {
            json: { type: 'string', description: 'The RocketFlow JSON to validate' }
          },
          required: ['json']
        }
      },
      {
        name: 'rocketflow_templates',
        description: 'Get available RocketFlow templates',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Filter by category (workflows, pipelines, etc.)' }
          }
        }
      },

      // ========================================================
      // ROCKET AGENTS - AI Workflow Automation
      // ========================================================
      {
        name: 'agent_execute',
        description: 'Execute a Rocket Agent AI workflow. Agents can qualify leads, send proposals, book appointments, and more.',
        inputSchema: {
          type: 'object',
          properties: {
            flowId: { type: 'string', description: 'Agent flow template ID (e.g., proposal-agent, smart-followup-agent)' },
            triggerData: { type: 'object', description: 'Data to pass to the agent (contactId, email, etc.)' }
          },
          required: ['flowId', 'triggerData']
        }
      },
      {
        name: 'agent_list',
        description: 'List available Rocket Agent templates',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'agent_status',
        description: 'Get status of a running or completed agent execution',
        inputSchema: {
          type: 'object',
          properties: {
            executionId: { type: 'string', description: 'Execution ID to check' }
          },
          required: ['executionId']
        }
      },

      // ========================================================
      // AI COURSE GENERATOR
      // ========================================================
      {
        name: 'course_generate',
        description: 'Generate a complete course with AI. Creates modules, lessons, quizzes, and content.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'Course topic or title' },
            audience: { type: 'string', description: 'Target audience (beginner, intermediate, advanced)' },
            modules: { type: 'number', description: 'Number of modules (default: 5)' },
            lessonsPerModule: { type: 'number', description: 'Lessons per module (default: 3)' },
            includeQuizzes: { type: 'boolean', description: 'Include quizzes (default: true)' },
            style: { type: 'string', description: 'Teaching style (practical, theoretical, mixed)' }
          },
          required: ['topic']
        }
      },
      {
        name: 'course_outline',
        description: 'Generate just a course outline without full content',
        inputSchema: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'Course topic' },
            modules: { type: 'number', description: 'Number of modules' }
          },
          required: ['topic']
        }
      },

      // ========================================================
      // CONTENT AI - AI Content Creation
      // ========================================================
      {
        name: 'content_generate',
        description: 'Generate marketing content with AI. Creates blog posts, emails, social posts, etc.',
        inputSchema: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Content type: blog, email, social, landing, ad' },
            topic: { type: 'string', description: 'Topic or subject' },
            tone: { type: 'string', description: 'Tone: professional, casual, persuasive, informative' },
            length: { type: 'string', description: 'Length: short, medium, long' },
            keywords: { type: 'string', description: 'SEO keywords (comma-separated)' },
            targetAudience: { type: 'string', description: 'Target audience description' }
          },
          required: ['type', 'topic']
        }
      },
      {
        name: 'content_rewrite',
        description: 'Rewrite or improve existing content',
        inputSchema: {
          type: 'object',
          properties: {
            content: { type: 'string', description: 'Original content to rewrite' },
            goal: { type: 'string', description: 'Goal: improve, shorten, expand, simplify, persuade' },
            tone: { type: 'string', description: 'Desired tone' }
          },
          required: ['content', 'goal']
        }
      },
      {
        name: 'content_ideas',
        description: 'Generate content ideas for a topic',
        inputSchema: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'Topic area' },
            count: { type: 'number', description: 'Number of ideas (default: 10)' },
            type: { type: 'string', description: 'Content type focus' }
          },
          required: ['topic']
        }
      },

      // ========================================================
      // RSS CONTENT ENGINE
      // ========================================================
      {
        name: 'rss_add_feed',
        description: 'Add an RSS feed to monitor',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'RSS feed URL' },
            name: { type: 'string', description: 'Feed name' },
            autoPost: { type: 'boolean', description: 'Auto-post new items' },
            rewriteWithAI: { type: 'boolean', description: 'Rewrite content with AI before posting' }
          },
          required: ['url', 'name']
        }
      },
      {
        name: 'rss_get_items',
        description: 'Get latest items from RSS feeds',
        inputSchema: {
          type: 'object',
          properties: {
            feedId: { type: 'string', description: 'Specific feed ID (optional)' },
            limit: { type: 'number', description: 'Number of items (default: 20)' }
          }
        }
      },
      {
        name: 'rss_generate_post',
        description: 'Generate a social/blog post from an RSS item',
        inputSchema: {
          type: 'object',
          properties: {
            itemId: { type: 'string', description: 'RSS item ID' },
            platform: { type: 'string', description: 'Platform: linkedin, twitter, facebook, blog' },
            addOpinion: { type: 'boolean', description: 'Add AI-generated opinion/commentary' }
          },
          required: ['itemId', 'platform']
        }
      },

      // ========================================================
      // APEX CANVAS / ROCKET CANVAS - Visual Builder
      // ========================================================
      {
        name: 'canvas_create',
        description: 'Create a new canvas project (landing page, form, email template)',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Project name' },
            type: { type: 'string', description: 'Type: landing, form, email, social' },
            template: { type: 'string', description: 'Template ID to start from (optional)' },
            aiPrompt: { type: 'string', description: 'Describe what you want AI to generate' }
          },
          required: ['name', 'type']
        }
      },
      {
        name: 'canvas_generate',
        description: 'Generate canvas content with AI from a description',
        inputSchema: {
          type: 'object',
          properties: {
            projectId: { type: 'string', description: 'Project ID to update' },
            prompt: { type: 'string', description: 'Describe what you want to create' },
            style: { type: 'string', description: 'Visual style: modern, minimal, bold, elegant' }
          },
          required: ['prompt']
        }
      },
      {
        name: 'canvas_export',
        description: 'Export a canvas project',
        inputSchema: {
          type: 'object',
          properties: {
            projectId: { type: 'string', description: 'Project ID' },
            format: { type: 'string', description: 'Format: html, image, pdf' }
          },
          required: ['projectId', 'format']
        }
      },

      // ========================================================
      // DASHBOARD BUILDER
      // ========================================================
      {
        name: 'dashboard_create',
        description: 'Create a custom analytics dashboard',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Dashboard name' },
            widgets: { type: 'array', description: 'Array of widget configurations' },
            layout: { type: 'string', description: 'Layout: grid, rows, columns' }
          },
          required: ['name']
        }
      },
      {
        name: 'dashboard_add_widget',
        description: 'Add a widget to a dashboard',
        inputSchema: {
          type: 'object',
          properties: {
            dashboardId: { type: 'string', description: 'Dashboard ID' },
            type: { type: 'string', description: 'Widget type: chart, metric, table, list' },
            dataSource: { type: 'string', description: 'Data source: contacts, opportunities, appointments, custom' },
            config: { type: 'object', description: 'Widget configuration' }
          },
          required: ['dashboardId', 'type', 'dataSource']
        }
      },

      // ========================================================
      // APEX AI - A/B Testing & Optimization
      // ========================================================
      {
        name: 'apex_create_test',
        description: 'Create an A/B test experiment',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Test name' },
            type: { type: 'string', description: 'Type: email_subject, landing_page, cta, form' },
            variants: { type: 'array', description: 'Array of variant configurations' },
            goal: { type: 'string', description: 'Goal: clicks, conversions, signups' },
            trafficSplit: { type: 'string', description: 'Traffic split (e.g., "50/50", "33/33/34")' }
          },
          required: ['name', 'type', 'variants']
        }
      },
      {
        name: 'apex_get_results',
        description: 'Get A/B test results and winner',
        inputSchema: {
          type: 'object',
          properties: {
            testId: { type: 'string', description: 'Test ID' }
          },
          required: ['testId']
        }
      },
      {
        name: 'apex_optimize',
        description: 'Get AI optimization suggestions',
        inputSchema: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'What to optimize: funnel, email, landing, workflow' },
            data: { type: 'object', description: 'Current performance data' }
          },
          required: ['type']
        }
      },

      // ========================================================
      // AI INSIGHTS - Analytics
      // ========================================================
      {
        name: 'insights_analyze',
        description: 'Get AI-powered insights from your data',
        inputSchema: {
          type: 'object',
          properties: {
            dataType: { type: 'string', description: 'Data to analyze: contacts, opportunities, campaigns, all' },
            timeframe: { type: 'string', description: 'Timeframe: 7d, 30d, 90d, ytd' },
            question: { type: 'string', description: 'Specific question to answer (optional)' }
          },
          required: ['dataType']
        }
      },
      {
        name: 'insights_predict',
        description: 'Get AI predictions based on historical data',
        inputSchema: {
          type: 'object',
          properties: {
            metric: { type: 'string', description: 'Metric to predict: revenue, leads, conversions' },
            horizon: { type: 'string', description: 'Prediction horizon: 7d, 30d, 90d' }
          },
          required: ['metric']
        }
      },
      {
        name: 'insights_report',
        description: 'Generate an AI-written analytics report',
        inputSchema: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Report type: weekly, monthly, campaign, funnel' },
            format: { type: 'string', description: 'Format: summary, detailed, executive' }
          },
          required: ['type']
        }
      },

      // ========================================================
      // FOCUS FLOW - Productivity
      // ========================================================
      {
        name: 'focus_create_session',
        description: 'Create a focused work session with tasks',
        inputSchema: {
          type: 'object',
          properties: {
            goal: { type: 'string', description: 'Session goal' },
            duration: { type: 'number', description: 'Duration in minutes (default: 25)' },
            tasks: { type: 'array', description: 'Array of task strings' }
          },
          required: ['goal']
        }
      },
      {
        name: 'focus_get_tasks',
        description: 'Get AI-suggested tasks based on your CRM data',
        inputSchema: {
          type: 'object',
          properties: {
            priority: { type: 'string', description: 'Priority: high, medium, low' },
            category: { type: 'string', description: 'Category: followups, opportunities, admin' }
          }
        }
      },

      // ========================================================
      // AUTO-SEO - SEO Optimization
      // ========================================================
      {
        name: 'seo_analyze',
        description: 'Analyze a page for SEO issues and opportunities',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL to analyze' },
            keywords: { type: 'string', description: 'Target keywords (comma-separated)' }
          },
          required: ['url']
        }
      },
      {
        name: 'seo_generate_meta',
        description: 'Generate SEO-optimized meta tags',
        inputSchema: {
          type: 'object',
          properties: {
            content: { type: 'string', description: 'Page content or description' },
            keywords: { type: 'string', description: 'Target keywords' },
            type: { type: 'string', description: 'Page type: homepage, product, blog, landing' }
          },
          required: ['content']
        }
      },
      {
        name: 'seo_keyword_research',
        description: 'Get keyword suggestions and search volume estimates',
        inputSchema: {
          type: 'object',
          properties: {
            seed: { type: 'string', description: 'Seed keyword or topic' },
            intent: { type: 'string', description: 'Intent: informational, commercial, transactional' }
          },
          required: ['seed']
        }
      },

      // ========================================================
      // MARKET RESEARCH
      // ========================================================
      {
        name: 'research_competitors',
        description: 'Research competitor websites and strategies',
        inputSchema: {
          type: 'object',
          properties: {
            competitors: { type: 'string', description: 'Competitor domains (comma-separated)' },
            focus: { type: 'string', description: 'Focus: pricing, features, messaging, seo' }
          },
          required: ['competitors']
        }
      },
      {
        name: 'research_trends',
        description: 'Get market trends for an industry or topic',
        inputSchema: {
          type: 'object',
          properties: {
            industry: { type: 'string', description: 'Industry or niche' },
            timeframe: { type: 'string', description: 'Timeframe: current, 6mo, 1yr' }
          },
          required: ['industry']
        }
      },
      {
        name: 'research_ideas',
        description: 'Get feature/product ideas from market research data',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Category to research (from CRM ideas board)' },
            limit: { type: 'number', description: 'Number of ideas to return' }
          }
        }
      },

      // ========================================================
      // API CONNECTIONS
      // ========================================================
      {
        name: 'api_test',
        description: 'Test an API connection',
        inputSchema: {
          type: 'object',
          properties: {
            endpoint: { type: 'string', description: 'CRM API endpoint to test' },
            method: { type: 'string', description: 'HTTP method: GET, POST, PUT, DELETE' }
          },
          required: ['endpoint']
        }
      },
      {
        name: 'api_list_endpoints',
        description: 'List available CRM API endpoints',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Category: contacts, opportunities, calendars, etc.' }
          }
        }
      },

      // ========================================================
      // WEBHOOK RECEIVER
      // ========================================================
      {
        name: 'webhook_create',
        description: 'Create a new webhook endpoint',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Webhook name' },
            events: { type: 'array', description: 'Events to listen for' },
            targetUrl: { type: 'string', description: 'URL to forward webhooks to (optional)' }
          },
          required: ['name']
        }
      },
      {
        name: 'webhook_list',
        description: 'List webhook endpoints and recent events',
        inputSchema: {
          type: 'object',
          properties: {
            includeEvents: { type: 'boolean', description: 'Include recent events' }
          }
        }
      },

      // ========================================================
      // ROCKETPOST - Form Builder
      // ========================================================
      {
        name: 'form_create',
        description: 'Create a new lead capture form',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Form name' },
            fields: { type: 'array', description: 'Array of field configurations' },
            style: { type: 'string', description: 'Form style: minimal, modern, classic' },
            aiOptimize: { type: 'boolean', description: 'Enable AI A/B testing' }
          },
          required: ['name']
        }
      },
      {
        name: 'form_get_submissions',
        description: 'Get form submissions',
        inputSchema: {
          type: 'object',
          properties: {
            formId: { type: 'string', description: 'Form ID' },
            limit: { type: 'number', description: 'Number of submissions' },
            since: { type: 'string', description: 'ISO date to filter from' }
          },
          required: ['formId']
        }
      },

      // ========================================================
      // REALTIME VISITORS
      // ========================================================
      {
        name: 'visitors_active',
        description: 'Get currently active visitors on your site',
        inputSchema: {
          type: 'object',
          properties: {
            siteId: { type: 'string', description: 'Site ID (optional)' }
          }
        }
      },
      {
        name: 'visitors_history',
        description: 'Get visitor history and analytics',
        inputSchema: {
          type: 'object',
          properties: {
            timeframe: { type: 'string', description: 'Timeframe: 1h, 24h, 7d, 30d' },
            filter: { type: 'string', description: 'Filter: all, identified, high_intent' }
          }
        }
      },

      // ========================================================
      // CRO9 - Conversion Optimization
      // ========================================================
      {
        name: 'cro_analyze',
        description: 'Analyze conversion rate and get optimization suggestions',
        inputSchema: {
          type: 'object',
          properties: {
            funnelId: { type: 'string', description: 'Funnel or page ID to analyze' },
            goal: { type: 'string', description: 'Conversion goal' }
          }
        }
      },
      {
        name: 'cro_heatmap',
        description: 'Get heatmap data for a page',
        inputSchema: {
          type: 'object',
          properties: {
            pageUrl: { type: 'string', description: 'Page URL' },
            type: { type: 'string', description: 'Type: click, scroll, attention' }
          },
          required: ['pageUrl']
        }
      },

      // ========================================================
      // ROCKETEQ GAMES - Gamified Lead Capture
      // ========================================================
      {
        name: 'game_create',
        description: 'Create a gamified lead capture experience',
        inputSchema: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Game type: quiz, spin-wheel, scratch-card, trivia' },
            name: { type: 'string', description: 'Game name' },
            prizes: { type: 'array', description: 'Array of prize configurations' },
            questions: { type: 'array', description: 'Questions for quiz/trivia (if applicable)' }
          },
          required: ['type', 'name']
        }
      },
      {
        name: 'game_stats',
        description: 'Get game performance statistics',
        inputSchema: {
          type: 'object',
          properties: {
            gameId: { type: 'string', description: 'Game ID' }
          },
          required: ['gameId']
        }
      },

      // ========================================================
      // MCPFED - MCP Federation
      // ========================================================
      {
        name: 'mcp_list_servers',
        description: 'List available MCP servers in the federation',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Category: all, crm, marketing, analytics' }
          }
        }
      },
      {
        name: 'mcp_call_server',
        description: 'Call a tool on a federated MCP server',
        inputSchema: {
          type: 'object',
          properties: {
            serverId: { type: 'string', description: 'Server ID to call' },
            tool: { type: 'string', description: 'Tool name on that server' },
            args: { type: 'object', description: 'Tool arguments' }
          },
          required: ['serverId', 'tool']
        }
      },

      // ========================================================
      // UTILITY TOOLS
      // ========================================================
      {
        name: 'get_location_stats',
        description: 'Get location statistics (users, calendars, pipelines, workflows)',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_usage',
        description: 'Get current API usage and subscription limits',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'list_mods',
        description: 'List all available Rocket+ mods and their status',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  }
})

// ============================================================
// Tool Execution
// ============================================================

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    const response = await fetch(`${API_BASE}/api/mcp/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        tool: name,
        args
      })
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${result.error || 'Unknown error'}`
          }
        ]
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing tool: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ]
    }
  }
})

// ============================================================
// Resources (for context)
// ============================================================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'rocket://location/info',
        name: 'Location Info',
        description: 'Current CRM location information',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://subscription/status',
        name: 'Subscription Status',
        description: 'Current subscription plan and usage',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://mods/available',
        name: 'Available Mods',
        description: 'List of available Rocket+ mods',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://agents/templates',
        name: 'Agent Templates',
        description: 'Available Rocket Agent templates',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://canvas/templates',
        name: 'Canvas Templates',
        description: 'Available Canvas templates',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://rss/feeds',
        name: 'RSS Feeds',
        description: 'Configured RSS feeds',
        mimeType: 'application/json'
      }
    ]
  }
})

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params

  try {
    let endpoint = ''

    switch (uri) {
      case 'rocket://location/info':
        endpoint = '/api/crm/info'
        break
      case 'rocket://subscription/status':
        endpoint = '/api/billing/status'
        break
      case 'rocket://mods/available':
        endpoint = '/api/mods'
        break
      case 'rocket://agents/templates':
        endpoint = '/api/agents/execute'
        break
      case 'rocket://canvas/templates':
        endpoint = '/api/mods/apex-canvas/templates'
        break
      case 'rocket://rss/feeds':
        endpoint = '/api/mods/rss-content-engine'
        break
      default:
        throw new Error(`Unknown resource: ${uri}`)
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })

    const data = await response.json()

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(data, null, 2)
        }
      ]
    }
  } catch (error) {
    return {
      contents: [
        {
          uri,
          mimeType: 'text/plain',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ]
    }
  }
})

// ============================================================
// Start Server
// ============================================================

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Rocket+ MCP Server v2.0 running on stdio')
  console.error(`Connected to: ${API_BASE}`)
  console.error('Available tools: 50+ across 21 mods')
}

main().catch(console.error)
