'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TECHS = [
  { id: 'laravel',    label: 'Laravel',    color: '#FF2D20', bg: '#1a0a09',
    icon: `<svg viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01a.814.814 0 0 1-.16.043.737.737 0 0 1-.15.017.812.812 0 0 1-.16-.047L.892 39.944A.801.801 0 0 1 .49 39.25V6.334c0-.072.01-.143.029-.207.006-.02.016-.039.023-.058.021-.053.044-.104.076-.152.013-.02.027-.037.042-.055.032-.038.068-.073.108-.104.02-.015.037-.032.059-.045L10.285.276a.8.8 0 0 1 .8 0l9.45 5.455.026.018c.035.024.068.05.098.08.013.012.025.024.037.037.031.034.059.07.082.11.012.02.023.04.032.063.024.055.04.113.043.173.002.014.004.027.004.04v21.018l8.008-4.615V11.78c0-.072.01-.143.029-.208.007-.02.016-.039.023-.057.021-.054.044-.104.077-.152.013-.02.027-.038.042-.056.032-.038.067-.072.108-.103.02-.016.037-.032.058-.046L49.136 5.4a.8.8 0 0 1 .8 0l9.208 5.307.03.018c.033.023.064.048.092.075l.008.008.001.001zm-1.601 10.527V13.08l-3.351 1.932-4.656 2.683v9.015l8.007-4.62zM38.614 39.17v-9.018l-4.59 2.631-13.121 7.512v9.096l17.711-10.221zM1.69 7.234v31.588l17.71 10.216v-9.096l-9.208-5.257-.014-.009-.022-.013c-.033-.02-.063-.044-.091-.07l-.011-.012a.818.818 0 0 1-.079-.1l-.014-.02a.8.8 0 0 1-.055-.124l-.007-.023a.796.796 0 0 1-.025-.185V12.635L1.69 7.234zm9.005-5.484L2.686 6.334l8.008 4.62 8.007-4.62-8.007-4.584zM10.29 12.635l-4.656-2.683-3.35-1.932v9.018l8.006 4.62V12.635zm9.452 16.089l4.657-2.683 3.35-1.932-8.007-4.618-8.007 4.618 8.007 4.615zm9.207-17.337l-8.007 4.62v9.018l4.656-2.684 3.351-1.932v-9.002zm19.412 1.932l-8.007-4.615-8.007 4.615 8.007 4.62 8.007-4.62z" fill="#FF2D20"/></svg>` },
  { id: 'vue',        label: 'Vue.js',     color: '#42B883', bg: '#0a1a13',
    icon: `<svg viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41B883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495E"/></svg>` },
  { id: 'nestjs',     label: 'NestJS',     color: '#E0234E', bg: '#1a0a10',
    icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M442.18 403.636a70.77 70.77 0 01-9.131 5.21c-12.576 6.143-26.35 8.413-39.759 7.233a80.898 80.898 0 01-16.397-3.56c.37-.218.724-.448 1.077-.667 11.432-7.164 19.68-17.64 25.1-29.893 3.015-6.81 5.073-14.015 5.824-21.398.498-4.96.47-9.97-.16-14.913-.073-.58-.153-1.16-.24-1.74.9.26 1.793.533 2.68.828 13.46 4.467 24.517 12.89 32.037 24.33 3.44 5.24 5.96 10.94 7.07 17.13a44.87 44.87 0 01-8.1 17.44z" fill="#E0234E"/><path d="M293.97 411.37c-16.02-9.248-27.773-23.118-34.207-39.533a74.68 74.68 0 01-4.517-19.707c-.514-6.073-.367-12.224.512-18.3.898-6.204 2.655-12.262 5.194-18.02 5.25-11.867 13.626-22.11 24.457-29.667 10.842-7.563 23.483-12.208 36.762-13.547 16.39-1.636 33.3 1.91 47.94 10.434 3.197 1.845 6.263 3.89 9.14 6.12a74.455 74.455 0 00-12.79-3.41c-13.63-2.477-27.858-.9-40.728 4.48-10.93 4.592-20.59 11.76-28.003 20.97-7.387 9.17-12.306 20.277-14.144 31.97-1.03 6.573-1.026 13.3.074 19.892 1.478 8.798 4.896 17.266 10.026 24.725 5.143 7.473 11.96 13.847 19.85 18.63.526.318 1.05.63 1.58.932-.72-.317-1.42-.645-2.15-.97z" fill="#E0234E"/><path d="M372.154 340.8c-1.04 7.51-3.34 14.88-6.8 21.74-7.06 14.05-18.59 25.79-32.87 33.14-14.27 7.34-30.55 9.98-46.5 7.56a80.98 80.98 0 01-24.97-8.24 72.2 72.2 0 01-16.1-11.95c14.69 7.87 31.84 11.05 48.72 8.79 14.39-1.93 28.11-7.66 39.48-16.67 8.65-6.83 15.64-15.57 20.39-25.54 2.71-5.69 4.51-11.76 5.4-17.97.88-6.17.84-12.47-.12-18.64-.97-6.17-2.95-12.17-5.85-17.76 1.22 1.04 2.41 2.12 3.55 3.24 11.64 11.28 18.39 26.49 18.32 42.17a53.16 53.16 0 01-2.65 19.12z" fill="#E0234E"/></svg>` },
  { id: 'typescript', label: 'TypeScript', color: '#3178C6', bg: '#091525',
    icon: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" rx="10" fill="#3178C6"/><path d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5-.3-.3-31.7-.4-70-.4l-69.5.3v16.3zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 4 9.2 11 9.6 12.8.1.5-17.3 12.3-27.8 18.8-.4.3-2-1.4-3.6-4-5.2-7.4-10.5-10.6-18.8-11.2-12.1-.8-20 5.5-19.9 16 0 3.1.5 5 1.8 7.6 2.8 5.6 8 9 23.2 15.9 28.6 12.3 40.9 20.4 48.5 32 8.5 13.1 10.4 34.1 4.6 49.6-6.3 16.9-22 28.4-44 32.4-6.8 1.2-22.8 1-30.1-.4-15.8-2.9-30.8-11-40-21.7-3.6-4.2-10.6-14.7-10.2-15.4l3.8-2.4 15-8.7 11.3-6.5 2.5 3.5c3.4 5.2 11 12.2 15.5 14.5 13.8 7 32.7 6 42-2 3.7-3.2 5.3-6.5 5.3-11.3 0-4.4-.6-6.3-3-9.5-3.1-4-9.3-7.5-27-15.2-20.3-8.7-29-14.1-37-22.5-4.6-4.9-9-12.6-11.1-19.5-1.5-5.4-1.9-18.9-.7-24.5 4.3-20 19.4-34 41.1-38.3 7-1.4 23.4-.8 30.4 1.1z" fill="#fff"/></svg>` },
  { id: 'mysql',      label: 'MySQL',      color: '#00758F', bg: '#091519',
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M2.001 88.878C13.287 97.885 27.95 103 43.095 103c14.68 0 28.985-4.823 40.115-13.51C95.217 80.07 102.52 66.84 102.52 53c0-7.64-2.052-15.126-6.045-21.71L91.24 38.1l-.965-7.46-5.744 5.133a52.255 52.255 0 00-8.186-4.268l-1.43-7.185-6.45 3.614a53.3 53.3 0 00-9.18-2.273L57.74 19l-7.14 2.86c-2.8.353-5.564.88-8.27 1.567l-5.637-4.742-.868 7.18A53.16 53.16 0 0028.39 30.4l-6.12-4.688-.82 7.614A51.87 51.87 0 0015.84 40.1l-7.09-2.29 2.534 7.278a53.256 53.256 0 00-5.18 12.94L0 60.16l4.22 6.244a53.378 53.378 0 00.638 14.084L2.001 88.878z" fill="#00758F"/><path d="M122.001 88.878C110.715 97.885 96.052 103 80.907 103c-14.68 0-28.985-4.823-40.115-13.51C28.785 80.07 21.482 66.84 21.482 53c0-7.64 2.052-15.126 6.045-21.71l5.235 6.81.965-7.46 5.744 5.133a52.255 52.255 0 018.186-4.268l1.43-7.185 6.45 3.614a53.3 53.3 0 019.18-2.273L66.262 19l7.14 2.86c2.8.353 5.564.88 8.27 1.567l5.637-4.742.868 7.18a53.16 53.16 0 017.435 4.535l6.12-4.688.82 7.614a51.87 51.87 0 015.61 6.774l7.09-2.29-2.534 7.278a53.256 53.256 0 015.18 12.94L128 60.16l-4.22 6.244a53.378 53.378 0 01-.638 14.084l2.859 8.39z" fill="#F29111"/></svg>` },
  { id: 'mongodb',    label: 'MongoDB',    color: '#47A248', bg: '#0a1a0b',
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.821 23.185s0-10.361 .344-10.36c.266 0 .612 13.365.612 13.365-.323-.05-.956-2.886-.956-3.005z" fill="#A6A385"/><path d="M16.161 26.193c-.434-3.172-1.403-5.64-1.403-5.64s-.34-3.945-.34-5.84c0-2.68.248-5.25.37-5.856.154-.758.465-2.082.862-3.2.338-.96.982-2.48 1.458-3.457l1.218 2.52c.516 1.344.88 2.766 1.073 4.176.117.888.152 1.78.153 2.674 0 .945-.065 1.887-.196 2.822-.233 1.67-.797 3.28-1.663 4.73l-.53 4.07z" fill="#499D4A"/><path d="M15.545 26.193c.143-.627.24-1.26.29-1.9.058-.714.075-1.43.052-2.143a23.517 23.517 0 00-.287-3.053c-.257-1.698-.79-3.345-1.573-4.875a18.655 18.655 0 00-1.12-1.9c-.25-.362-.528-.706-.776-1.07-.14-.207-.264-.417-.368-.637l-.144-.328C12.47 8.4 13.768 6.01 15.1 4l.3.44c-.59 1.05-1.122 2.133-1.593 3.242-.34.81-.64 1.633-.872 2.473-.12.434-.222.87-.3 1.31-.077.44-.128.885-.162 1.33-.066.9-.06 1.8.01 2.696.138 1.75.56 3.472 1.245 5.1.375.9.84 1.762 1.385 2.568.54.8 1.155 1.55 1.84 2.23l-.41 1.8z" fill="#58AA50"/></svg>` },
  { id: 'nextjs',     label: 'Next.js',    color: '#ffffff', bg: '#111111',
    icon: `<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black"/></mask><g mask="url(#mask0)"><circle cx="90" cy="90" r="90" fill="black"/><path d="M149.508 157.52L69.142 54H54V125.999H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)"/><rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/><defs><linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></g></svg>` },
  { id: 'react',      label: 'React',      color: '#61DAFB', bg: '#091519',
    icon: `<svg viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>` },
]

type Card = {
  uid: string
  techId: string
  flipped: boolean
  matched: boolean
}

type GameStatus = 'idle' | 'playing' | 'won'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildCards(): Card[] {
  const pairs = TECHS.flatMap(t => [
    { uid: `${t.id}-a`, techId: t.id, flipped: false, matched: false },
    { uid: `${t.id}-b`, techId: t.id, flipped: false, matched: false },
  ])
  return shuffle(pairs)
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [status, setStatus] = useState<GameStatus>('idle')
  const [locked, setLocked] = useState(false)
  const [time, setTime] = useState(0)
  const [best, setBest] = useState<number | null>(null)

  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [status])

  const startGame = useCallback(() => {
    setCards(buildCards())
    setSelected([])
    setMoves(0)
    setTime(0)
    setStatus('playing')
    setLocked(false)
  }, [])

  const flip = useCallback((uid: string) => {
    if (locked || status !== 'playing') return
    setCards(prev => {
      const card = prev.find(c => c.uid === uid)
      if (!card || card.flipped || card.matched) return prev
      return prev.map(c => c.uid === uid ? { ...c, flipped: true } : c)
    })
    setSelected(prev => [...prev, uid])
  }, [locked, status])

  useEffect(() => {
    if (selected.length !== 2) return
    setLocked(true)
    setMoves(m => m + 1)
    const [a, b] = selected.map(uid => cards.find(c => c.uid === uid)!)
    const match = a.techId === b.techId
    setTimeout(() => {
      setCards(prev => prev.map(c =>
        selected.includes(c.uid)
          ? { ...c, matched: match, flipped: match }
          : c
      ))
      setSelected([])
      setLocked(false)
    }, match ? 500 : 900)
  }, [selected])

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setStatus('won')
      setBest(prev => prev === null || time < prev ? time : prev)
    }
  }, [cards])

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const getTech = (id: string) => TECHS.find(t => t.id === id)!

  return (
    <section className="relative w-full py-16 px-4 sm:py-24" id="game">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-[#1D9E75] text-xs sm:text-sm font-mono tracking-widest mb-3 uppercase">
            Mini-jeu
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Memory Tech</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto">
            Retrouve les paires de technologies de mon stack !
          </p>
        </motion.div>

        {/* Stats bar */}
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-4 gap-2 mb-6 sm:mb-8"
          >
            {[
              { value: moves, label: 'Coups' },
              { value: fmt(time), label: 'Temps' },
              ...(best !== null ? [{ value: fmt(best), label: 'Record' }] : [{ value: '—', label: 'Record' }]),
              { value: `${cards.filter(c => c.matched).length / 2}/${TECHS.length}`, label: 'Paires' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="text-center rounded-xl py-2 px-1"
                style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-[#1D9E75] font-mono text-base sm:text-xl font-bold leading-tight">
                  {value}
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Win screen */}
        <AnimatePresence>
          {status === 'won' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-6 p-6 sm:p-8 rounded-2xl border border-[#1D9E75]/30 bg-[#1D9E75]/5"
            >
              <p className="text-4xl sm:text-5xl mb-2">Congrulations !</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Bien joué !</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {moves} coups · {fmt(time)}
                {best === time && (
                  <span className="ml-2 text-[#1D9E75] font-semibold">Nouveau record !</span>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {status === 'idle' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 py-10"
          >
            <div className="flex flex-wrap justify-center gap-2 max-w-xs opacity-40">
              {TECHS.map(t => (
                <div
                  key={t.id}
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: t.bg, border: `1px solid ${t.color}33` }}
                >
                  <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: t.icon }} />
                </div>
              ))}
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: '#1D9E75' }}
            >
              Commencer le jeu
            </button>
          </motion.div>
        ) : (
          /* 4 colonnes sur mobile, cartes carrées via aspect-ratio */
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {cards.map((card, i) => {
              const tech = getTech(card.techId)
              const isOpen = card.flipped || card.matched || selected.includes(card.uid)
              return (
                <motion.div
                  key={card.uid}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  onClick={() => !isOpen && flip(card.uid)}
                  className="relative cursor-pointer w-full"
                  style={{ perspective: '600px', aspectRatio: '1 / 1' }}
                >
                  <motion.div
                    animate={{ rotateY: isOpen ? 0 : 180 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{
                      transformStyle: 'preserve-3d',
                      position: 'absolute',
                      inset: 0,
                    }}
                  >
                    {/* Front (logo) */}
                    <div
                      className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1 border"
                      style={{
                        backfaceVisibility: 'hidden',
                        background: tech.bg,
                        borderColor: card.matched ? tech.color : `${tech.color}44`,
                        boxShadow: card.matched ? `0 0 10px ${tech.color}44` : 'none',
                        transition: 'box-shadow 0.3s',
                      }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8" dangerouslySetInnerHTML={{ __html: tech.icon }} />
                      <span
                        className="font-mono leading-tight text-center px-1"
                        style={{
                          color: tech.color,
                          fontSize: 'clamp(8px, 2vw, 12px)',
                        }}
                      >
                        {tech.label}
                      </span>
                    </div>
                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-xl flex items-center justify-center border border-white/10"
                      style={{
                        backfaceVisibility: 'hidden',
                        background: '#0d1117',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <span
                        className="text-[#1D9E75] font-mono font-bold select-none"
                        style={{ fontSize: 'clamp(12px, 3vw, 20px)' }}
                      >
                        {'</>'}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Restart */}
        {status !== 'idle' && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              onClick={startGame}
              className="px-6 py-2 rounded-lg text-sm font-mono text-gray-400 border border-white/10 hover:border-[#1D9E75]/50 hover:text-[#1D9E75] transition-all duration-200"
            >
              ↺ Recommencer
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

