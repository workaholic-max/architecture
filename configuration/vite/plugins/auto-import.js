import AutoImport from 'unplugin-auto-import/vite';

export const autoImportPlugin = () =>
    AutoImport({
        imports: [
            {
                vue: [
                    'ref',
                    'reactive',
                    'computed',
                    'watch',
                    'nextTick',
                    'useTemplateRef',
                    'onBeforeMount',
                    'onMounted',
                    'onBeforeUnmount',
                    'onUnmounted',
                ],
                'vue-router': ['useRouter', 'useRoute'],
            },
        ],
        include: [/\.js$/, /\.ts$/, /\.vue$/, /\.vue\?vue/],
        dts: 'dts/auto-imports.d.ts',
    });
