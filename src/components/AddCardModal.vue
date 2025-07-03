<template>
  <q-dialog v-model="show">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Add New Card</div>
      </q-card-section>
      <q-form @submit.prevent="submit">
        <q-card-section>
          <q-input v-model="name" label="Card Name" :rules="nameRules" autofocus dense filled />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="close" />
          <q-btn label="Add" color="primary" type="submit" :disable="!isFormValid" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'add-card', name: string): void;
}>();

const show = ref(false);
const name = ref('');

const props = defineProps<{ modelValue: boolean }>();

watch(
  () => props.modelValue,
  (val) => (show.value = val),
);
watch(show, (val) => emit('update:modelValue', val));

function close() {
  show.value = false;
  name.value = '';
}

const nameRules = [
  (val: string) => !!val || 'Name is required',
  (val: string) => (val && val.length >= 3) || 'Name must be at least 3 characters',
  (val: string) =>
    /^[\w\s-]+$/.test(val) || 'Name can only contain letters, numbers, spaces, or hyphens',
];

const isFormValid = computed(() => nameRules.every((rule) => rule(name.value) === true));

function submit() {
  if (isFormValid.value) {
    emit('add-card', name.value.trim());
    close();
  }
}
</script>
