import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-5 transition"
            type="button"
          >
            <ArrowLeftIcon />
            Voltar
          </button>

          <h2 className="text-slate-800 font-semibold text-lg mb-2">Recuperar senha</h2>
          <p className="text-slate-500 text-sm mb-6">
            Para recuperar seu acesso, entre em contato com o suporte da Maré Entregas.
          </p>

          <div className="space-y-3">
            <a
              href="tel:+55XX000000000"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition"
            >
              <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">Ligar para o suporte</p>
                <p className="text-slate-400 text-xs">(XX) XXXX-XXXX</p>
              </div>
            </a>

            <a
              href="mailto:suporte@maremanguinhos.com"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition"
            >
              <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">Enviar e-mail</p>
                <p className="text-slate-400 text-xs">suporte@maremanguinhos.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
