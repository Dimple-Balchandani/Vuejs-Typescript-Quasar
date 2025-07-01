<template>
  <q-dialog v-model="show">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Add New Card</div>
      </q-card-section>
      <q-form @submit.prevent="submit">
        <q-card-section>
          <q-input
            v-model="name"
            label="Card Name"
            :rules="[(val) => !!val || 'Name is required']"
            autofocus
            dense
            filled
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="close" />
          <q-btn label="Add" color="primary" type="submit" :disable="!name" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

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

function submit() {
  if (name.value) {
    emit('add-card', name.value.trim());
    close();
  }
}
</script>
