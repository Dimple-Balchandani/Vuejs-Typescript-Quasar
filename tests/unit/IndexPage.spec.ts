import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import IndexPage from '../../src/pages/IndexPage.vue';
import { CardService } from '../../src/components/CardService';

const STORAGE_KEY = 'aspire_cards';

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

describe('IndexPage', () => {
  beforeEach(() => {
    clearStorage();
  });

  it('shows default cards on mount', async () => {
    const wrapper = mount(IndexPage);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Mark Henry');
    expect(wrapper.text()).toContain('Dimple');
  });

  it('adds a card via modal', async () => {
    const wrapper = mount(IndexPage);
    // Simulate opening modal and emitting add-card event
    wrapper.findComponent({ name: 'AddCardModal' }).vm.$emit('add-card', 'Test User');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Test User');
  });

  it('freezes/unfreezes a card and updates UI', async () => {
    const wrapper = mount(IndexPage);
    await wrapper.vm.$nextTick();
    const card = CardService.getCards()[0];
    expect(card?.frozen).toBe(false);
    // Find the freeze button and trigger a click
    const freezeBtn = wrapper.findAll('.action-btn')[0];
    expect(freezeBtn).toBeTruthy();
    await freezeBtn.trigger('click');
    await wrapper.vm.$nextTick();
    const updated = CardService.getCards().find((c) => c.id === card?.id);
    expect(updated?.frozen).toBe(true);

    // Now unfreeze by clicking the same button again
    await freezeBtn.trigger('click');
    await wrapper.vm.$nextTick();
    const unfrozen = CardService.getCards().find((c) => c.id === card.id);
    expect(unfrozen?.frozen).toBe(false);
  });
});
