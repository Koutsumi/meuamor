"use client"; // This is a client component
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
interface FormData {
  name: string;
  password: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [timeDifference, setTimeDifference] = useState({ days: 0, hours: 0 });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    const calculateTimeDifference = () => {
      const currentDate = new Date();
      const targetDate = new Date('2024-06-02T00:00:00');

      const timeDiff = currentDate.getTime() - targetDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      setTimeDifference({ days: daysDiff, hours: hoursDiff });
    };

    calculateTimeDifference();
    const interval = setInterval(calculateTimeDifference, 3600000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: FormData) => {
    const { name, password } = data;
    if (name.toLowerCase() === 'leticia desiderio'.toLowerCase() && password === '02/06/2024') {
      setIsModalOpen(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Nome ou senha errada');
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-center min-h-[100vh] bg-heart bg-contain bg-no-repeat bg-center">
      <p className="bg-white bg-opacity-80 px-2 rounded-lg">{errorMessage}</p>
      <section className="w-full max-w-[55%] lg:max-w-[500px] flex flex-col items-center justify-center">
        <div className="w-full max-w-[90%] flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center text-white">
            <label className="w-full flex flex-col items-start lg:items-center justify-center my-2">
              <p className="w-full lg:w-[80%] text-left">Seu nome</p>
              <input
                {...register('name')}
                type="text"
                placeholder="Seu nome sobrenome"
                className="w-full lg:w-[80%] px-2 py-1 bg-red-200 rounded-lg bg-opacity-50 text-black placeholder-white"
              />
            </label>

            <div className="my-2 w-full flex flex-col items-start lg:items-center justify-center">
              <p className="w-full lg:w-[80%] text-left">Senha (Data)</p>
              <InputMask
                mask="99/99/9999"
                {...register('password')}
                className="w-full lg:w-[80%] px-2 py-1 bg-red-200 rounded-lg bg-opacity-50 text-black placeholder-white"
                placeholder="Nossa data (dd/mm/aaaa)"
              />
            </div>

            <button type="submit" className="my-6 bg-white font-bold text-red-600 px-4 py-2 rounded-lg">
              ENTRAR
            </button>
          </form>
        </div>
      </section>

      {isModalOpen && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-[90%] lg:max-w-[500px] bg-red-300 bg-opacity-80 rounded-lg py-6 px-4 text-center shadow-lg">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-bold text-[1.5em]">❤️ {timeDifference.days} dias ❤️</h1>
              <h2 className="font-bold text-[1.3em] mb-4">❤️ {timeDifference.hours} horas te amando ❤️</h2>
              <p className="text-[1.1em] px-4 mb-2">Você me fez sentir a pessoa mais amada do mundo todos esses dias.</p>
              <p className="text-[1.1em] px-4 mb-2">Obrigada por ser minha melhor companhia, minha inspiração e meu porto seguro.</p>
              <p className="text-[1.2em] px-4 mb-2 font-bold">Te amo</p>
              <p className="text-[1.1em] px-4 mb-2">Feliz dia do DEV ❤️</p>
            </div>

            <div className="flex flex-row items-center justify-between px-6 mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg">
                FECHAR
              </button>
              <p className="font-bold">Fernanda Baccarini</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}