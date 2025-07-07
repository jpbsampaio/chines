import {IFlashcard} from '@/interfaces/flashcard.interface';

export class HomeService {
  static async getPalavra(): Promise<IFlashcard> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_FLASHCARD}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar palavra:', error);
      throw error;
    }
  }
}

export default HomeService;