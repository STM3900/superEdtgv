<template>
  <main :class="`main-${getTheme}`">
    <Overlay />
    <Header class="edt-case-animation" />
    <HeyMessage
      class="edt-case-animation"
      :style="{ animationDelay: '0.3s' }"
    />
    <PersonForm />
    <TeamsDetector />
    <div class="export-calendar">
      <ExportCalendar />
    </div>

    <article class="edt-container">
      <EdtReady v-if="getStatus == 'ready'" class="edt-case-animation" />
      <LoadingMessage v-if="getStatus == 'loading'" />
      <EdtLoading v-show="getStatus == 'loading'" class="edt-case-animation" />
      <EdtError v-if="getStatus == 'error'" class="edt-case-animation" />
      <EdtTable :formYear="formYear" />
    </article>
    <Footer class="edt-case-animation" />
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "IndexPage",
  computed: {
    ...mapGetters(["getStatus", "getTheme", "getViewStatusCalendar", "getCurrentYear"]),
  },
  methods: {
    ...mapActions(["changeCurrentYear"]),
  },
  mounted() {
    this.changeCurrentYear("2023");
    this.formYear = this.getCurrentYear;
  },
  data() {
    return {
      person: {
        firstname: "",
        lastname: "",
        date: "",
      },
      formDate: "",
      formYear: "",
    };
  },
};
</script>

<style scoped>
/* edt */
.edt-container {
  width: 100%;
  overflow: hidden;

  margin-top: 25px;
  position: relative;
}

.edt-case-animation {
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  0% {
    transform: translateX(-5px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@media screen and (max-width: 1265px) {
  .edt-container {
    overflow: auto;
  }

  .edt-container::-webkit-scrollbar {
    display: none;
  }
}
</style>
