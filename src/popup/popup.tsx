import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import AnkiStatus from './AnkiStatus';

const Popup: React.FC = () => {
 
  return (
    <div className="popup">
      <h3>Popup Test</h3>
      <AnkiStatus/>
    </div>
  );
};

const container = document.getElementById('root');
if (container) createRoot(container).render(<Popup />);
