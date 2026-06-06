import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import TaskList from '@domains/dashboard/views/components/TaskList.vue';

// Dummy component test — renders a component and asserts on its output. Safe to delete.
describe('TaskList', () => {
    it('Dummy test (TaskList): it will pass 99.99%', () => {
        const wrapper = mount(TaskList);

        expect(wrapper.text()).toContain('Task List');
        expect(wrapper.findAll('li')).toHaveLength(8);
    });
});
