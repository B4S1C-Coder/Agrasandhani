import json
from langchain.llms import Anthropic

class Claude2AnthropicLargeLanguageModel:
    def __init__(self, max_tokens=700, *args, **kwargs):

        self.__llm_instance = Anthropic(model="claude-2",
                            max_tokens=max_tokens, *args, **kwargs)

        self.question_generation_prompt = """
Generate 5 multiple choice questions from the following text.
All the questions must be enclosed in a single JSON object. 
Further each question will be a JSON object in the format:
question: question, 1: option1, 2: option2, 3:option3, 4:option4, ans: correctoption\n
Text: """

    def generate_questions_from_text(self, text):
        prompt = self.question_generation_prompt + text

        response = self.__llm_instance.generate(prompts=[prompt])
        response_text = response.generations[0][0].text

        try:
            response_json = json.loads(response_text)
            return response_json
        except Exception as err:
            print("Failed to convert to JSON.")
            print(f"[ ERROR ] {err}")
            return response_text
