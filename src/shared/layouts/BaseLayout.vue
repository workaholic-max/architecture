<script setup>
import { useRoute } from 'vue-router';

import { useResolvedRoutes } from '@router/composables/useResolvedRoutes.js';

import { MAIN_NAVIGATION_CONFIG } from '@shared/configs/navigation.js';

const route = useRoute();

const { getResolvedMeta } = useResolvedRoutes();
</script>

<template>
    <div class="ml-layout">
        <div class="ml-container">
            <nav>
                <router-link
                    v-for="routeName in MAIN_NAVIGATION_CONFIG"
                    :key="routeName"
                    :to="{ name: routeName }"
                >
                    {{ `${getResolvedMeta(routeName).title}` }}
                </router-link>
            </nav>

            <h1 v-if="route.meta.title">{{ route.meta.title }}</h1>

            <slot>Me too lazy..</slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@style-vars' as vars;
@use '@style-mixins' as mixins;

.ml-layout {
    padding: vars.$space-base 0;
    text-align: center;

    > .ml-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: vars.$space-base;

        > nav {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: vars.$space-base;

            > a {
                color: vars.$color-black;
                padding: vars.$space-sm vars.$space-lg;
                border: 1px solid vars.$color-black;
                border-radius: vars.$border-radius-pill;

                @include mixins.transition(border-color, color);

                &.router-link-exact-active {
                    border-color: transparent;
                    color: vars.$color-primary;
                    text-decoration: underline;
                }

                &:not(.router-link-exact-active) {
                    @include mixins.hover {
                        border-color: vars.$color-primary;
                        color: vars.$color-primary;
                    }
                }
            }
        }

        > h1 {
            width: 100%;
            padding: vars.$space-sm;
            border-top: 1px solid vars.$color-primary;
            border-bottom: 1px solid vars.$color-primary;
            color: vars.$color-primary;
        }
    }
}
</style>
