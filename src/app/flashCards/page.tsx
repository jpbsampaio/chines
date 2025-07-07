'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar/sidebar';
import { Button } from '@/components/Button/button';
import HomeService from '@/service/flashcard.service';
import { IFlashcard } from "@/interfaces/flashcard.interface";

export default function FlashCards() {
  const [cards, setCards] = useState<IFlashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        setLoading(true);
        const data = await HomeService.getPalavra();

        const cardsData = Array.isArray(data) ? data : [data];
        setCards(cardsData);

        if (cardsData.length > 0) {
          selectRandomKey(cardsData[0]);
        }
      } catch (err) {
        console.error('Erro ao buscar flashcards:', err);
        setError('Não foi possível carregar os flashcards. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, []);

  const selectRandomKey = (card: IFlashcard) => {
    const keys = Object.keys(card.palavrasTraduzidas);
    if (keys.length > 0) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setCurrentKey(randomKey);
    }
  };

  const currentCard = cards[currentCardIndex];

  const handleOptionSelect = (key: string) => {
    setSelectedKey(key);
    setShowAnswer(true);
    setIsCorrect(key === currentKey);
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setSelectedKey(null);
    setIsCorrect(null);

    const nextIndex = (currentCardIndex + 1) % cards.length;
    setCurrentCardIndex(nextIndex);

    selectRandomKey(cards[nextIndex]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex">
      <Sidebar />

      <div className="flex-1 ml-16 p-6 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold mt-6 text-white">FlashCards</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 p-4 bg-[#1e293b] rounded-xl">
            {error}
          </div>
        ) : cards.length > 0 ? (
          <div className="w-full max-w-xl">
            <div className="bg-[#1e293b] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">
                  Card {currentCardIndex + 1} de {cards.length}
                </span>
              </div>

              <div className="min-h-[200px] bg-[#0f172a] rounded-xl p-6 flex flex-col justify-center items-center">
                {currentCard && (
                  <div className="text-center w-full">
                    <h2 className="text-xl mb-2 text-gray-400">Qual é a tradução deste caractere?</h2>

                    {/* Caractere chinês no centro */}
                    <div className="mb-8">
                      <p className="text-6xl font-semibold text-white my-8">
                        {currentKey}
                      </p>
                    </div>

                    {/* Botões com as traduções em português */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {Object.entries(currentCard.palavrasTraduzidas).map(([key, value], index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(key)}
                          disabled={showAnswer}
                          className={`p-4 rounded-lg text-lg font-medium transition-all
                            ${showAnswer && key === selectedKey && isCorrect
                            ? 'bg-green-600 text-white'
                            : showAnswer && key === selectedKey && !isCorrect
                              ? 'bg-yellow-500 text-white'
                              : selectedKey === key
                                ? 'bg-blue-600 text-white'
                                : 'bg-[#2d3d53] text-white hover:bg-[#3a4d68]'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>

                    {/* Exibição da resposta */}
                    {showAnswer && (
                      <div className="mt-8 text-center p-4 bg-[#1e293b] rounded-lg">
                        <h3 className="text-lg text-gray-300 mb-2">
                          {isCorrect ? 'Correto!' : 'Resposta correta:'}
                        </h3>
                        <p className="text-yellow-300 text-xl">
                          {currentKey}: {currentCard.palavrasTraduzidas[currentKey]}
                        </p>
                        <p className="mt-4 text-blue-400 text-lg">{currentCard.pingYin}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={showAnswer ? handleNextCard : () => setShowAnswer(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-2"
                >
                  {showAnswer ? "Próximo" : "Mostrar Resposta"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-white p-8 bg-[#1e293b] rounded-xl">
            <p>Nenhum flashcard disponível.</p>
          </div>
        )}
      </div>
    </main>
  );
}