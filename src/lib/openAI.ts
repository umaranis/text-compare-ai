import OpenAI from 'openai';

const openai = new OpenAI({
	organization: '<add your organization id here>',
	apiKey: '<add your API key>',
  dangerouslyAllowBrowser: true
});

export async function aiCommentary(text1: string, text2: string) {
	const completion = await openai.completions.create({
		model: 'gpt-3.5-turbo-instruct',
		prompt:
			'Compare the following two texts and identify the similarities and diferences.\n\n' +
			'Text 1:' +
			text1 +
			'\n\nText 2' +
			text2,
		max_tokens: 1000,
		temperature: 0
	});

	return completion.choices[0].text.trim();
}
