<template>
  <fa
    @click="viewStatus = !viewStatus"
    :class="`icon-theme calendar ${getTheme} ${status ? 'show' : 'hide'}`"
    :icon="['fas', 'calendar']"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ExportCalendar",
  data() {
    return {
      viewStatus: false,
    };
  },
  props: {
    status: Boolean,
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
