import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Header from './index.vue';

describe('Header', () => {
  it('should render header component', () => {
    const wrapper = mount(Header);
    expect(wrapper.find('[datatest-id="header"]').text()).toBe(
      'Trello - Nuxt 3'
    );
    expect(wrapper).toMatchSnapshot();
  });
});
