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
    return 'border border-[#4589F7] hover:bg-#548AEF text-[#4589F7] hover:text-white';
  }
  return 'bg-[#4589F7] text-white filter hover:brightness-110';
});
</script>

<template>
  <button
    :class="[
      'transition-colors py-3 font-medium rounded-md  w-full',
      btnClasses,
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
