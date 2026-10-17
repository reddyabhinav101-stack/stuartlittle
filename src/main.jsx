import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Sparkles, RotateCcw, Stars, Sun, Shield, Mail, X } from "lucide-react";
import "./styles.css";

const messages = [
  {
    id: "timing",
    number: "01",
    label: "Cosmic timing",
    title: "Funny how people find each other.",
    body: "I've always loved space and thinking about just how huge the universe is. It's kind of crazy that somewhere in all that vastness, our paths crossed and I got to know you. Since space is my thing, I thought I'd make you a tiny corner of my universe. There's a little bit of me in here, and a few things that might make you giggle hehe :). I hope you like exploring it as much as I liked making it.",
    hint: "A little thought about timing"
  },
  {
    id: "sunflower",
    number: "02",
    label: "An endless stretch of sunflowers",
    title: "A little more sunshine.",
    body: "I keep thinking about the way you wrote about that endless stretch of sunflowers. I hope you get to see beautiful things like that, and have lots of ordinary days that turn lovely for no big reason (big reason can be seeing me kikikiki). You deserve those kinds of days.",
    hint: "For the sunflower person"
  },
  {
    id: "shield",
    number: "03",
    label: "The little things",
    title: "Our little shield against the sun.",
    body: "You remembered the watermelon sunscreen I use, and that made me smile. So I turned it into a tiny shield here hehe. 🍉🛡️ Maybe it's a bit like the sun in my universe and a sunflower finding its light.",
    hint: "A little thing for both of us"
  },
  {
    id: "space",
    number: "04",
    label: "A little piece of space",
    title: "A universe of tiny things.",
    body: "You gave me a little piece of space, and now it has a little place in my world. I like that a gift can be playful and thoughtful at the same time, kind of like you .",
    hint: "For the space LEGO"
  }
];

function StarField({ onSelect, opened }) {
  const stars = useMemo(() => Array.from({ length: 72 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i % 9) * 0.3}s`,
    size: i % 11 === 0 ? 4 : i % 4 === 0 ? 3 : 2,
    glow: i % 11 === 0
  })), []);
  return (
    <div className="star-field" aria-hidden="false">
      {stars.map(s => <span key={s.id} className={`background-star ${s.glow ? "glow" : ""}`} style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }} />)}
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      {messages.map((m, i) => {
        const positions = [
          { left: "22%", top: "30%" },
          { left: "76%", top: "28%" },
          { left: "72%", top: "68%" },
          { left: "26%", top: "72%" }
        ];
        return (
          <button
            key={m.id}
            className={`story-star story-star-${m.id} ${opened.includes(m.id) ? "visited" : ""}`}
            style={positions[i]}
            onClick={() => onSelect(m.id)}
            aria-label={`Open ${m.label}`}
          >
            <span className="star-icon">{i === 0 ? "✦" : i === 1 ? "✧" : i === 2 ? "✦" : "✧"}</span>
            <span className="star-label">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SceneArt({ id }) {
  if (id === "rat") return (
    <div className="art-panel rat-art" aria-label="A tiny rat astronaut floating in space">
      <div className="planet planet-large"><span /></div>
      <div className="rat-astronaut">
        <div className="rat-ear ear-left" /><div className="rat-ear ear-right" />
        <div className="rat-head"><span className="rat-eye eye-left" /><span className="rat-eye eye-right" /><span className="rat-nose" /><span className="rat-whisker whisker-left" /><span className="rat-whisker whisker-right" /></div>
        <div className="rat-suit" /><div className="rat-tail" />
      </div>
      <span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✧</span><span className="art-spark spark-c">✦</span>
      <div className="rat-label">tiny chaos. big mission.</div>
    </div>
  );
  if (id === "sunflower") return (
    <div className="art-panel sunflower-art" aria-label="A sunflower among stars">
      <div className="art-moon" />
      <div className="sunflower">
        <div className="petals">{Array.from({length: 12}, (_, i) => <i key={i} style={{ transform: `rotate(${i * 30}deg) translateY(-21px)` }} />)}</div>
        <div className="sunflower-center">✦</div>
        <div className="stem" />
        <div className="leaf leaf-one" /><div className="leaf leaf-two" />
      </div>
      <span className="art-spark spark-a">✧</span><span className="art-spark spark-b">✦</span><span className="art-spark spark-c">✧</span>
    </div>
  );
  if (id === "shield") return (
    <div className="art-panel shield-art" aria-label="A watermelon shield protecting a little planet">
      <div className="sun-rays" />
      <div className="tiny-planet"><span /></div>
      <div className="watermelon-shield">
        <div className="shield-rind" />
        <div className="shield-flesh">
          <i className="seed seed-one" /><i className="seed seed-two" /><i className="seed seed-three" /><i className="seed seed-four" />
        </div>
        <div className="shield-glint">✦</div>
      </div>
      <div className="shield-orbit" />
      <span className="art-spark shield-spark-one">✧</span><span className="art-spark shield-spark-two">✦</span>
      <span className="shield-caption">care, in the little things</span>
    </div>
  );
  if (id === "space") return (
    <div className="art-panel space-art" aria-label="A tiny astronaut and a planet">
      <div className="planet planet-large"><span /></div>
      <div className="planet planet-small" />
      <div className="astronaut"><div className="helmet"><div className="visor" /></div><div className="body-suit" /><div className="arm arm-left" /><div className="arm arm-right" /><div className="leg leg-left" /><div className="leg leg-right" /></div>
      <span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✧</span><span className="art-spark spark-c">✦</span>
    </div>
  );
  return (
    <div className="art-panel timing-art" aria-label="Two stars finding their way into the same orbit">
      <div className="timing-orbit orbit-a" /><div className="timing-orbit orbit-b" />
      <div className="timing-star star-a">✦</div><div className="timing-star star-b">✧</div>
      <div className="timing-heart">♡</div>
      <span className="art-spark spark-a">✧</span><span className="art-spark spark-b">✦</span><span className="art-spark spark-c">✧</span>
    </div>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [opened, setOpened] = useState([]);
  const [showLetter, setShowLetter] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const ratStory = {
    id: "rat", number: "✦", label: "Your kind of chaos",
    title: "Shinchan would approve.",
    body: "A tiny rat astronaut has officially reported for duty. Its mission: steal one star, cause absolutely unnecessary chaos, and remind you that being silly is a very important life skill (like me lol). This message has no deeper meaning. Probably.",
  };
  const active = selected === "rat" ? ratStory : messages.find(m => m.id === selected);
  const openStory = id => {
    setSelected(id);
    setOpened(prev => prev.includes(id) ? prev : [...prev, id]);
    setShowLetter(false);
    setShowFinal(false);
  };
  const closeScene = () => { setSelected(null); setShowLetter(false); setShowFinal(false); };
  const restart = () => { setStarted(false); setSelected(null); setOpened([]); setShowLetter(false); setShowFinal(false); };

  return (
    <main className="app-shell">
      <StarField onSelect={openStory} opened={opened} />
      <header className="topbar">
        <div className="brand"><span className="brand-mark">✦</span> a little universe</div>
        <div className="topbar-note">made with a little extra thought <Heart size={13} fill="currentColor" /></div>
      </header>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section key="welcome" className="welcome-screen" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .65 }}>
            <div className="eyebrow"><Sparkles size={14} /> FROM MY UNIVERSE TO YOURS</div>
            <h1>The universe<br /><em>took its sweet time.</em></h1>
            <p className="welcome-copy">A little corner of the universe I love, a few things that reminded me of you,<br className="desktop-break" /> and something I made just for you.</p>
            <button className="primary-button" onClick={() => setStarted(true)}>Step inside <ArrowRight size={17} /></button>
            <div className="welcome-foot"><span>✦</span> best explored with a little curiosity <span>✦</span></div>
            <div className="welcome-orb orb-left" /><div className="welcome-orb orb-right" />
          </motion.section>
        ) : (
          <motion.section key="universe" className="universe-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="universe-heading">
              <div className="eyebrow"><Stars size={14} /> YOUR LITTLE CORNER OF THE COSMOS</div>
              <h2>Some things are small.<br /><em>Some stay with you.</em></h2>
              <p>Tap a star. There's a little piece of my world, your world, and the little things in between.</p>
            </div>
            <div className="map-instruction"><span className="pulse-dot" /> choose a star to begin</div>
            <div className="progress-row">
              {messages.map((m, i) => <button key={m.id} className={`progress-dot ${opened.includes(m.id) ? "done" : ""}`} onClick={() => openStory(m.id)} aria-label={`Open ${m.label}`}><span>{opened.includes(m.id) ? "✓" : m.number}</span></button>)}
            </div>
            <div className="universe-bottom">
              <span>{opened.length} of {messages.length} little discoveries</span>
              <button className="text-button" onClick={() => setShowLetter(true)}>A note for you <Mail size={15} /></button>
            </div>
            <button className="chaos-button" onClick={() => openStory("rat")}>Psst… a little chaos for amul<span>🐭</span></button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {started && active && !showLetter && !showFinal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeScene}>
            <motion.section className={`story-modal modal-${active.id}`} initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: .98 }} transition={{ duration: .35 }} onClick={e => e.stopPropagation()}>
              <button className="close-button" onClick={closeScene} aria-label="Close"><X size={18} /></button>
              <div className="modal-number">{active.number} <span> / 04</span></div>
              <SceneArt id={active.id} />
              <div className="modal-copy">
                <div className="eyebrow">{active.label}</div>
                <h2>{active.title}</h2>
                <p>{active.body}</p>
                {active.id === "shield" && <div className="tiny-note"><Shield size={15} /> Literally a shield against the sun. For both of us, and a reminder that care often lives in the smallest details.</div>}
                {active.id === "rat" && <div className="tiny-note"><Sparkles size={15} /> Official space-agency report: this rat has zero qualifications and maximum confidence.</div>}
                <div className="modal-actions">
                  <button className="subtle-button" onClick={closeScene}>Back to the stars</button>
                  <button className="next-button" onClick={() => {
                    const idx = messages.findIndex(m => m.id === active.id);
                    if (active.id === "rat") { closeScene(); setShowLetter(true); }
                    else if (idx < messages.length - 1) openStory(messages[idx + 1].id);
                    else { closeScene(); setShowLetter(true); }
                  }}>{active.id === "space" || active.id === "rat" ? "One last thing" : "Next little thing"} <ArrowRight size={15} /></button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {started && showLetter && (
          <motion.div className="modal-backdrop letter-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLetter(false)}>
            <motion.section className="letter-card" initial={{ opacity: 0, y: 20, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 10 }} onClick={e => e.stopPropagation()}>
              <button className="close-button dark-close" onClick={() => setShowLetter(false)} aria-label="Close"><X size={18} /></button>
              <div className="letter-decoration">✦ &nbsp; ♡ &nbsp; ✦</div>
              <div className="eyebrow">A LITTLE NOTE BACK</div>
              <h2>For my favorite little chaos.</h2>
              <p>Hey you 🌻,</p>
              <p>Your letter made me smile so much. I wanted to make you something too, something that felt like me but had little pieces of you in it.</p>
              <p>You'll find a few silly things in here too, hehe. Some might make you laugh, some might make you roll your eyes at me. And yes, next time I'll try harder to guess the songs from the opening music, okay? 😂</p>
              <p>I don't know what the universe has planned, and I don't think we need to figure it all out right now. I'm just really glad our paths crossed and that I got the chance to know you a little more.</p>
              <p>Thank you for your letter and for being so thoughtful with me. I hope this little universe makes you smile the way your gift made me smile. </p>
              <p className="letter-signoff">,  Abhi <span>♡</span></p>
              <button className="primary-button letter-finish" onClick={() => { setShowLetter(false); setShowFinal(true); }}>One last little surprise <Sparkles size={16} /></button>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {started && showFinal && (
          <motion.div className="modal-backdrop final-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFinal(false)}>
            <motion.section className="final-card" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} onClick={e => e.stopPropagation()}>
              <button className="close-button" onClick={() => setShowFinal(false)} aria-label="Close"><X size={18} /></button>
              <div className="final-sun">☀</div>
              <div className="eyebrow">A SMALL REMINDER</div>
              <h2>Welcome to our little orbit.</h2>
              <p>I hope life gives you lots of things to be excited about, plenty of reasons to laugh, and people who keep discovering new things to love about you. And yes, let's remember our sunscreen. 🍉</p>
              <div className="final-stars">✦ &nbsp; ✧ &nbsp; ♡ &nbsp; ✧ &nbsp; ✦</div>
              <button className="subtle-button restart-button" onClick={restart}><RotateCcw size={15} /> Explore again</button>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="site-footer">
        <span>made with care, one little detail at a time</span>
        <span className="footer-heart">♡</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
