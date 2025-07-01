import type { Card } from './models';

const STORAGE_KEY = 'aspire_cards';

function randomCardNumber(): string {
  // Generates a random 16-digit card number
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10))
    .join('')
    .replace(/(\d{4})(?=\d)/g, '$1 ');
}

function randomExpiry(): string {
  // Generates a random MM/YY expiry date
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const year = String(
    (new Date().getFullYear() % 100) + Math.floor(Math.random() * 5) + 1,
  ).padStart(2, '0');
  return `${month}/${year}`;
}

function loadCards(): Card[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCards(cards: Card[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export class CardService {
  static getCards(): Card[] {
    return loadCards();
  }

  static addCard(name: string): Card {
    const cards = loadCards();
    const newCard: Card = {
      id: Date.now(),
      name,
      number: randomCardNumber(),
      expiry: randomExpiry(),
      frozen: false,
    };
    cards.push(newCard);
    saveCards(cards);
    return newCard;
  }

  static toggleFreeze(cardId: number): Card | undefined {
    const cards = loadCards();
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      card.frozen = !card.frozen;
      saveCards(cards);
    }
    return card;
  }
}
