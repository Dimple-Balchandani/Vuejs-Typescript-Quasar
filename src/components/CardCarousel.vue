<template>
  <div class="card-carousel q-py-md">
    <div class="carousel-card-wrapper">
      <div class="carousel-wrapper">
        <button class="carousel-arrow left" @click="prevSlide" :disabled="slide === 0">&lt;</button>
        <div class="carousel-slide">
          <div
            class="card-outer-wrapper"
            v-for="(card, idx) in cards"
            :key="card.id"
            :style="slide === idx ? 'display: flex;' : 'display: none;'"
          >
            <CardItem :card="card" @toggle-freeze="$emit('toggle-freeze', card.id)" />
          </div>
        </div>
        <button
          class="carousel-arrow right"
          @click="nextSlide"
          :disabled="slide === cards.length - 1"
        >
          &gt;
        </button>
      </div>
    </div>
    <div class="carousel-nav-bar">
      <span
        v-for="(card, idx) in cards"
        :key="card.id"
        class="carousel-dot"
        :class="{ active: slide === idx }"
        @click="goToSlide(idx)"
      ></span>
    </div>
    <div class="actions-bar q-mt-lg row justify-around items-center">
      <div class="action-btn" @click="emitAction('toggle-freeze')">
        <div class="icon-btn"><img src="/src/assets/Freeze card.svg" alt="Freeze card" /></div>
        <div class="action-label">
          <span v-if="currentCard?.frozen">Unfreeze<br />card</span>
          <span v-else>Freeze<br />card</span>
        </div>
      </div>
      <div class="action-btn" @click="emitAction('set-spend-limit')">
        <div class="icon-btn">
          <img src="/src/assets/Set spend limit.svg" alt="Set spend limit" />
        </div>
        <div class="action-label">Set spend<br />limit</div>
      </div>
      <div class="action-btn" @click="emitAction('add-to-gpay')">
        <div class="icon-btn"><img src="/src/assets/GPay.svg" alt="Add to GPay" /></div>
        <div class="action-label">Add to<br />GPay</div>
      </div>
      <div class="action-btn" @click="emitAction('replace-card')">
        <div class="icon-btn"><img src="/src/assets/Replace card.svg" alt="Replace card" /></div>
        <div class="action-label">Replace<br />card</div>
      </div>
      <div class="action-btn" @click="emitAction('cancel-card')">
        <div class="icon-btn"><img src="/src/assets/Deactivate card.svg" alt="Cancel card" /></div>
        <div class="action-label">Cancel<br />card</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CardItem from './CardItem.vue';
import type { Card } from './models';

export default defineComponent({
  components: {
    CardItem,
  },
  props: {
    cards: {
      type: Array as () => Card[],
      required: true,
    },
  },
  emits: ['toggle-freeze', 'set-spend-limit', 'add-to-gpay', 'replace-card', 'cancel-card'],
  setup(props, { emit }) {
    const slide = ref(0);
    const currentCard = computed(() => props.cards[slide.value]);

    function prevSlide() {
      if (slide.value > 0) slide.value--;
    }
    function nextSlide() {
      if (slide.value < props.cards.length - 1) slide.value++;
    }
    function goToSlide(idx: number) {
      slide.value = idx;
    }
    function emitAction(action: string) {
      const card = currentCard.value;
      if (!card) return;
      switch (action) {
        case 'toggle-freeze':
          emit('toggle-freeze', card.id);
          break;
        case 'set-spend-limit':
          emit('set-spend-limit', card.id);
          break;
        case 'add-to-gpay':
          emit('add-to-gpay', card.id);
          break;
        case 'replace-card':
          emit('replace-card', card.id);
          break;
        case 'cancel-card':
          emit('cancel-card', card.id);
          break;
      }
    }
    return {
      slide,
      currentCard,
      prevSlide,
      nextSlide,
      goToSlide,
      emitAction,
    };
  },
});
</script>

<style scoped lang="scss">
.card-carousel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
}
.carousel-card-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: transparent;
  overflow: visible;
  min-height: 200px;
  display: flex;
  align-items: center;
  position: relative;
}
.carousel-slide {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.carousel-arrow {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #23408e;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.carousel-arrow:disabled {
  opacity: 0.2;
  cursor: default;
}
.carousel-nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 50px;
}
.carousel-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e6f9f0;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.carousel-dot.active {
  border-radius: 8px;
  width: 32px;
  background: #00d054;
}
.card-outer-wrapper {
  overflow: visible;
  margin: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.actions-bar {
  width: 100%;
  max-width: 520px;
  background: #eaf3ff;
  border-radius: 24px;
  padding: 18px 0 8px 0;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  min-width: 80px;
  cursor: pointer;
}
.icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}
.icon-btn img {
  width: 32px;
  height: 32px;
  display: block;
}
.action-label {
  color: #23408e;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-top: 6px;
  line-height: 1.1;
}

.custom-carousel-dots .q-carousel__navigation .q-btn {
  border-radius: 50%; /* default for dots */
  width: 12px;
  height: 12px;
  margin: 0 6px;
  background: #e6f9f0;
  transition: all 0.2s;
}

.custom-carousel-dots .q-carousel__navigation .q-btn--active {
  border-radius: 8px !important;
  width: 32px !important;
  min-width: 32px !important;
  background: #00d054 !important;
}

@media (max-width: 600px) {
  .carousel-card-wrapper {
    max-width: 100vw;
    margin: 0;
    padding: 0;
  }
  .carousel-wrapper {
    max-width: 100vw;
    margin: 0;
    padding: 0;
  }
  .card-outer-wrapper {
    margin: 0;
    padding: 0;
    align-items: center;
  }
  .carousel-nav-bar {
    gap: 8px;
    margin-top: 10px;
    margin-bottom: 50px;
  }
  .actions-bar {
    max-width: 100vw;
    border-radius: 16px;
    padding: 10px 0 4px 0;
  }
  .action-btn {
    min-width: 60px;
  }
  .icon-btn {
    width: 28px;
    height: 28px;
  }
  .icon-btn img {
    width: 24px;
    height: 24px;
  }
  .action-label {
    font-size: 0.8rem;
    margin-top: 3px;
  }
}
</style>
