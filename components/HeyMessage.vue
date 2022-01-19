<template>
  <div>
    <h1>
      {{ greetingsBefore }}
      <span
        :style="{ color: color }"
        @click="
          changeTogglePanel(!getTogglePanel);
          savePanel();
        "
      >
        {{ name }}</span
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

    this.changeTogglePanel(JSON.parse(localStorage.getItem("toggle")));
  },
  computed: {
    ...mapGetters(["getTogglePanel"]),
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
