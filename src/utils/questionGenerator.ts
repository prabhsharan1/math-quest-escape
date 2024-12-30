export interface GeneratedQuestion {
  question: string;
  answer: string;
  explanation: string;
  hint: string;
}

export const generateQuestion = async (subject: string, difficulty: number, apiKey: string): Promise<GeneratedQuestion> => {
  try {
    const prompt = `Generate a ${subject} question with difficulty level ${difficulty} (1-3). 
    Format: Return a JSON object with these fields:
    - question: the actual question
    - answer: the correct answer (keep it simple, one word or number)
    - explanation: detailed explanation of the solution
    - hint: a helpful hint without giving away the answer`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a STEM education expert. Generate clear, concise questions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1000
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    return result as GeneratedQuestion;
  } catch (error) {
    console.error('Error generating question:', error);
    throw new Error('Failed to generate question');
  }
}