import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6'>
      <div className='bg-white p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-sm text-center'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Recuperação de Senha</h2>
        <p className='text-gray-700 mb-4'>
          Para recuperar sua senha, por favor, entre em contato com o suporte.
        </p>
        <p className='text-gray-700 mb-6'>
          Você pode ligar para (XX) XXXX-XXXX ou enviar um e-mail para suporte@maremanguinhos.com.
        </p>
        <button
          onClick={() => navigate(-1)}
          className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Voltar para o Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
