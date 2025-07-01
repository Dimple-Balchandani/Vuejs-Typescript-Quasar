import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CardService } from '../../src/components/CardService';

const STORAGE_KEY = 'aspire_cards';

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

describe('CardService', () => {
  beforeEach(() => {
    clearStorage();
  });
  afterEach(() => {
    clearStorage();
  });

  it('should add default cards if empty', () => {
    expect(CardService.getCards().length).toBe(0);
    CardService.addCard('Mark Henry');
    CardService.addCard('Dimple');
    const cards = CardService.getCards();
    expect(cards.length).toBe(2);
    expect(cards[0].name).toBe('Mark Henry');
    expect(cards[1].name).toBe('Dimple');
  });

  it('should add a new card', () => {
    CardService.addCard('Test User');
    const cards = CardService.getCards();
    expect(cards.length).toBe(1);
    expect(cards[0].name).toBe('Test User');
    expect(cards[0].number).toMatch(/\d{4} \d{4} \d{4} \d{4}/);
  });

  it('should toggle freeze status', () => {
    const card = CardService.addCard('Freeze Me');
    expect(card.frozen).toBe(false);
    CardService.toggleFreeze(card.id);
    const updated = CardService.getCards().find((c) => c.id === card.id);
    expect(updated?.frozen).toBe(true);
    CardService.toggleFreeze(card.id);
    const unfrozen = CardService.getCards().find((c) => c.id === card.id);
    expect(unfrozen?.frozen).toBe(false);
  });

  it('should persist cards to localStorage', () => {
    CardService.addCard('Persisted');
    const cards = CardService.getCards();
    expect(cards.length).toBe(1);
    // Simulate reload
    const cardsReloaded = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    expect(cardsReloaded.length).toBe(1);
    expect(cardsReloaded[0].name).toBe('Persisted');
  });
});
