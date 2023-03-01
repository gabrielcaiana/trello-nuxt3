<script setup lang="ts">
const props = defineProps<{
  color?: string;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
const handleClick = () => {
  emit('click');
};
const btnClasses = computed(() => {
  if (props.color === 'secondary') {
    return 'border border-green-600 hover:bg-green-600 text-green-600 hover:text-white';
  }
  return 'bg-green-600 hover:bg-green-600 text-white';
});
</script>

<template>
  <button
    @click="handleClick"
    :class="[
      'transition-colors py-3 font-medium rounded-md  w-full',
      btnClasses,
    ]"
  >
    <slot />
  </button>
</template>
