import {ITraducao} from '@/interfaces/traducao.interface';

const API_BASE_URL = 'https://sua-api.com/api';

export class HomeService {
  static async postTraducao(texto: string): Promise<ITraducao> {
      try {
        const response = await fetch(`https://4f4e-2804-214-4009-922-bc50-4af8-908d-a376.ngrok-free.app/api/traduzir`, {
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