import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TaskItem from './index.vue';
import type { Task } from '~~/types';
import { nanoid } from 'nanoid';
import DragHandle from '../DragHandle/index.vue';

describe('Task', () => {
  const task: Task = {
    title: 'Test task',
    createdAt: new Date(),
    id: nanoid(),
  };
  const wrapper = mount(TaskItem, {
    propsData: { task },
    components: {
      DragHandle,
    },
  });

  it('renders the task title', () => {
    expect(wrapper.find('[datatest-id="task-title"]').text()).toBe(task.title);
  });

  it('renders the created at date in the title', () => {
    expect(wrapper.attributes().title).toBe(
      task.createdAt.toLocaleDateString()
    );
  });
});
