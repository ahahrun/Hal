import { useState, useCallback } from "react";
import type { FlashCard as FlashCardType } from "../types/flashcard";
import { flashcards as defaultCards } from "../data/flashcards";
import "./FlashCard.css";

const STORAGE_KEY = "flashcard-custom-cards";

function loadCards(): FlashCardType[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as FlashCardType[];
  } catch (_err) {
    // fall through to default
    console.log(_err);
  }
  return defaultCards;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashCard() {
  const [allCards, setAllCards] = useState<FlashCardType[]>(loadCards);
  const [deck, setDeck] = useState<FlashCardType[]>(loadCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  // Manager state
  const [showManager, setShowManager] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formQ, setFormQ] = useState("");
  const [formA, setFormA] = useState("");

  const resetDeck = useCallback((cards: FlashCardType[], shuffled: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    setDeck(shuffled ? shuffleArray(cards) : cards);
    setCurrentIndex(0);
    setShowAnswer(false);
    setDone(false);
  }, []);

  const total = deck.length;
  const current = currentIndex + 1;
  const progress = total > 0 ? (current / total) * 100 : 0;

  const handleShuffle = () => {
    const next = !isShuffled;
    setIsShuffled(next);
    setDeck(next ? shuffleArray(allCards) : [...allCards]);
    setCurrentIndex(0);
    setShowAnswer(false);
    setDone(false);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex((p) => (p > 0 ? p - 1 : p));
  };

  const handleNext = () => {
    setShowAnswer(false);
    if (currentIndex === total - 1) setDone(true);
    else setCurrentIndex((p) => p + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setDone(false);
  };

  // Manager helpers
  const openAdd = () => {
    setEditingId(null);
    setFormQ("");
    setFormA("");
  };

  const openEdit = (card: FlashCardType) => {
    setEditingId(card.id);
    setFormQ(card.question);
    setFormA(card.answer);
  };

  const handleSave = () => {
    if (!formQ.trim() || !formA.trim()) return;
    let updated: FlashCardType[];
    if (editingId !== null) {
      updated = allCards.map((c) => (c.id === editingId ? { ...c, question: formQ.trim(), answer: formA.trim() } : c));
    } else {
      updated = [...allCards, { id: Date.now(), question: formQ.trim(), answer: formA.trim() }];
    }
    setAllCards(updated);
    resetDeck(updated, isShuffled);
    setEditingId(null);
    setFormQ("");
    setFormA("");
  };

  const handleDelete = (id: number) => {
    const updated = allCards.filter((c) => c.id !== id);
    setAllCards(updated);
    resetDeck(updated, isShuffled);
    setEditingId(null);
    setFormQ("");
    setFormA("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormQ("");
    setFormA("");
  };

  const handleResetToDefault = () => {
    if (confirm("Reset to the original 20 cards? Your custom cards will be lost.")) {
      localStorage.removeItem(STORAGE_KEY);
      setAllCards(defaultCards);
      setIsShuffled(false);
      resetDeck(defaultCards, false);
    }
  };

  // ── Manager view ──────────────────────────────────────────
  if (showManager) {
    return (
      <div className="flashcard-page">
        <div className="flashcard-wrapper fc-manager">
          <div className="fc-manager-header">
            <h2 className="flashcard-title" style={{ marginBottom: 0 }}>
              Manage Cards
            </h2>
            <button className="fc-icon-btn" onClick={() => setShowManager(false)} title="Back">
              ✕
            </button>
          </div>

          <div className="fc-form">
            <textarea
              className="fc-textarea"
              placeholder="Question…"
              value={formQ}
              onChange={(e) => setFormQ(e.target.value)}
              rows={2}
            />
            <textarea
              className="fc-textarea"
              placeholder="Answer…"
              value={formA}
              onChange={(e) => setFormA(e.target.value)}
              rows={3}
            />
            <div className="fc-form-actions">
              {editingId !== null && (
                <button className="fc-btn-ghost" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
              <button className="flashcard-toggle-btn" onClick={handleSave} disabled={!formQ.trim() || !formA.trim()}>
                {editingId !== null ? "Save Changes" : "+ Add Card"}
              </button>
            </div>
          </div>

          <div className="fc-card-list">
            {allCards.map((card) => (
              <div key={card.id} className={`fc-card-row ${editingId === card.id ? "fc-card-row--active" : ""}`}>
                <div className="fc-card-row-text">
                  <p className="fc-card-row-q">{card.question}</p>
                  <p className="fc-card-row-a">{card.answer}</p>
                </div>
                <div className="fc-card-row-actions">
                  <button className="fc-icon-btn" onClick={() => openEdit(card)} title="Edit">
                    ✎
                  </button>
                  <button
                    className="fc-icon-btn fc-icon-btn--danger"
                    onClick={() => handleDelete(card.id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="fc-btn-ghost fc-reset-btn" onClick={handleResetToDefault}>
            Reset to defaults
          </button>
        </div>
      </div>
    );
  }

  // ── Done view ─────────────────────────────────────────────
  if (done) {
    return (
      <div className="flashcard-page">
        <div className="flashcard-wrapper">
          <div className="flashcard-complete">
            <div className="flashcard-complete-icon">✓</div>
            <h2 className="flashcard-complete-title">All done!</h2>
            <p className="flashcard-complete-sub">You reviewed all {total} cards.</p>
            <button className="flashcard-restart-btn" onClick={handleRestart}>
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  const card = deck[currentIndex];

  // ── Main view ─────────────────────────────────────────────
  return (
    <div className="flashcard-page">
      <div className="flashcard-wrapper">
        <div className="fc-topbar">
          <button
            className={`fc-action-btn ${isShuffled ? "fc-action-btn--active" : ""}`}
            onClick={handleShuffle}
            title={isShuffled ? "Unshuffle" : "Shuffle"}
          >
            ⇄ {isShuffled ? "Shuffled" : "Shuffle"}
          </button>

          <h2 className="flashcard-title" style={{ marginBottom: 0 }}>
            Flash Cards
          </h2>

          <button
            className="fc-action-btn"
            onClick={() => {
              setShowManager(true);
              openAdd();
            }}
            title="Manage cards"
          >
            ✎ Edit
          </button>
        </div>

        <div className="flashcard-progress-row">
          <div className="flashcard-progress-bar-track">
            <div className="flashcard-progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="flashcard-progress-label">{Math.round(progress)}%</span>
        </div>

        <div className="flashcard-card">
          <span className="flashcard-card-badge">
            {current} / {total}
          </span>

          <div className="flashcard-card-body">
            {showAnswer ?
              <p className="flashcard-answer">{card.answer}</p>
            : <h3 className="flashcard-question">{card.question}</h3>}
          </div>

          <div className="flashcard-card-footer">
            <button className="flashcard-nav-btn" onClick={handlePrev} disabled={currentIndex === 0}>
              ‹ Previous
            </button>
            <button className="flashcard-toggle-btn" onClick={() => setShowAnswer((p) => !p)}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            <button className="flashcard-nav-btn" onClick={handleNext}>
              {currentIndex === total - 1 ? "Finish ✓" : "Next ›"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
