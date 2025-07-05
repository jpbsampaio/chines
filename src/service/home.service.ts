import {ITraducao} from '@/interfaces/traducao.interface';

export class HomeService {
  static async postTraducao(texto: string): Promise<ITraducao> {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TRADUZIR}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ texto }),
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar tradução:', error);
        throw error;
      }
    }
}

export default HomeService;