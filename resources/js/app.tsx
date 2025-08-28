import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Star Wars App
        </h1>
      </div>
    </div>
  );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
