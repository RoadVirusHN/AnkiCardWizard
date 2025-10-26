import { createRoot } from 'react-dom/client';
import commonStyle from '@/popup/common.module.css';
import AnkiStatus from '@/popup/components/AnkiStatus/AnkiStatus';

const Popup: React.FC = () => {
 
  return (
    <div className={commonStyle.popup}>
      <h3>Popup Test</h3>
      <AnkiStatus/>
    </div>
  );
};

const container = document.getElementById('root');
if (container) createRoot(container).render(<Popup />);
