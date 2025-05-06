# LinkedIn Content Strategist MCP Server

This project is a Model Context Protocol (MCP) server designed to assist with LinkedIn content strategy. It provides tools to analyze LinkedIn content history and generate viral hooks and content ideas.

## Features

- **Analyze Content History**: Identify patterns and engagement hooks from LinkedIn content history.
- **Generate Viral Hooks**: Create viral hooks and content ideas based on a given topic.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd linkedin-automation-posts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your LinkedIn access token:
   ```env
   LINKEDIN_ACCESS_TOKEN=your_access_token_here
   ```

## Usage

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the MCP server:
   ```bash
   node build/index.js
   ```

3. Use the provided tools via the MCP protocol to analyze LinkedIn content and generate ideas.

## Tools

### Analyze Content History
- **Description**: Analyze LinkedIn content history to identify patterns and engagement hooks.
- **Input**: LinkedIn user ID.

### Generate Viral Hooks
- **Description**: Generate viral hooks and content ideas for LinkedIn.
- **Input**: Topic for generating content ideas.

## Dependencies

- `@modelcontextprotocol/sdk`
- `dotenv`
- `zod`
- `axios`

## License

This project is licensed under the MIT License.