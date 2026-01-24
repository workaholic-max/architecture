<template>
    <div class="ml-task-list">
        <h2>Task List</h2>

        <ul>
            <li
                v-for="taskNumber in 8"
                :key="`task: ${taskNumber}`"
            >
                {{ `Task ${taskNumber - 1}` }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@use '@style-vars' as vars;
@use '@style-fns' as fns;

.ml-task-list {
    width: 100%;

    > h2 {
        margin-bottom: vars.$space-base;
    }

    > ul {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: vars.$space-base;

        > li {
            flex: 1 1 fns.flex-basis(2, vars.$space-base);
        }
    }
}
</style>
