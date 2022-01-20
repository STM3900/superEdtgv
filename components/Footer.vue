<template>
  <footer>
    <p>
      Fait avec amour par
      <a href="https://theomigeat.com/" target="_blank" class="theo">Théo</a> -
      API par
      <a
        href="https://arthurdufour.com/"
        target="_blank"
        :style="{ color: getSelectedColor.normal }"
        >Arthur Dufour</a
      >
    </p>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters(["getSelectedColor"]),
  },
};
</script>

<style scoped>
footer {
  margin-top: 50px;
  font-family: "Quicksand", sans-serif;
  color: rgb(50, 50, 50);
  font-size: 14px;
  transition: 0.3s;
  margin-bottom: 25px;
}

footer a {
  color: rgb(82, 153, 211);
}

.theo:hover {
  animation: rainbow 1.5s linear infinite;
}

@keyframes rainbow {
  0% {
    color: rgb(82, 153, 211);
  }
  12% {
    color: #8f7de8;
  }
  24% {
    color: #e87dc4;
  }
  36% {
    color: #e87d7d;
  }
  48% {
    color: #e8df7d;
  }
  60% {
    color: #a1e87d;
  }
  72% {
    color: #7de8b3;
  }
  84%,
  100% {
    color: rgb(82, 153, 211);
  }
}

@media screen and (max-width: 400px) {
  footer {
    font-size: 12px;
  }
}
</style>
