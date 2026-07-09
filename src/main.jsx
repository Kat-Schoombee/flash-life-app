import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import FlashApp from './FlashApp.jsx';

createRoot(document.getElementById('root')).render(<FlashApp leaveState="1" />);
