import killmystartup from "./images/killmystartup.avif";
import vault from "./images/vault.avif";
import eleventales from "./images/eleventales.avif";
import grooveforge from "./images/grooveforge.avif";
import stringiq from "./images/stringiq.avif";
import rhythmKingdom from "./images/rhythm-kingdom.avif";
import hnplusplus from "./images/hnplusplus.avif";
import beacon from "./images/beacon.avif";
import multiverse from "./images/multiverse.avif";
import hermesXi from "./images/hermes-xi.avif";
import personafolio from "./images/personafolio.webp";

export interface Project {
  title: string;
  slug: string;
  week: number;
  award?: string;
  blurb: string;
  tags: string[];
  image: string;
  live?: string;
  body: string;
}

export const projects: Project[] = [
  {
    title: "KillMyStartup",
    slug: "killmystartup",
    week: 1,
    blurb: "Voice AI that stress-tests your startup idea before investors do.",
    tags: ["elevenlabs", "firecrawl"],
    image: killmystartup,
    live: "https://killmystartup.today",
    body: "Founder delusion is real. One conversation could save you from a multi-million-dollar mistake. KillMyStartup is a voice-native AI that plays devil's advocate against your startup idea before investors do. It's not a one-time answer, but a real back-and-forth. Using Firecrawl, it pulls real-time competitors, recent funding rounds, and startups that already failed doing exactly this. You talk, it pushes back; you defend, it brings evidence; you pivot, it keeps digging — until your idea breaks under evidence. This isn't an assistant that helps you find things; it helps you realize what shouldn't be built. At the end you get an Autopsy Report with everything cited. No complex UI, no fluff — just you, your idea, and the truth, built for first-time founders before bad ideas get expensive.",
  },
  {
    title: "Vault — A Voice Escape Room",
    slug: "vault",
    week: 2,
    award: "🥉",
    blurb: "A claustrophobic voice-controlled AI escape room.",
    tags: ["elevenlabs", "cloudflare"],
    image: vault,
    body: "What if you could give a room a voice — a will of its own? You're locked inside a glass vault and the walls are already moving. No buttons, no UI — only the Vault Guardian, a live ElevenLabs voice agent. Your voice is the key: it speaks a riddle, you answer out loud, and you must convince the Guardian you've earned it before the walls seal you in. Every sound — the strain of glass, the explosive shatter when you win, the slow collapse when you don't — is generated live with ElevenLabs sound effects. Play solo or co-op, where the puzzle splits in two with parallel conversations and each player holds one word of the answer. Built on ElevenLabs Conversational AI with riddles from Gemini 2.5 Flash, and Cloudflare Durable Objects powering each vault as a persistent, stateful edge process that moves the walls and broadcasts to players over WebSocket. You have 100 seconds to live.",
  },
  {
    title: "ElevenTales",
    slug: "eleventales",
    week: 3,
    blurb: "Real-time co-created stories where kids build the tale.",
    tags: ["elevenlabs", "replit"],
    image: eleventales,
    body: "Does your child spend too much time watching and scrolling? What if screen time could become something they actively create? ElevenTales transforms storytelling into a creative, real-time experience where children don't just listen — they co-create. Stories evolve in real time with rich, dynamic visuals that grow alongside a child's imagination. Kids choose a storyteller, pick a theme, show a toy, draw something, or invent a character, and the story instantly adapts. Nothing is scripted — it's a live conversation where the AI responds to their ideas and twists as they happen. Each storyteller is a real-time ElevenLabs conversational voice agent, custom-designed and voice-cloned for a distinct personality, while Google's Nano Banana generates vivid, consistent illustrations for every scene. Built and iterated rapidly on Replit. No menus, no interruptions — just voice, visuals, and imagination flowing together.",
  },
  {
    title: "GrooveForge",
    slug: "grooveforge",
    week: 4,
    blurb: "An AI toolkit for original music creation — search and forge by feel.",
    tags: ["elevenlabs", "turbopuffer"],
    image: grooveforge,
    body: "Every musician has a tune in mind. What if you could search and create music by feel, play a song to generate music Shazam-style, fuse genres into new sounds, and turn lyrics into fully composed songs? GrooveForge offers four modes: Vibe Graph (search/generate by mood, emotion, and audio characteristics); Sound Match (play a song and it extracts the sonic fingerprint to generate something original in the same feel); Text-to-Music (type a mood, genre mashup, or 'Metallica meets Taylor Swift' and it forges an original track grounded in real structure); and Lyrics-to-Music (turn words into composed songs by analyzing emotion, themes, and rhythm). It leverages millions of indexed songs and audio blueprints — built on Last.fm, Free Music Archive, the Million Song Dataset, and MusicCaps — to ground originals in real musical DNA. Powered by ElevenLabs for music generation, turbopuffer for fast vector retrieval, and Google Gemini for multimodal intelligence.",
  },
  {
    title: "StringIQ",
    slug: "stringiq",
    week: 5,
    award: "🏆",
    blurb: "A real-time AI guitar coach with multi-sensory feedback.",
    tags: ["elevenlabs", "kiro"],
    image: stringiq,
    body: "Learning an instrument is one of the most rewarding things you can do — but it's hard. Most people don't quit because they lack talent; they quit because they don't know what they're doing wrong. The problem is simple: feedback comes too late. StringIQ is a real-time AI music training system for guitar that gamifies learning by listening to every note, responding instantly, and adapting to your playing. Mistakes are caught as they happen, not after. It builds on multi-sensory feedback: you hear the coach, you see guidance, and you feel it through ambient lights that respond in real time — concert lights for home practice. Drift off tempo or hit a wrong note and the lights turn red; lock in and they stay green. Under the hood: advanced DSP with ElevenLabs Agents and TTS for real-time coaching, ElevenLabs Voice Design for the coach's voice, the Music API for backing tracks, and Tuya for the smart lights. Built entirely in Kiro with spec-driven development. StringIQ doesn't just tell you what went wrong — it trains your instincts.",
  },
  {
    title: "Rhythm Kingdom",
    slug: "rhythm-kingdom",
    week: 6,
    blurb: "A split-control rhythm arcade game synced to a live beat.",
    tags: ["elevenlabs", "zed"],
    image: rhythmKingdom,
    body: "Meet the monkey who can't stop dancing — arms up, maracas shaking, locked to a rhythm he'll never break. The catch: you can move him, but you can't control what he does next. Rhythm Kingdom is a split-control rhythm arcade game. You control where the monkey goes — but not what he does. Actions are locked to a beat sequencer: eight slots that repeat, which you fill in advance. When the beat hits, they execute. No take-backs. Jump. Roll. Throw coconuts. Miss the timing and you die. All audio — from chill to intense beats, animal sounds, voices, and tribal chants — is generated with the ElevenLabs Music and Sound Effects API, with ElevenLabs TTS voicing the game. The screen shakes to the beat, lights pulse, and every action triggers its own audio stem, all locked to tempo. Built on the Phaser 3 engine — runs entirely in the browser, no installs, no backend. Place the runes. Hit the beat. Don't fall behind.",
  },
  {
    title: "HN++",
    slug: "hnplusplus",
    week: 7,
    blurb: "Hacker News, fully redesigned — and given a voice.",
    tags: ["elevenlabs", "v0"],
    image: hnplusplus,
    body: "Hacker News is the thinking layer of Silicon Valley — but the interface hasn't changed since 2007. HN++ is a full redesign: the content and product stay the same, but the experience is rebuilt from scratch with glassmorphism, warm SF-inspired tones, frosted cards, and a calmer reading flow without losing density. Three modes shape it: Highlights surfaces the best stories of the day by topic; Feed is the live firehose in real time; Podcast turns the front page into something you can listen to, with daily episodes generated automatically from top stories. Everything streams live from the official Hacker News Firebase API. Every story has a Listen button that narrates the article blended with its comment discussion. HN++ Pod is a fully automated daily podcast, Voice Search lets you query HN by speaking, and HN++ Bot is a conversational agent with live access to HN. Built with ElevenLabs (TTS, Scribe v2, Text-to-Dialogue, Agents, Music API), Vercel v0, Firecrawl, Gemini, Cloudflare R2, and GitHub Actions. Same firehose, new senses.",
  },
  {
    title: "Beacon",
    slug: "beacon",
    week: 8,
    award: "🥉",
    blurb: "A voice-first, hands-free assistant for the visually impaired.",
    tags: ["elevenlabs", "cursor"],
    image: beacon,
    body: "There are hundreds of millions of visually impaired people around the world, and things many of us do without thinking aren't that simple for them. Beacon is a voice-first, hands-free mobile app that helps visually impaired users understand and interact with the world around them. It runs on a smartphone mounted to a lightweight chest harness and pairs with a Bluetooth remote in the user's pocket that instantly starts the assistant — wearable AI. No screens, no menus, no touching the display. Users simply talk, and Beacon sees the world and talks back in real time: scene narration, hazard detection, object recognition, and real-time reading for signs, menus, books, and labels. It also supports walking turn-by-turn navigation, live web search, location-aware weather, and smart-home control entirely through voice, with sub-second barge-in. Built with Cursor, ElevenLabs (Conversational AI Agents, TTS, Custom Voice Design, Sound Effects), Gemini as the vision layer, Firecrawl and SerpAPI for search, Google Maps + OSRM for navigation, Open-Meteo for weather, and Tuya for smart-home control. A guiding light for everyday freedom.",
  },
  {
    title: "Multiverse",
    slug: "multiverse",
    week: 9,
    blurb: "The internet's first AI-native audio marketplace.",
    tags: ["elevenlabs", "stripe"],
    image: multiverse,
    body: "Stock audio sites are slow, expensive, and royalty-heavy, and most AI audio tools still feel built for developers, not creators. Audio creators shouldn't just generate files — they should build sellable assets. Multiverse is the internet's first AI-native audio marketplace: creators generate voices, music, SFX, and ambient packs, turn them into sellable assets, and earn every time someone buys. Buyers discover and purchase AI-generated audio at low prices with one-click checkout — instead of burning API credits on unpredictable re-rolls, they buy a polished, guaranteed track for less than the cost of generating it. Creators design or clone voices, generate packs, publish to the marketplace, and earn 70% royalties on every sale. The same user can buy audio, make their own, publish it, and earn from it. Powered by ElevenLabs (TTS, Sound Effects, Music, Voice Design, Cloning), Stripe (Checkout, Subscriptions, Webhooks, Billing Portal), Clerk for auth, Gemini for visuals, Neon for managed Postgres, and Cloudflare R2 for storage. Multiverse is where AI audio becomes an asset class.",
  },
  {
    title: "Hermes XI",
    slug: "hermes-xi",
    week: 10,
    blurb: "An always-on autonomous voice assistant you can actually talk to.",
    tags: ["elevenlabs", "speech-engine"],
    image: hermesXi,
    body: "I'm a full-time dev — a 9-to-5, then I come home and build in the evenings, and on weekends I build some more. For a while it felt productive, then it started feeling like a second job I never clocked out of. I wanted an assistant that would just do the work — not another bot to babysit, not another chat box. The voice layer on most autonomous bots still feels like MP3s passed back and forth; I wanted something I could actually talk to, that felt like a real assistant sitting next to me. So I built Hermes XI (Hermes Eleven), an always-on autonomous AI assistant that learns about you, learns from you, and learns you, while building its own skills. You discuss an idea like you would with a teammate; it researches, pushes back, scopes it out. Then you hand it over and walk away, checking in whenever. It runs on two layers: a conversational voice front powered by the ElevenLabs Speech Engine, and an autonomous agent loaded with skills that does the actual work. Stack: ElevenLabs Speech Engine, OpenAI gpt-4o, the Hermes Agent framework, MiniMax M2.7 for reasoning, a React UI, and an always-on VPS. Talk to it. Hand over the work. Walk away. Come back, and it's shipped.",
  },
  {
    title: "PersonaFolio",
    slug: "personafolio",
    week: 11,
    blurb: "A conversational AI portfolio — talk to the avatar, not the page.",
    tags: ["elevenlabs", "did"],
    image: personafolio,
    body: "PersonaFolio is an AI-powered conversational portfolio platform that brings personal brands to life through digital avatars. By combining avatar technology from D-ID with realistic voice interactions from ElevenLabs, PersonaFolio lets visitors have real-time conversations with a portfolio instead of navigating traditional static pages. Visitors can ask about projects, work experience, technical skills, achievements, product decisions, and career journeys; the AI avatar responds naturally, guiding visitors through relevant content while creating a personalized, immersive experience. Whether you're a recruiter evaluating candidates, a founder showcasing achievements, or a professional building a personal brand, PersonaFolio makes discovering someone's story as simple as having a conversation. (This very site is built on the idea.)",
  },
];

export const projectIds = projects.map((p) => p.slug);

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
