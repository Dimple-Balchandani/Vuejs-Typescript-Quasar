<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Desktop Left Nav -->
    <q-drawer
      show-if-above
      bordered
      class="left-nav-bar bg-primary text-white q-pa-none q-mb-none hidden-xs"
      :width="260"
    >
      <div class="aspire-logo-section q-pa-lg q-mb-lg">
        <img src="/src/assets/Aspire Logo.svg" alt="Aspire Logo" class="aspire-logo" />
        <div class="tagline q-mt-md">
          Trusted way of banking for 3,000+<br />SMEs and startups in Singapore
        </div>
      </div>
      <q-list class="nav-list">
        <q-item clickable v-ripple>
          <q-item-section avatar
            ><img src="/src/assets/Home.svg" alt="Home" class="nav-icon"
          /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple active class="active-link">
          <q-item-section avatar
            ><img src="/src/assets/Card.svg" alt="Cards" class="nav-icon"
          /></q-item-section>
          <q-item-section>Cards</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar
            ><img src="/src/assets/Payments.svg" alt="Payments" class="nav-icon"
          /></q-item-section>
          <q-item-section>Payments</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar
            ><img src="/src/assets/Credit.svg" alt="Credit" class="nav-icon"
          /></q-item-section>
          <q-item-section>Credit</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar
            ><img src="/src/assets/Account.svg" alt="Settings" class="nav-icon"
          /></q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// No script needed for static nav
</script>

<style scoped>
.left-nav-bar {
  background: #0b2a4a !important;
  color: #fff;
  border-right: 1px solid #e0e6ed;
  min-height: 100vh;
}
.aspire-logo-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.aspire-logo {
  width: 120px;
  margin-bottom: 8px;
}
.tagline {
  font-size: 0.95rem;
  color: #6ec5b8;
  line-height: 1.3;
}
.nav-list {
  margin-top: 24px;
}
.nav-icon {
  width: 28px;
  height: 28px;
  display: block;
}
.active-link {
  background: #163e63 !important;
  color: #6ec5b8 !important;
  border-radius: 8px;
}

/* Mobile Styles */
.mobile-top-bar {
  background: #0b2a4a;
  color: #fff;
  width: 100vw;
  min-height: 64px;
  z-index: 10;
}
.mobile-aspire-logo {
  width: 36px;
  height: 36px;
}
.mobile-balance {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.balance-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}
.mobile-new-card-btn {
  font-size: 0.9rem;
  min-width: 0;
  padding: 0 8px;
}
.mobile-bottom-nav {
  border-top: 1px solid #e0e6ed;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  z-index: 20;
}
.mobile-bottom-tabs {
  width: 100vw;
  min-height: 56px;
  font-size: 0.9rem;
}
</style>
