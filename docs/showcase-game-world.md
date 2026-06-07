# Game World Showcase

This document defines the showcase application for this Vue architecture template.

The showcase is a fictional MMO-style world management application. It is not a game engine, and it is not connected to
any real external game API. Its purpose is to demonstrate how the architecture behaves under realistic product pressure:
many domains, related entities, route metadata, permissions, mock API resources, stores, forms, local persistence,
history, notifications, mobile flows, and PWA-ready behavior.

The showcase should be implemented after the base PWA direction is stable, but the concept itself must not depend on a
specific PWA library or styling variant.

## Product Idea

The user manages a small fictional game world.

The world contains characters, locations, NPCs, quests, items, inventories, dungeons, raids, bosses, factions, and
achievements. The user can create and edit entities, accept quests, complete objectives, receive rewards, equip items,
increase character stats, and inspect history for meaningful changes.

The application should feel like an admin/companion tool for a game world, not like an actual playable combat game.

Core loop:

```text
Create or select character
-> browse locations and NPCs
-> accept quests
-> complete objectives or dungeon steps
-> claim rewards
-> update inventory, stats, factions, and achievements
-> inspect dashboard and history
```

## Goals

- Demonstrate many user-facing domains without turning the template into a backend-heavy product.
- Keep data deterministic, local, and easy to inspect.
- Show realistic CRUD and workflow behavior across related entities.
- Show route-level metadata for titles, permissions, and navigation.
- Show Pinia stores where application state is meaningful.
- Show API modules even though the backend is simulated.
- Show reusable features that are not owned by a single domain.
- Show mobile-first, PWA-compatible flows.
- Keep the showcase removable from the clean base architecture.

## Non-Goals

- Do not integrate with a real game API.
- Do not implement real combat simulation.
- Do not require authentication against an external service.
- Do not require a backend, database server, or network connection.
- Do not make the UI look like a marketing website.
- Do not make every entity perfectly realistic. The data only needs to be coherent enough to demonstrate architecture.

## Data Strategy

The showcase should use local mock data with a simulated API.

Initial data should be shipped with the application as static TypeScript or JSON seed data. On first launch, the app
copies that seed into local storage. After that, local storage is the source of truth until the user resets the world.

The user is allowed to delete or mutate seeded data. A refresh must preserve the user's current world state. A reset
action should explicitly restore the original seed.

Recommended storage shape:

```text
architecture:showcase:world:v1
```

The value should be one versioned object containing the normalized showcase state:

```ts
type ShowcaseWorldState = {
    schemaVersion: 1;
    seededAt: string;
    updatedAt: string;
    characters: Character[];
    locations: Location[];
    npcs: Npc[];
    quests: Quest[];
    items: Item[];
    inventories: Inventory[];
    dungeons: Dungeon[];
    raids: Raid[];
    bosses: Boss[];
    factions: Faction[];
    achievements: Achievement[];
    historyEvents: HistoryEvent[];
};
```

Avoid one local storage key per API URL. That would make reset, migrations, search, relationship updates, and history
harder to reason about. A single versioned world key keeps the mock backend closer to a small local database.

Small UI preferences may use separate keys when they are not part of the world itself:

```text
architecture:showcase:preferences:v1
architecture:showcase:selected-character:v1
```

## Mock API Strategy

The app should still behave as if it has an API.

Domain API modules should expose resource operations such as `getAll`, `getById`, `create`, `update`, `delete`, and
domain-specific actions. Internally, those operations should call a mock API adapter that reads and writes the local
world state.

Expected behavior:

- Every request returns a Promise.
- Requests may include a small artificial delay so loading states are visible.
- Read requests clone data before returning it.
- Write requests update local storage and return updated data.
- Delete requests remove the entity and update relationships where appropriate.
- Mutations create history events.
- Abortable requests should still be supported where the existing API architecture expects them.
- Errors should be simulated for missing entities, invalid state transitions, or permission failures.

Example resource behavior:

```text
GET /characters
GET /characters/:characterId
POST /characters
PATCH /characters/:characterId
DELETE /characters/:characterId

POST /characters/:characterId/quests/:questId/accept
POST /characters/:characterId/quests/:questId/objectives/:objectiveId/complete
POST /characters/:characterId/quests/:questId/claim

POST /characters/:characterId/inventory/:itemId/equip
POST /dungeons/:dungeonId/runs
POST /dungeons/:dungeonId/bosses/:bossId/defeat
```

The API does not need to use real HTTP. The important part is preserving the architectural surface: domains call APIs,
APIs talk to a client/adapter, and views do not read seed data directly.

## Main Domains

### Dashboard

The dashboard is the user's home screen.

It should summarize the selected character and the world state:

- current character level and primary stats
- active quests
- recently completed objectives
- inventory highlights
- dungeon or raid readiness
- achievement progress
- recent history events
- quick links into major domains

The dashboard should demonstrate derived data, simple charts or progress visuals, and cross-domain aggregation.

### Characters

Characters are the main user-controlled entities.

The user should be able to:

- create a character
- edit character identity and basic properties
- select the active character
- inspect stats, level, class, faction reputation, equipment, inventory, quests, and achievements
- delete a character with confirmation

Character changes should affect history. Level changes, stat changes, equipment changes, quest rewards, and achievement
unlocks should be visible in the character history.

### Items

Items represent equipment, consumables, crafting materials, quest items, and boss drops.

The user should be able to:

- browse and filter items by type, rarity, level, and source
- create/edit/delete items
- inspect where an item comes from
- inspect which quests, bosses, vendors, or recipes reference the item
- add an item to a character inventory

Items should support simple metadata:

- name
- type
- rarity
- item level
- equipment slot when relevant
- stat modifiers when relevant
- source references
- icon name

### Inventory

Inventory belongs to a character.

The user should be able to:

- view character-owned items
- equip and unequip equipment
- consume or remove items
- inspect item history for when it was received, equipped, renamed, or removed

Inventory is a good place to demonstrate domain actions rather than only CRUD.

### Quests

Quests are workflow entities.

The user should be able to:

- browse available, active, completed, and locked quests
- create/edit/delete quest definitions
- accept a quest for the selected character
- complete objectives manually
- claim rewards
- inspect related NPC, location, faction, required items, dungeon steps, rewards, and achievement progress

Quest states should be character-specific:

```text
available
accepted
ready-to-claim
completed
locked
```

Rewards may include:

- character experience
- gold or currency
- items
- faction reputation
- achievement progress
- stat increases

### Locations

Locations represent zones, cities, caves, dungeons, raid areas, or regions.

The user should be able to:

- browse locations
- create/edit/delete locations
- inspect NPCs in a location
- inspect quests available in a location
- inspect dungeons or raids connected to a location
- inspect location history

Locations help demonstrate relationship panels and nested navigation.

### NPCs

NPCs are world entities that may give quests, sell items, belong to factions, or appear in locations.

The user should be able to:

- browse NPCs
- create/edit/delete NPCs
- assign an NPC to a location
- connect an NPC to quests
- connect an NPC to a faction
- inspect related items, quests, and history

NPCs should show cross-domain references without needing complex simulation.

### Dungeons

Dungeons are structured activities with bosses and rewards.

The user should be able to:

- browse dungeons
- create/edit/delete dungeons
- inspect recommended level, location, bosses, rewards, and requirements
- start a mock run for the selected character
- mark bosses defeated
- complete the dungeon

Dungeon completion can update quests, achievements, history, and possible item rewards.

### Raids

Raids are larger activities than dungeons.

The user should be able to:

- browse raids
- create/edit/delete raids
- inspect bosses, requirements, rewards, and completion state
- track raid readiness for the selected character

Raids may reuse concepts from dungeons but should remain a separate domain if it helps demonstrate architecture at
scale. If implementation scope becomes too large, raids can be a later milestone.

### Bosses

Bosses can belong to dungeons or raids.

The user should be able to:

- browse bosses
- create/edit/delete bosses
- inspect stats, abilities, location, dungeon/raid ownership, drops, and history
- rename or change boss metadata and see those changes in history

Bosses are useful for demonstrating entity ownership and references from multiple activity types.

### Factions

Factions represent reputation groups.

The user should be able to:

- browse factions
- create/edit/delete factions
- inspect related NPCs, locations, quests, rewards, and character reputation
- gain or lose reputation through quest rewards

Faction reputation is character-specific and should be visible from both character detail and faction detail.

### Achievements

Achievements track progress and unlocks.

The user should be able to:

- browse achievements
- create/edit/delete achievements
- inspect requirements and rewards
- see character-specific progress
- unlock achievements through quests, dungeon completions, item collection, or manual progress updates

Achievements are useful for demonstrating derived state and cross-domain workflow results.

### Profile And Settings

Profile and settings remain simple but useful.

They should show:

- selected account profile
- display preferences
- world reset action
- mock permission role selection
- local storage/debug information for the showcase state

Settings should include a clear reset action that restores seed data after confirmation.

## Reusable Features

### History Feature

History should be implemented as a feature, not as a domain.

It should not own a top-level route. It should provide generic building blocks that any domain can use.

Expected responsibilities:

- fetch history for an entity
- create history entries for mutations
- display a compact history button
- display a history drawer or modal
- display before/after differences
- format field names and values
- group events by date or action
- support entity-specific labels without importing domains

Possible public API:

```text
features/history/api.ts
features/history/composables/useEntityHistory.ts
features/history/components/HistoryButton.vue
features/history/components/HistoryDrawer.vue
features/history/components/HistoryTimeline.vue
features/history/utils/diff.ts
features/history/types/history.ts
```

History events should be generic:

```ts
type HistoryEvent = {
    id: string;
    entityType: string;
    entityId: string;
    action: 'created' | 'updated' | 'deleted' | 'accepted' | 'completed' | 'rewarded' | 'equipped' | 'reset';
    actorId: string | null;
    occurredAt: string;
    summary: string;
    before?: unknown;
    after?: unknown;
    metadata?: Record<string, unknown>;
};
```

Every meaningful domain detail page should expose history:

- character history
- item history
- quest history
- location history
- NPC history
- dungeon history
- raid history
- boss history
- faction history
- achievement history

History should be useful but not noisy. It should record meaningful changes, not every local UI interaction.

### Notifications Feature

The app should have in-app notifications for successful and failed actions.

Examples:

- quest accepted
- objective completed
- reward claimed
- item equipped
- achievement unlocked
- entity created, updated, or deleted
- world reset
- mock API error

Notifications should be reusable and not tied to a single domain.

### Search And Filters

Lists should support useful search and filters where the domain benefits from them.

Search/filter state may remain local to each page unless there is a clear reason to persist it.

Examples:

- item rarity/type
- quest state/location
- NPC faction/location
- dungeon level range
- achievement locked/unlocked

### Confirmation

Destructive or major actions should use confirmation.

Examples:

- delete entity
- reset world
- abandon quest
- consume item
- overwrite generated seed state

The existing confirmation modal pattern should be reused or extended.

## UX Requirements

The showcase should feel like a compact operational application.

Expected experience:

- The first screen should be the dashboard, not a landing page.
- The selected character should be visible in the main app shell.
- Navigation should make major domains discoverable.
- Mobile navigation should be ergonomic, likely with a bottom navigation or compact menu.
- Lists should prefer card/list hybrids over dense desktop-only tables.
- Detail pages should show relationship panels.
- Entity actions should be close to the relevant entity context.
- Loading, empty, error, and success states should exist.
- Small icons may be used for entity types, rarity, status, and actions.
- Large image assets are not required.
- Transitions should help route and panel changes feel smooth but should not hide application state.
- The app should remain usable on mobile.

Good repeated page shape:

```text
Header with title, status, and main action
Summary block
Search/filter controls when useful
List or relationship panels
Primary workflow actions
History access
```

## Routing Requirements

Routes should demonstrate:

- domain-owned route files
- lazy-loaded views
- nested routes where meaningful
- route metadata for title and permissions
- route guards
- fallback pages

Possible route groups:

```text
/dashboard
/characters
/characters/create
/characters/:characterId
/characters/:characterId/edit
/quests
/quests/create
/quests/:questId
/items
/items/create
/items/:itemId
/locations
/locations/:locationId
/npcs
/npcs/:npcId
/dungeons
/dungeons/:dungeonId
/raids
/raids/:raidId
/bosses
/bosses/:bossId
/factions
/factions/:factionId
/achievements
/achievements/:achievementId
/profile
/settings
```

Not every route must be implemented in the first milestone.

## Permissions

The showcase should include mock permissions so route metadata and guards remain meaningful.

Example roles:

```text
viewer
adventurer
world-editor
admin
```

Examples:

- viewer can browse public world data
- adventurer can accept quests and manage selected character progress
- world-editor can create/edit world entities
- admin can reset world state and change mock roles

Permissions should be simple but visible enough to demonstrate the route guard architecture.

## Stores

Stores should be used for state that is reused across views or represents active application state.

Expected stores:

- account/profile store
- selected character store
- world state or world metadata store
- notifications store if not service-only
- quest progress store if character-specific state is reused broadly
- inventory/equipment store if needed across pages
- device/preferences store where useful

Not every API result needs a store. Some domain list/detail pages can fetch directly through composables and APIs.

## Initial Seed Data

Seed data should be small but connected.

Suggested starting size:

- 3 to 5 characters
- 6 to 10 locations
- 12 to 20 NPCs
- 20 to 40 items
- 12 to 20 quests
- 4 to 6 dungeons
- 1 to 3 raids
- 12 to 20 bosses
- 5 to 8 factions
- 15 to 30 achievements

The data should be intentionally connected:

- every quest should reference at least one location or NPC
- every dungeon should reference a location and bosses
- every boss should reference drops
- every faction should reference related NPCs or quests
- achievements should reference progress from quests, dungeons, items, or factions

## PWA Relationship

The showcase should benefit from PWA behavior but should not own PWA infrastructure.

Once PWA support exists, this showcase should demonstrate:

- installable app shell
- offline usability with local data
- app update flow
- offline fallback page if needed
- persistent local world state
- reset/reseed behavior

Because the showcase uses local storage and a mock API, it is naturally compatible with offline-first behavior.

## Implementation Milestones

### Milestone 1: Showcase Foundation

- Add mock API storage adapter.
- Add seed data initialization and reset behavior.
- Add dashboard shell and selected character concept.
- Add notifications and confirmation reuse.
- Add initial permissions.

### Milestone 2: Core Loop

- Characters.
- Locations.
- NPCs.
- Quests.
- Items.
- Inventory.
- Accept quest, complete objective, claim reward.
- Record history for these actions.

### Milestone 3: Activities

- Dungeons.
- Bosses.
- Dungeon runs.
- Boss defeat actions.
- Quest and achievement progress from dungeon completion.

### Milestone 4: World Depth

- Factions.
- Achievements.
- Raids.
- Richer relationship panels.
- Dashboard summaries and charts.

### Milestone 5: Polish And Template Value

- Mobile navigation and responsive layouts.
- Route transitions and panel transitions.
- Empty/error/loading states.
- Focused tests for stores, permissions, history utilities, mock API behavior, and important components.
- Documentation links from the README.

## Architectural Boundaries

The showcase must preserve the template architecture.

- Domains own user-facing product areas.
- Features own reusable concerns such as history or notifications.
- Shared remains for genuinely reusable components, services, controls, configs, types, and layouts.
- API remains the visible surface for backend-like interaction, even when the backend is simulated.
- Views should not import seed data directly.
- Route metadata remains the source of truth for page titles and permissions.
- Tests stay colocated with the layer or module they verify.

The showcase should make the architecture easier to understand. If a feature only adds visual noise and does not
demonstrate an architectural pattern, it should be deferred.
