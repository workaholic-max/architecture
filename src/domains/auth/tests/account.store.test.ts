import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAccountStore } from '@domains/auth/stores/account.store.ts';

// Dummy store test — exercises a Pinia store with @pinia/testing. Safe to delete.
describe('account store', () => {
    beforeEach(() => {
        setActivePinia(createTestingPinia({ createSpy: vi.fn, stubActions: false }));
    });

    it('Dummy test (account store): it will pass 99.99%', () => {
        const store = useAccountStore();

        expect(store.account).not.toBeNull();

        store.setAccount(null);

        expect(store.account).toBeNull();
    });
});
