#!/usr/bin/env node
// ============================================================
// Rocket+ MCP Server - AI-Powered Workflow Orchestration
// ============================================================
// The central hub for multi-MCP workflow automation
// Create workflows that chain Stripe, Shopify, GHL, and more
// Single endpoint executes entire workflow sequences
// https://rocketadd.com/docs/integrations/mcp
// ============================================================

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

// Configuration
const API_BASE = process.env.ROCKET_API_URL || 'https://rocketadd.com'
const API_KEY = process.env.ROCKET_API_KEY || ''

// Session state (populated on init)
let sessionState: {
  locationId: string | null
  locationName: string | null
  plan: string | null
  mods: string[]
  initialized: boolean
} = {
  locationId: null,
  locationName: null,
  plan: null,
  mods: [],
  initialized: false
}

// ============================================================
// Startup & Initialization
// ============================================================

function showWelcome() {
  console.error('')
  console.error('╔══════════════════════════════════════════════════════════════╗')
  console.error('║        🚀 Rocket+ MCP Server v2.2.0                          ║')
  console.error('║   Multi-MCP Workflow Orchestration Hub                       ║')
  console.error('╠══════════════════════════════════════════════════════════════╣')
  console.error('║   Connect: Stripe • Shopify • GHL • Supabase • Vercel        ║')
  console.error('║   Build workflows that chain actions across all services     ║')
  console.error('╚══════════════════════════════════════════════════════════════╝')
  console.error('')
}

function showApiKeyError() {
  console.error('')
  console.error('╔══════════════════════════════════════════════════════════════╗')
  console.error('║  ⚠️  ROCKET_API_KEY not set                                   ║')
  console.error('╠══════════════════════════════════════════════════════════════╣')
  console.error('║                                                              ║')
  console.error('║  Get your API key:                                           ║')
  console.error('║  1. Sign up at https://rocketadd.com                         ║')
  console.error('║  2. Settings → API Keys → Generate MCP Key                   ║')
  console.error('║                                                              ║')
  console.error('║  Configure your MCP client:                                  ║')
  console.error('║  {                                                           ║')
  console.error('║    "mcpServers": {                                           ║')
  console.error('║      "rocket-plus": {                                        ║')
  console.error('║        "command": "npx",                                     ║')
  console.error('║        "args": ["-y", "rocket-plus-mcp"],                    ║')
  console.error('║        "env": { "ROCKET_API_KEY": "rp_xxx" }                 ║')
  console.error('║      }                                                       ║')
  console.error('║    }                                                         ║')
  console.error('║  }                                                           ║')
  console.error('║                                                              ║')
  console.error('║  Docs: https://rocketadd.com/docs/integrations/mcp           ║')
  console.error('╚══════════════════════════════════════════════════════════════╝')
  console.error('')
}

async function initializeSession(): Promise<boolean> {
  if (!API_KEY) return false

  try {
    // Fetch location info and validate API key
    const response = await fetch(`${API_BASE}/api/mcp/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    })

    if (!response.ok) {
      console.error('⚠️  API key validation failed')
      return false
    }

    const data = await response.json()

    sessionState = {
      locationId: data.locationId,
      locationName: data.locationName || data.businessName || 'Unknown',
      plan: data.plan || 'free',
      mods: data.mods || [],
      initialized: true
    }

    console.error(`✓ Connected to: ${sessionState.locationName}`)
    console.error(`✓ Location ID: ${sessionState.locationId}`)
    console.error(`✓ Plan: ${sessionState.plan}`)
    console.error(`✓ ${sessionState.mods.length} mods enabled`)
    console.error('')
    console.error('Ready for workflow orchestration!')
    console.error('')
    console.error('Try these commands:')
    console.error('  • "Run my welcome workflow"')
    console.error('  • "Create a workflow: when Shopify order → send SMS → add to GHL"')
    console.error('  • "List my workflows"')
    console.error('  • "Get my last 5 leads"')
    console.error('')

    return true
  } catch (error) {
    console.error('⚠️  Failed to initialize:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

// ============================================================
// Initialize MCP Server
// ============================================================

const server = new Server(
  {
    name: 'rocket-plus-mcp',
    version: '2.2.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
)

// ============================================================
// Helper: Make API Call
// ============================================================

async function apiCall(endpoint: string, method: string = 'GET', body?: unknown) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: body ? JSON.stringify(body) : undefined
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `API error: ${response.status}`)
  }

  return data
}

// ============================================================
// Tools Definition
// ============================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // ========================================================
      // WORKFLOW ORCHESTRATION (Primary Feature)
      // ========================================================
      {
        name: 'run_workflow',
        description: 'Execute a saved workflow by name or ID. Workflows can chain multiple actions across different services (Stripe, Shopify, GHL, etc.) into a single automated sequence.',
        inputSchema: {
          type: 'object',
          properties: {
            workflow: { type: 'string', description: 'Workflow name or ID to execute' },
            triggerData: { type: 'object', description: 'Data to pass to the workflow (e.g., contact info, order data)' }
          },
          required: ['workflow']
        }
      },
      {
        name: 'list_workflows',
        description: 'List all available workflows. Shows workflow name, trigger type, and actions.',
        inputSchema: {
          type: 'object',
          properties: {
            status: { type: 'string', description: 'Filter by status: all, active, draft' }
          }
        }
      },
      {
        name: 'create_workflow',
        description: 'Create a new workflow from a description. Describe what should happen and the system will build the workflow.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Workflow name' },
            description: { type: 'string', description: 'Describe what the workflow should do, e.g., "When a new Shopify order comes in, create a contact in GHL, send a welcome SMS, and add to the New Customer pipeline"' },
            trigger: { type: 'string', description: 'What triggers this workflow: manual, webhook, shopify_order, stripe_payment, contact_created, etc.' }
          },
          required: ['name', 'description']
        }
      },
      {
        name: 'get_workflow',
        description: 'Get details of a specific workflow including all its actions and configuration.',
        inputSchema: {
          type: 'object',
          properties: {
            workflow: { type: 'string', description: 'Workflow name or ID' }
          },
          required: ['workflow']
        }
      },

      // ========================================================
      // CRM CORE (Contacts, Opportunities, Communication)
      // ========================================================
      {
        name: 'get_contacts',
        description: 'Get contacts/leads from the CRM. Search by name, email, or filter by tags.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query (name, email, phone)' },
            limit: { type: 'number', description: 'Max contacts to return (default: 20)' },
            tags: { type: 'string', description: 'Filter by comma-separated tags' }
          }
        }
      },
      {
        name: 'create_contact',
        description: 'Create a new contact in the CRM with optional tags and custom fields.',
        inputSchema: {
          type: 'object',
          properties: {
            firstName: { type: 'string', description: 'First name' },
            lastName: { type: 'string', description: 'Last name' },
            email: { type: 'string', description: 'Email address' },
            phone: { type: 'string', description: 'Phone number' },
            tags: { type: 'string', description: 'Comma-separated tags to add' },
            source: { type: 'string', description: 'Lead source' },
            customFields: { type: 'object', description: 'Custom field values' }
          },
          required: ['email']
        }
      },
      {
        name: 'update_contact',
        description: 'Update an existing contact.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
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
        description: 'Add tags to a contact for segmentation.',
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
        name: 'send_sms',
        description: 'Send an SMS message to a contact.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            message: { type: 'string', description: 'SMS message content' }
          },
          required: ['contactId', 'message']
        }
      },
      {
        name: 'send_email',
        description: 'Send an email to a contact.',
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
      {
        name: 'get_opportunities',
        description: 'Get deals/opportunities from sales pipelines.',
        inputSchema: {
          type: 'object',
          properties: {
            pipelineId: { type: 'string', description: 'Filter by pipeline' },
            stageId: { type: 'string', description: 'Filter by stage' }
          }
        }
      },
      {
        name: 'create_opportunity',
        description: 'Create a new deal/opportunity in a pipeline.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Deal name' },
            pipelineId: { type: 'string', description: 'Pipeline ID' },
            stageId: { type: 'string', description: 'Stage ID' },
            contactId: { type: 'string', description: 'Associated contact' },
            monetaryValue: { type: 'number', description: 'Deal value' }
          },
          required: ['name', 'pipelineId', 'stageId']
        }
      },

      // ========================================================
      // AI CONTENT GENERATION
      // ========================================================
      {
        name: 'course_generate',
        description: 'Generate a complete course with AI including modules, lessons, and quizzes.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'Course topic' },
            audience: { type: 'string', description: 'Target audience: beginner, intermediate, advanced' },
            modules: { type: 'number', description: 'Number of modules (default: 5)' },
            lessonsPerModule: { type: 'number', description: 'Lessons per module (default: 3)' },
            includeQuizzes: { type: 'boolean', description: 'Include quizzes (default: true)' }
          },
          required: ['topic']
        }
      },
      {
        name: 'content_generate',
        description: 'Generate marketing content: blog posts, emails, social posts, landing page copy.',
        inputSchema: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Content type: blog, email, social, landing, ad' },
            topic: { type: 'string', description: 'Topic or subject' },
            tone: { type: 'string', description: 'Tone: professional, casual, persuasive' },
            length: { type: 'string', description: 'Length: short, medium, long' },
            keywords: { type: 'string', description: 'SEO keywords (comma-separated)' }
          },
          required: ['type', 'topic']
        }
      },
      {
        name: 'content_rewrite',
        description: 'Rewrite or improve existing content.',
        inputSchema: {
          type: 'object',
          properties: {
            content: { type: 'string', description: 'Content to rewrite' },
            goal: { type: 'string', description: 'Goal: improve, shorten, expand, simplify, persuade' },
            tone: { type: 'string', description: 'Desired tone' }
          },
          required: ['content', 'goal']
        }
      },

      // ========================================================
      // ROCKETFLOW - Workflow Automation
      // ========================================================
      {
        name: 'rocketflow_deploy',
        description: 'Deploy a RocketFlow configuration to the CRM. Deploys contacts, custom fields, tags, pipelines, or workflows.',
        inputSchema: {
          type: 'object',
          properties: {
            json: { type: 'string', description: 'RocketFlow JSON configuration' },
            dryRun: { type: 'boolean', description: 'Validate only, do not deploy' }
          },
          required: ['json']
        }
      },

      // ========================================================
      // AI AGENTS & SKILLFORGE
      // ========================================================
      {
        name: 'agent_execute',
        description: 'Execute an AI agent workflow (lead qualification, proposal generation, smart follow-up).',
        inputSchema: {
          type: 'object',
          properties: {
            flowId: { type: 'string', description: 'Agent template: proposal-agent, smart-followup-agent, lead-qualifier' },
            triggerData: { type: 'object', description: 'Data for the agent (contactId, etc.)' }
          },
          required: ['flowId', 'triggerData']
        }
      },
      {
        name: 'skillforge_execute',
        description: 'Execute a SkillForge AI skill on a contact.',
        inputSchema: {
          type: 'object',
          properties: {
            skillId: { type: 'string', description: 'Skill: lead-qualifier, proposal-generator, content-loop' },
            contactId: { type: 'string', description: 'Contact to execute skill for' },
            input: { type: 'object', description: 'Additional input data' }
          },
          required: ['skillId', 'contactId']
        }
      },

      // ========================================================
      // ANALYTICS & INSIGHTS
      // ========================================================
      {
        name: 'insights_analyze',
        description: 'Get AI-powered insights from your CRM data.',
        inputSchema: {
          type: 'object',
          properties: {
            dataType: { type: 'string', description: 'Data to analyze: contacts, opportunities, campaigns, all' },
            timeframe: { type: 'string', description: 'Timeframe: 7d, 30d, 90d, ytd' },
            question: { type: 'string', description: 'Specific question to answer' }
          },
          required: ['dataType']
        }
      },

      // ========================================================
      // SEO & RESEARCH
      // ========================================================
      {
        name: 'seo_analyze',
        description: 'Analyze a page for SEO issues and opportunities.',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL to analyze' },
            keywords: { type: 'string', description: 'Target keywords' }
          },
          required: ['url']
        }
      },

      // ========================================================
      // UTILITY
      // ========================================================
      {
        name: 'get_location_info',
        description: 'Get current CRM location information including connected services and available mods.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'list_mods',
        description: 'List all available Rocket+ mods and their status.',
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

  // Check for API key
  if (!API_KEY) {
    return {
      content: [{
        type: 'text',
        text: `⚠️ API Key Required

To use Rocket+ tools, configure your API key:

1. Get your key at https://rocketadd.com/settings
2. Add to your MCP config:
   "env": { "ROCKET_API_KEY": "rp_your_key" }
3. Restart your MCP client

Docs: https://rocketadd.com/docs/integrations/mcp`
      }],
      isError: true
    }
  }

  try {
    // Handle workflow tools specially
    if (name === 'run_workflow') {
      const workflow = args?.workflow as string
      const triggerData = args?.triggerData || {}

      // First try to find by name, then by ID
      const result = await apiCall('/api/mcp/execute', 'POST', {
        tool: 'run_workflow',
        args: { workflow, triggerData, locationId: sessionState.locationId }
      })

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }]
      }
    }

    if (name === 'create_workflow') {
      const result = await apiCall('/api/mcp/execute', 'POST', {
        tool: 'create_workflow',
        args: {
          ...args,
          locationId: sessionState.locationId
        }
      })

      return {
        content: [{
          type: 'text',
          text: `✅ Workflow created!

**${result.workflow?.name}**
ID: ${result.workflow?.id}
Actions: ${result.workflow?.actions?.length || 0}

To run it: "Run workflow ${result.workflow?.name}"`
        }]
      }
    }

    // Standard tool execution
    const response = await fetch(`${API_BASE}/api/mcp/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        tool: name,
        args: {
          ...args,
          locationId: sessionState.locationId
        }
      })
    })

    const result = await response.json()

    if (!response.ok) {
      let errorMessage = result.error || 'Unknown error'

      if (response.status === 401) {
        errorMessage = `Authentication failed. Generate a new API key at rocketadd.com/settings`
      } else if (response.status === 403) {
        errorMessage = `Access denied. This feature may require a higher plan. Visit rocketadd.com/pricing`
      } else if (response.status === 429) {
        errorMessage = `Rate limit exceeded. Please wait and try again.`
      }

      return {
        content: [{ type: 'text', text: `Error: ${errorMessage}` }],
        isError: true
      }
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message.includes('fetch') || message.includes('ECONNREFUSED')) {
      return {
        content: [{
          type: 'text',
          text: `Connection error. Check your internet and that rocketadd.com is accessible.`
        }],
        isError: true
      }
    }

    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true
    }
  }
})

// ============================================================
// Resources
// ============================================================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'rocket://location/info',
        name: 'Location Info',
        description: 'Current CRM location and account details',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://workflows',
        name: 'Workflows',
        description: 'Available MCP workflows',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://mods',
        name: 'Mods',
        description: 'Available Rocket+ mods',
        mimeType: 'application/json'
      },
      {
        uri: 'rocket://connections',
        name: 'Connected Services',
        description: 'MCPs and services connected through Rocket+',
        mimeType: 'application/json'
      }
    ]
  }
})

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params

  try {
    let data: unknown

    switch (uri) {
      case 'rocket://location/info':
        data = sessionState.initialized
          ? { locationId: sessionState.locationId, name: sessionState.locationName, plan: sessionState.plan }
          : await apiCall('/api/crm/info')
        break

      case 'rocket://workflows':
        data = await apiCall('/api/mcp/workflows')
        break

      case 'rocket://mods':
        data = { mods: sessionState.mods }
        break

      case 'rocket://connections':
        data = {
          connections: [
            { name: 'GHL CRM', status: 'connected', type: 'crm' },
            { name: 'Stripe', status: 'available', type: 'payments' },
            { name: 'Shopify', status: 'available', type: 'ecommerce' },
            { name: 'Supabase', status: 'available', type: 'database' },
            { name: 'Vercel', status: 'available', type: 'hosting' },
            { name: 'Slack', status: 'available', type: 'communication' }
          ]
        }
        break

      default:
        throw new Error(`Unknown resource: ${uri}`)
    }

    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(data, null, 2)
      }]
    }
  } catch (error) {
    return {
      contents: [{
        uri,
        mimeType: 'text/plain',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    }
  }
})

// ============================================================
// Prompts
// ============================================================

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: 'run_workflow',
        description: 'Execute a workflow by name',
        arguments: [
          { name: 'workflow', description: 'Workflow name', required: true }
        ]
      },
      {
        name: 'create_workflow',
        description: 'Create a new automated workflow',
        arguments: [
          { name: 'description', description: 'What the workflow should do', required: true }
        ]
      },
      {
        name: 'get_leads',
        description: 'Get recent leads/contacts',
        arguments: [
          { name: 'count', description: 'Number of contacts', required: false }
        ]
      },
      {
        name: 'create_course',
        description: 'Generate a course on any topic',
        arguments: [
          { name: 'topic', description: 'Course topic', required: true }
        ]
      },
      {
        name: 'send_followup',
        description: 'Send a follow-up message',
        arguments: [
          { name: 'contact', description: 'Contact name', required: true },
          { name: 'message', description: 'Message content', required: true }
        ]
      }
    ]
  }
})

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  const prompts: Record<string, { description: string; messages: Array<{ role: 'user'; content: { type: 'text'; text: string } }> }> = {
    'run_workflow': {
      description: 'Execute a saved workflow',
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Run my workflow named "${args?.workflow || 'workflow-name'}"`
        }
      }]
    },
    'create_workflow': {
      description: 'Create a new workflow',
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Create a workflow that: ${args?.description || 'does the following actions...'}`
        }
      }]
    },
    'get_leads': {
      description: 'Get recent contacts',
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Get my last ${args?.count || 10} contacts from the CRM`
        }
      }]
    },
    'create_course': {
      description: 'Generate a course',
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Create a comprehensive course about "${args?.topic || 'the topic'}"`
        }
      }]
    },
    'send_followup': {
      description: 'Send follow-up message',
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Send a follow-up SMS to ${args?.contact || 'contact'}: "${args?.message || 'message'}"`
        }
      }]
    }
  }

  const prompt = prompts[name]
  if (!prompt) throw new Error(`Unknown prompt: ${name}`)

  return prompt
})

// ============================================================
// Start Server
// ============================================================

async function main() {
  showWelcome()

  if (!API_KEY) {
    showApiKeyError()
  } else {
    console.error('Initializing...')
    const initialized = await initializeSession()

    if (!initialized) {
      console.error('')
      console.error('⚠️  Could not connect to Rocket+ API')
      console.error('   The server will still start, but some features may not work.')
      console.error('   Check your API key and try again.')
      console.error('')
    }
  }

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch(console.error)
