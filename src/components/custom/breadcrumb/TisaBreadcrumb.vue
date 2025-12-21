<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props: breadcrumbProps }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="breadcrumbProps.action" @click="navigate">
          <span v-if="item.icon" :class="[item.icon, 'text-color']"/>
          <span class="text-primary font-semibold">
            {{ item.label }}
          </span>
        </a>
      </router-link>
      <a v-else-if="item.url" :href="item.url" :target="item.target" v-bind="breadcrumbProps.action">
        <span class="text-surface-700 dark:text-surface-0">
          {{ item.label }}
        </span>
      </a>
      <span v-else v-bind="breadcrumbProps.action">
        <span class="text-surface-700 dark:text-surface-0">
          {{ item.label }}
        </span>
      </span>
    </template>
  </Breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import Enums from "@/enums/enums.js";
import { isNullOrEmpty } from "@/utility/scripts/helper.js";

const route = useRoute();

/**
 * Find the main page path from matched routes
 */
const mainPagePath = computed(() => {
  const matched = route.matched.find(x => x.name === Enums.RouteNames.MainPage)
  return matched?.path || "/"
})

/**
 * Home breadcrumb item configuration
 */
const home = computed(() => ({
  icon: 'pi pi-home',
  route: isNullOrEmpty(mainPagePath.value) ? "/" : mainPagePath.value
}))

/**
 * Breadcrumb items generated from current route
 */
const items = computed(() => {
  return route.matched
    .map((item) => {
      // Only include routes with titles
      if (!item?.meta?.title) {
        return null
      }
      
      return {
        label: item.meta.title,
        route: item.path,
        icon: item.meta.icon
      }
    })
    .filter((item) => item !== null && item.label !== undefined)
})
</script>

<style scoped lang="scss">
// Breadcrumb-specific styles can be added here
</style>
