<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="[item.icon, 'text-color']"/>
          <span class="text-primary font-semibold">
            {{ item.label }}
          </span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span class="text-surface-700 dark:text-surface-0">
          {{ item.label }}
        </span>
      </a>
    </template>
  </Breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import Enums from "@/enums/enums.js";
import { isNullOrEmpty } from "@/utility/scripts/helper.js";

const route = useRoute();
const mainPagePAth = route.matched.find(x => x.name = Enums.RouteNames.MainPage)?.path
const home = ref({
  icon: 'pi pi-home',
  route: isNullOrEmpty(mainPagePAth) ? "/" : mainPagePAth
});


const items = computed(() => {
  return route.matched
      .map((item) => {
        return {
          label: item?.meta?.title,
          route: item.path,
        };
      }).filter((item) => item.label !== undefined)
})
</script>


<style scoped lang="scss">

</style>
