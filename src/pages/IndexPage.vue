<template>
  <q-page class="main-layout q-pa-lg">
    <div class="top-bar row items-center justify-between q-mb-lg">
      <div class="balance-bar row items-center">
        <q-avatar size="32px" color="green-4" text-color="white">S$</q-avatar>
        <span class="balance-text q-ml-sm">3,000</span>
      </div>
      <q-btn color="primary" icon="add" label="New card" class="desktop-new-card-btn" />
    </div>
    <q-tabs
      v-model="tab"
      class="text-primary q-mb-md"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab name="my" label="My debit cards" />
      <q-tab name="company" label="All company cards" />
    </q-tabs>
    <div class="content-row row q-col-gutter-xl">
      <div class="col-7">
        <CardCarousel :cards="cards" @toggle-freeze="onToggleFreeze" />
        <AddCardModal v-model="showAddModal" @add-card="onAddCard" />
      </div>
      <div class="col-5">
        <div class="right-panel q-pa-md bg-white rounded-borders shadow-1">
          <q-expansion-item
            v-model="cardDetailsOpen"
            label="Card details"
            expand-icon="keyboard_arrow_down"
            class="accordion-header"
            header-class="q-px-md q-py-sm text-black text-weight-bold"
            dense
          >
            <div class="q-pa-md text-body2 text-grey-8">(Details placeholder)</div>
          </q-expansion-item>
          <q-expansion-item
            v-model="transactionsOpen"
            label="Recent transactions"
            expand-icon="keyboard_arrow_down"
            class="accordion-header q-mt-md"
            header-class="q-px-md q-py-sm text-black text-weight-bold"
            dense
            default-opened
          >
            <div class="q-pa-md q-pt-sm">
              <div v-for="i in 4" :key="i" class="transaction-item row items-center q-mb-md">
                <q-avatar size="36px" color="blue-2" text-color="primary" class="q-mr-md"
                  ><q-icon name="store"
                /></q-avatar>
                <div class="col">
                  <div class="row items-center justify-between">
                    <span class="text-body1 text-weight-bold">Hamleys</span>
                    <span class="text-positive text-weight-bold">+ S$ 150</span>
                  </div>
                  <div class="text-caption text-grey-7">20 May 2020</div>
                  <div class="text-caption text-grey-5">Refund on debit card</div>
                </div>
              </div>
              <div class="q-mt-lg text-center">
                <a href="#" class="view-all-link">VIEW ALL CARD TRANSACTIONS</a>
              </div>
            </div>
          </q-expansion-item>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CardService } from 'components/CardService';
import CardCarousel from 'components/CardCarousel.vue';
import AddCardModal from 'components/AddCardModal.vue';
import type { Card } from 'components/models';

const cards = ref<Card[]>(CardService.getCards());
const showAddModal = ref(false);
const tab = ref('my');
const cardDetailsOpen = ref(false);
const transactionsOpen = ref(true);

onMounted(() => {
  if (CardService.getCards().length === 0) {
    CardService.addCard('Mark Henry');
    CardService.addCard('Dimple');
    cards.value = CardService.getCards();
  }
});

function onAddCard(name: string) {
  CardService.addCard(name);
  cards.value = CardService.getCards();
}

function onToggleFreeze(cardId: number) {
  CardService.toggleFreeze(cardId);
  cards.value = CardService.getCards();
}
</script>

<style scoped>
.main-layout {
  max-width: 1200px;
  margin: 0 auto;
}
.top-bar {
  width: 100%;
}
.balance-bar {
  font-size: 1.3rem;
  font-weight: bold;
}
.balance-text {
  font-size: 1.5rem;
  font-weight: 700;
}
.content-row {
  width: 100%;
}
.right-panel {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  min-width: 320px;
}
.accordion-header {
  border-radius: 16px 16px 0 0;
  background: #fff;
  box-shadow: none;
}
.transaction-item {
  align-items: flex-start;
  min-height: 56px;
}
.view-all-link {
  color: #00d054;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
}

@media (max-width: 600px) {
  .main-layout {
    max-width: 100vw;
    padding: 0;
  }
  .content-row {
    flex-direction: column !important;
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  .col-7,
  .col-5 {
    width: 100vw !important;
    max-width: 100vw;
    flex: none !important;
    padding: 0 !important;
  }
  .right-panel {
    min-height: unset;
    width: 100vw;
    border-radius: 0 0 16px 16px;
    box-shadow: none;
    margin: 0;
    padding: 8px 0 0 0;
  }
  .rounded-borders {
    border-radius: 0 0 16px 16px;
  }
}
</style>
