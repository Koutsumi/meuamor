"use client"; // This is a client component
import { useEffect, useState } from "react";
import ReactInputMask from 'react-input-mask';

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [timeDifference, setTimeDifference] = useState({ days: 0, hours: 0 });
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Função para calcular a diferença de dias e horas
    const calculateTimeDifference = () => {
      const currentDate = new Date();
      const targetDate = new Date('2024-06-02T00:00:00'); // Certifique-se de que é uma data válida

      // Certificar-se de que a subtração retorna milissegundos (que é um number)
      const timeDiff = currentDate.getTime() - targetDate.getTime();

      // Converte milissegundos em dias e horas
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      // Atualiza o estado com a diferença calculada
      setTimeDifference({ days: daysDiff, hours: hoursDiff });
    };

    // Chama a função quando o componente for montado
    calculateTimeDifference();

    // Atualiza a cada 1 hora para manter o tempo em tempo real
    const interval = setInterval(calculateTimeDifference, 3600000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(name, password);
  };

  const login = (name: string, password: string) => {
    if(name.toLowerCase() === 'leticia desiderio'.toLowerCase() && password === '02/06/2024'){
      setIsModalOpen(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Nome ou senha errada");
    } 
  }

  return (
    <main className="w-full flex flex-col items-center justify-center min-h-[100vh] bg-heart bg-contain bg-no-repeat bg-center">
      <p className="bg-white bg-opacity-80 px-2 rounded-lg">{errorMessage}</p>
      <section className="w-full max-w-[55%]  lg:max-w-[500px] flex flex-col items-center justify-center ">
        <div className="w-full max-w-[90%] flex flex-col items-center justify-center">
          
          <form onSubmit={handleSubmit} action="" className="w-full flex flex-col items-center justify-center text-white">
            <label htmlFor="" className="w-full flex flex-col items-start lg:items-center justify-center my-2">
              <p className="w-full lg:w-[80%] text-left">Seu nome</p>
              <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome sobrenome" className="w-full lg:w-[80%] px-2 py-1 bg-red-200 rounded-lg bg-opacity-50 text-black placeholder-white"/>
            </label>

            <label htmlFor="" className="w-full flex flex-col items-start lg:items-center justify-center my-2">
              <p className="w-full lg:w-[80%] text-left">Nosso dia</p>
              <ReactInputMask
                mask="99/99/9999"
                value={password}
                onChange={(e:any) => setPassword(e.target.value)}
              >
              {(inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
                <input 
                  {...inputProps} 
                  type="text" 
                  placeholder="Nossa data (dd/mm/aaaa)" 
                  className="w-full lg:w-[80%] px-2 py-1 bg-red-200 rounded-lg bg-opacity-50 text-black placeholder-white" 
                />
              )}
            </ReactInputMask>
            </label>
            <button type="submit" className="my-6 bg-white font-bold text-red-600 px-2 rounded-lg">ENTRAR</button>
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
function UseState<T>(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}

