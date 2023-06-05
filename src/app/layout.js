import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Model IA',
  description: 'Baseado em uma rede neural convolucional, o modelo é capaz de classificar imagens de categorias conforme a CIFR10.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
