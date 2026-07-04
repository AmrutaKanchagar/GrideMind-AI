import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import { requestChatAnswer } from '../services/gridmindApi'
import { useGridMindData } from '../context/GridMindDataContext'
import type { ChatMessage } from '../types/dashboard'

export default function ChatPanel() {
  const { analysisReport, analysisInput, ensureDemoReport } = useGridMindData()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const welcomeMessage = useMemo<ChatMessage | null>(() => {
    if (!analysisReport) {
      return null
    }

    return {
      id: 'welcome',
      role: 'assistant',
      content: `Live report ready for ${analysisReport.weather?.city ?? analysisInput.city ?? 'your site'}. Ask me about savings, solar, carbon, or battery actions.`,
    }
  }, [analysisInput.city, analysisReport])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (messages.length === 0 && welcomeMessage) {
      setMessages([welcomeMessage])
    }
  }, [messages.length, welcomeMessage])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim()) {
      return
    }

    const prompt = input.trim()
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'user', content: prompt }])
    setInput('')
    setTyping(true)
    setError(null)

    const report = analysisReport ?? (await ensureDemoReport())

    try {
      const response = await requestChatAnswer(prompt, report ?? analysisInput)

      if (!response.success) {
        throw new Error(response.error)
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.answer,
        },
      ])
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to generate a response.')
    } finally {
      setTyping(false)
    }
  }

  return (
    <section className="glass-panel flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm text-white/55">AI Chat</p>
          <h3 className="text-lg font-semibold">Conversational energy intelligence</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200">
          <Sparkles className="h-3.5 w-3.5" />
          Thinking
        </div>
      </div>

      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
            Ask a question to start a backend-powered conversation.
          </div>
        ) : null}
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {typing ? <TypingIndicator /> : null}
        {error ? <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">{error}</div> : null}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask GridMind AI anything about your facility..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-electric to-violet px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </form>
    </section>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser ? (
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric to-cyan text-white">
          <Bot className="h-4 w-4" />
        </div>
      ) : null}
      <div
        className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? 'bg-gradient-to-r from-violet-500/85 to-electric/85 text-white'
            : 'border border-white/10 bg-white/5 text-white/80'
        }`}
      >
        {message.content}
      </div>
      {isUser ? (
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-white/80">
          <User className="h-4 w-4" />
        </div>
      ) : null}
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-electric to-cyan text-white">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:240ms]" />
      </div>
    </div>
  )
}