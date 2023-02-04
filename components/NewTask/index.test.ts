import { shallowMount } from '@vue/test-utils';
import { expect, it, describe } from 'vitest';
import type { Task } from '~~/types';
import NewTask from './index.vue';

describe('TheComponent', () => {
  const wrapper = shallowMount(NewTask);
  const titleInput = wrapper.find('textarea');

  it('emits add event with task payload on enter keypress', async () => {
    titleInput.setValue('Test task');
    titleInput.trigger('keyup.enter');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().add).toBeTruthy();
    expect(wrapper.emitted().add[0]).toEqual([
      {
        id: expect.any(String),
        title: 'Test task',
        createdAt: expect.any(Date),
      } as Task,
    ]);
  });

  it('clears the title value after task is added', async () => {
    titleInput.setValue('Test task');
    titleInput.trigger('keyup.enter');

    await wrapper.vm.$nextTick();

    expect(titleInput.element.value).toBe('');
  });
});
