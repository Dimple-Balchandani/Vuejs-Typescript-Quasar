<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Desktop Left Nav -->
    <q-drawer
      show-if-above
      bordered
      class="left-nav-bar text-white q-pa-none q-mb-none hidden-xs"
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

<style>
.left-nav-bar {
  background: #0c365a !important;
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
  font-size: 12px;
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
</style>
