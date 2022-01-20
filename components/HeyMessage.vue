<template>
  <div>
    <h1>
      {{ greetingsBefore }}
      <span
        :style="{ color: getTextColor }"
        @click="
          changeTogglePanel(!getTogglePanel);
          savePanel();
        "
      >
        {{ getText }}</span
      >,
      {{ greetingsAfter }}
    </h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HeyMessage",
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
        "Coucou",
        "Hola",
        "Hey",
        "Salutations",
        "Salut salut",
        "Yo",
        "Oh, tu es la,",
        "Comme on se retrouve",
      ],
      greetingsListAfter: [
        "il fait beau non ?",
        "ça va bien ?",
        "prêt pour les cours ?",
        "bien ou bien ?",
        "cv ?",
        "ça fait quoi la",
        "belle journée ?",
        "ça va ta journée ?",
        "quoi tu fais ?",
        "ça bosse dur ?",
        "tu t'en sors avec les cours ?",
        "pas trop la galère ?",
        "toujours aussi stylax ?",
        "toujours aussi bg ?",
      ],
    };
  },
  mounted() {
    this.greetingsBefore = this.getRandom(this.greetingsListBefore);
    this.greetingsAfter = this.getRandom(this.greetingsListAfter);

    if (JSON.parse(localStorage.getItem("toggle"))) {
      this.changeTogglePanel(JSON.parse(localStorage.getItem("toggle")));
    }
  },
  computed: {
    ...mapGetters(["getTogglePanel", "getPersonFirstName", "getSelectedColor"]),
    getText() {
      return !this.getPersonFirstName ? "Toi" : this.getPersonFirstName;
    },
    getTextColor() {
      return !this.getPersonFirstName
        ? "rgb(175, 175, 175)"
        : this.getSelectedColor.normal;
    },
  },
  methods: {
    ...mapActions(["changeSelectedColor", "changeTogglePanel"]),
    getRandom(tab) {
      return tab[Math.floor(Math.random() * tab.length)];
    },
    savePanel() {
      localStorage.setItem("toggle", this.getTogglePanel);
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
  text-decoration: underline;
  transition: 0.3s;
}

span:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
