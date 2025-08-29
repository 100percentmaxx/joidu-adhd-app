import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('ANTHROPIC_API_KEY not found - AI features will use mock responses');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'mock-key-for-development',
});

export const callClaude = async (systemPrompt: string, userMessage: string, maxTokens: number = 300) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { content: "AI features require Anthropic API key configuration." };
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });

    return { 
      content: message.content[0].type === 'text' ? message.content[0].text : 'Response error',
      usage: message.usage
    };
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
};