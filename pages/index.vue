<template>
  <div>
    <Header class="edt-case-animation" />
    <HeyMessage
      class="edt-case-animation"
      :style="{ animationDelay: '0.3s' }"
    />
    <PersonForm />

    <article class="edt-container">
      <EdtReady v-if="getStatus == 'ready'" class="edt-case-animation" />
      <EdtLoading v-show="getStatus == 'loading'" class="edt-case-animation" />
      <EdtError v-if="getStatus == 'error'" class="edt-case-animation" />
      <EdtTable :formYear="formYear" />
    </article>
    <Footer class="edt-case-animation" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ColorChanger from "~/components/ColorChanger.vue";
import PersonForm from "~/components/PersonForm.vue";

export default {
  name: "IndexPage",
  computed: {
    ...mapGetters(["getStatus"]),
  },
  data() {
    return {
      person: {
        firstname: "",
        lastname: "",
        date: "",
      },
      formDate: "",
      formYear: "2022",
    };
  },
};
</script>

<style scoped>
body {
  font-family: "Quicksand", sans-serif;
}

/* edt */
.edt-container {
  max-width: 1500px;
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
</style>
