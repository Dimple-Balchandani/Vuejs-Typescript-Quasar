<template>
  <div class="aspire-card-outer">
    <div class="show-number-bar">
      <span class="show-number" @click="toggleShowNumber">
        <img src="/src/assets/remove_red_eye-24px.svg" alt="Show" class="show-icon" />
        Show card number
      </span>
    </div>
    <div class="aspire-card" :class="{ frozen: card.frozen }">
      <img src="/src/assets/Aspire Logo-1.svg" alt="Aspire Logo" class="aspire-logo" />
      <div class="card-name">{{ card.name }}</div>
      <div class="card-number-row">
        <span v-if="showNumber" class="full-number">{{ card.number }}</span>
        <template v-else>
          <span class="dots">
            <template v-for="group in 3">
              <span v-for="n in 4" :key="`dot-${group}-${n}`" class="dot">•</span>
              <span v-if="group < 3" :key="`space-${group}`">&nbsp;</span>
            </template>
          </span>
          <span class="last4">{{ card.number.slice(-4) }}</span>
        </template>
      </div>
      <div class="card-details-row">
        <span>Thru: {{ card.expiry }}</span>
        <span class="cvv">CVV: ***</span>
      </div>
      <img src="/src/assets/Visa Logo.svg" alt="VISA" class="visa-logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Card } from './models';

defineProps<{ card: Card }>();
defineEmits<(e: 'toggle-freeze', id: number) => void>();

const showNumber = ref(false);
function toggleShowNumber() {
  showNumber.value = !showNumber.value;
}
</script>

<style scoped lang="scss">
.aspire-card-outer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  box-sizing: border-box;
}
.show-number-bar {
  width: 344px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;
  margin-right: 8px;
}
.show-number {
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: #00d054;
  font-weight: 700;
  gap: 4px;
  font-family: 'Inter', sans-serif;
}
.show-icon {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}
.aspire-card {
  width: 344px;
  height: 208px;
  background: #00d054;
  border-radius: 20px;
  color: #fff;
  position: relative;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.aspire-card.frozen {
  opacity: 0.5;
}
.aspire-logo {
  position: absolute;
  top: 24px;
  right: 24px;
  height: 28px;
}
.card-name {
  position: absolute;
  left: 24px;
  top: 48px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-align: left;
  line-height: 1;
}
.card-number-row {
  position: absolute;
  left: 24px;
  top: 92px;
  font-size: 16px;
  font-family: monospace;
  letter-spacing: 2px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
.dots {
  display: flex;
}
.dot {
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
}
.last4 {
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
}

.full-number {
  font-size: 16px;
  font-family: monospace;
  letter-spacing: 2px;
}
.card-details-row {
  position: absolute;
  left: 24px;
  bottom: 70px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  font-size: 13px;
  font-weight: 500;
}
.cvv {
  margin-left: 8px;
}
.visa-logo {
  position: absolute;
  right: 24px;
  bottom: 20px;
  height: 24px;
  width: 48px;
}

@media (max-width: 600px) {
  .show-number-bar {
    width: 90vw;
    min-width: 0;
    margin-right: 0;
    padding-right: 4vw;
  }
  .aspire-card {
    width: 90vw;
    max-width: 344px;
    height: 56vw;
    max-height: 208px;
    border-radius: 16px;
    padding: 0;
  }
  .aspire-logo {
    top: 5vw;
    right: 5vw;
    height: 22px;
  }
  .card-name {
    left: 6vw;
    top: 13vw;
    font-size: 16px;
  }
  .card-number-row {
    left: 6vw;
    top: 27vw;
    font-size: 12px;
    gap: 2px;
  }
  .dot {
    font-size: 18px;
    margin-right: 1px;
  }
  .last4 {
    font-size: 12px;
    margin-left: 4px;
  }
  .year {
    font-size: 10px;
    margin-left: 3px;
  }
  .card-details-row {
    left: 6vw;
    bottom: 6vw;
    gap: 10vw;
    font-size: 10px;
  }
  .visa-logo {
    right: 6vw;
    bottom: 6vw;
    height: 16px;
    width: 32px;
  }
}
</style>
