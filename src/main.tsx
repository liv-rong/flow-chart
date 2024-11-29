// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.css'
import '@/assets/styles/markdown.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(<App />)
