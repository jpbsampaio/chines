'use client';

import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Input} from '@/components/Input/input';
import {Button} from '@/components/Button/button';
import HomeService from '@/service/home.service';
import {ITraducao} from '@/interfaces/traducao.interface';
import {Sidebar} from "@/components/Sidebar/sidebar";

export default function Home() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [pinYin, setPinYin] = useState('');
  const [audioPath, setAudioPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [history, setHistory] = useState<Record<string, string>>({});

  const handleTranslate = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const traducao: ITraducao = await HomeService.postTraducao(input);

      setTranslation(traducao.textZH);
      setPinYin(traducao.pingYing);
      setAudioPath(traducao.caminhoAudio);

      const dateKey = selectedDate.toDateString();
      setHistory((prev) => ({...prev, [dateKey]: traducao.textZH}));
    } catch (error) {
      console.error('Erro ao traduzir:', error);
      alert('Não foi possível obter a tradução. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex">
      <Sidebar />

      <div className="flex-1 ml-16 p-6 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold mt-6 text-white">Diário de Chinês</h1>

        <div className="w-full max-w-xl bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <label className="text-lg text-white">Digite uma frase em português:</label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Eu gosto de estudar"
            className="text-black"
          />
          <Button
            onClick={handleTranslate}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? 'Traduzindo...' : 'Traduzir'}
          </Button>

          {translation && (
            <>
              <div className="mt-4 p-4 bg-[#0f172a] rounded-xl text-xl text-center">
                <p className="mb-2 text-white">Tradução:</p>
                <span className="font-semibold text-green-400">{translation}</span>
                {pinYin && (
                  <p className="mt-2 text-sm text-yellow-300">{pinYin}</p>
                )}
              </div>
              {audioPath && (
                <div className="mt-4 p-4 bg-[#0f172a] rounded-xl text-xl text-center">
                  <p className="mb-2 text-white">Áudio:</p>
                  <audio controls src={audioPath} className="w-full mt-2"/>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full max-w-xl bg-[#1e293b] rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl mb-4 text-center text-white">Traduções do dia</h2>
          <div className="flex justify-center w-full">
            <Calendar
              onChange={(date) => setSelectedDate(date as Date)}
              value={selectedDate}
              tileContent={({date}) => {
                const key = date.toDateString();
                return history[key] ? (
                  <div className="text-xs text-green-400 text-center mt-1">✓</div>
                ) : null;
              }}
              className="rounded-xl overflow-hidden mx-auto bg-white text-black"
              tileClassName="text-black"
            />
          </div>
          <style jsx global>{`
              .react-calendar button {
                  color: #000;
              }

              .react-calendar__month-view__weekdays {
                  color: #000;
              }

              .react-calendar__navigation button {
                  color: #000;
              }

              .react-calendar__tile--active {
                  background: #006edc;
                  color: white !important;
              }

              .react-calendar__tile--now {
                  background: #ffff76;
                  color: black !important;
              }
          `}</style>
          {history[selectedDate.toDateString()] && (
            <div className="mt-4 text-center">
              <p className="text-sm text-white">Tradução de {selectedDate.toDateString()}:</p>
              <p className="text-xl text-green-400">
                {history[selectedDate.toDateString()]}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}