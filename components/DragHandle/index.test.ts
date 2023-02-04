import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DragHandle from './index.vue';

describe('Icon', () => {
  it('renders the correct icon', () => {
    const wrapper = shallowMount(DragHandle);
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['drag-handle', 'cursor-move', 'text-white'])
    );
  });
});
