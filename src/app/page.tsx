'use client';

import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Input} from '@/components/Input/input';
import {Button} from '@/components/Button/button';

export default function Home() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [history, setHistory] = useState<Record<string, string>>({});

  const handleTranslate = () => {
    const mockTranslation = '示例翻译';
    const dateKey = selectedDate.toDateString();
    setTranslation(mockTranslation);
    setHistory((prev) => ({...prev, [dateKey]: mockTranslation}));
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold mt-6">Diário de Chinês</h1>

      <div className="w-full max-w-xl bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col gap-4">
        <label className="text-lg">Digite uma frase em português:</label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Eu gosto de estudar"
          className="text-black"
        />
        <Button onClick={handleTranslate} className="bg-blue-600 hover:bg-blue-700 text-white">
          Traduzir
        </Button>

        {translation && (
          <div className="mt-4 p-4 bg-[#0f172a] rounded-xl text-xl text-center">
            Tradução: <span className="font-semibold text-green-400">{translation}</span>
          </div>
        )}
      </div>

      <div className="w-full max-w-xl bg-[#1e293b] rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl mb-4 text-center">Traduções por dia</h2>
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
          tileContent={({date}) => {
            const key = date.toDateString();
            return history[key] ? (
              <div className="text-xs text-green-400 text-center mt-1">✓</div>
            ) : null;
          }}
          className="rounded-xl overflow-hidden w-full"
        />
        {history[selectedDate.toDateString()] && (
          <div className="mt-4 text-center">
            <p className="text-sm">Tradução de {selectedDate.toDateString()}:</p>
            <p className="text-xl text-green-400">
              {history[selectedDate.toDateString()]}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
