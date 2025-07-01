<template>
  <div class="card-carousel q-py-md">
    <div class="carousel-card-wrapper">
      <q-carousel v-model="slide" :slides="cards.length" class="carousel-wrapper" animated>
        <q-carousel-slide
          v-for="(card, idx) in cards"
          :key="card.id"
          :name="idx"
          class="flex flex-center"
        >
          <div class="card-outer-wrapper">
            <CardItem :card="card" @toggle-freeze="$emit('toggle-freeze', card.id)" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="carousel-nav-bar">
      <q-btn
        flat
        round
        icon="chevron_left"
        @click="prevSlide"
        :disable="slide === 0"
        class="carousel-arrow"
      />
      <q-carousel-navigation
        v-model="slide"
        :max="cards.length"
        color="primary"
        class="carousel-dots"
      />
      <q-btn
        flat
        round
        icon="chevron_right"
        @click="nextSlide"
        :disable="slide === cards.length - 1"
        class="carousel-arrow"
      />
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

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import CardItem from './CardItem.vue';
import type { Card } from './models';

const props = defineProps<{ cards: Card[] }>();
const emit = defineEmits<{
  (e: 'toggle-freeze', id: number): void;
  (e: 'set-spend-limit', id: number): void;
  (e: 'add-to-gpay', id: number): void;
  (e: 'replace-card', id: number): void;
  (e: 'cancel-card', id: number): void;
}>();

const slide = ref(0);
watch(
  () => props.cards.length,
  (len) => {
    if (slide.value >= len) slide.value = 0;
  },
);

const currentCard = computed(() => props.cards[slide.value]);

function prevSlide() {
  if (slide.value > 0) slide.value--;
}
function nextSlide() {
  if (slide.value < props.cards.length - 1) slide.value++;
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
.card-outer-wrapper {
  overflow: visible;
  margin: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.carousel-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: transparent;
  overflow: visible;
}
.carousel-nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 18px;
  margin-bottom: 8px;
}
.carousel-dots {
  margin: 0 8px;
}
.carousel-arrow {
  font-size: 22px;
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
    margin-bottom: 4px;
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
