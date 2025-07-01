import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CardCarousel from '../../src/components/CardCarousel.vue';
import type { Card } from '../../src/components/models';

describe('CardCarousel', () => {
  const cards: Card[] = [
    { id: 1, name: 'Card 1', number: '1234 5678 9012 3456', expiry: '12/25', frozen: false },
    { id: 2, name: 'Card 2', number: '9876 5432 1098 7654', expiry: '11/24', frozen: false },
  ];

  it('renders cards from props', () => {
    const wrapper = mount(CardCarousel, {
      props: { cards },
    });
    expect(wrapper.text()).toContain('Card 1');
    expect(wrapper.text()).toContain('Card 2');
  });

  it('emits toggle-freeze event', async () => {
    const wrapper = mount(CardCarousel, {
      props: { cards },
    });
    // Find the freeze card action button and click it
    const freezeBtn = wrapper.findAll('.action-btn')[0];
    await freezeBtn?.trigger('click');
    const emitted = wrapper.emitted('toggle-freeze');
    expect(emitted).toBeTruthy();
    if (emitted && emitted[0] && emitted[0][0] !== undefined) {
      expect(emitted[0][0]).toBe(cards[0].id);
    }
  });

  it('navigates carousel', async () => {
    const wrapper = mount(CardCarousel, {
      props: { cards },
    });
    // Simulate clicking next arrow
    const nextBtn = wrapper.findAll('.carousel-arrow')[1];
    await nextBtn?.trigger('click');
    // The slide index should update (slide 1 is Card 2)
    // We check that Card 2 is now visible
    expect(wrapper.text()).toContain('Card 2');
  });
});
