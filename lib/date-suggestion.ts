export const fetchDateSuggestion = async () => {
    //OpenAI API
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions');

    return await response.json();
}