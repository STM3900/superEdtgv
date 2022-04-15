<template>
  <div
    :class="` ${
      getViewStatusCalendar && getPerson.firstname && getPerson.lastname
        ? ''
        : 'hidden'
    } overlay`"
  ></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Overlay",
  computed: {
    ...mapGetters([
      "getSelectedColor",
      "getTheme",
      "getViewStatusCalendar",
      "getPerson",
    ]),
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  margin-left: -5%;
  background: black;
  opacity: 0.1;
  transition: 0.3s;
}

.hidden {
  opacity: 0;
  z-index: -100;
}

@media screen and (max-width: 1780px) {
  .overlay {
    padding-left: 5%;
  }
}

@media screen and (max-width: 1320px) {
  .overlay {
    padding-left: 3%;
  }
}
</style>
