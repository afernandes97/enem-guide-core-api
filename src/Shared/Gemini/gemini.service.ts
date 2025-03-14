import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async sendMessage(prompt: string) {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
      });

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return { message: text };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw new Error('Failed to get a response from Gemini AI');
    }
  }
}
