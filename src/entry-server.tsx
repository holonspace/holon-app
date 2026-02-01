import { StrictMode } from 'react'
import {
    type RenderToPipeableStreamOptions,
    renderToPipeableStream,
} from 'react-dom/server'
import { Router } from 'wouter'
import App from './App'

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
    return renderToPipeableStream(
        <StrictMode>
            <Router ssrPath='/'>
                <App />
            </Router>
        </StrictMode>,
        options,
    )
}