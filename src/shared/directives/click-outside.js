export const vClickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = (event) => {
            if (!el.contains(event.target)) {
                binding.value();
            }
        };

        document.addEventListener('click', el.clickOutsideEvent, { capture: true });
    },

    unmounted: (el) => document.removeEventListener('click', el.clickOutsideEvent, { capture: true }),
};
