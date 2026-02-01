import "@/styles/globals.css"
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Router } from "wouter"
import App from "./App.tsx"

hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>,
)