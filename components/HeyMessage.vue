<template>
  <div>
    <h1>
      {{ greetingsBefore }}
      <span :style="{ color: color }"> {{ name }}</span
      >,
      {{ greetingsAfter }}
    </h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HeyMessage",
  props: {
    name: String,
    color: String,
  },
  data() {
    return {
      greetingsBefore: "",
      greetingsAfter: "",
      greetingsListBefore: [
        "Bonjour",
        "Belle journée",
        "Ah tiens, c'est",
        "Salut",
        "Bien le bonjour",
        "Wsh",
        "Ciao",
        "Heyah",
      ],
      greetingsListAfter: [
        "il fait beau non ?",
        "ça va bien ?",
        "prêt pour les cours ?",
        "bien ou bien ?",
        "cv ?",
        "ça fait quoi la",
      ],
    };
  },
  mounted() {
    this.greetingsBefore = this.getRandom(this.greetingsListBefore);
    this.greetingsAfter = this.getRandom(this.greetingsListAfter);
  },
  computed: {
    ...mapGetters(["getSelectedColor"]),
  },
  methods: {
    ...mapActions(["changeSelectedColor"]),
    getRandom(tab) {
      return tab[Math.floor(Math.random() * tab.length)];
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Quicksand", sans-serif;
  font-size: 30px;
}
span {
  text-transform: capitalize;
}
</style>
