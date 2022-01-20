<template>
  <section>
    <h3>Pas de cours !</h3>
    <p>(Ou alors mauvaise saisie)</p>
  </section>
</template>

<script>
export default {
  name: "EdtError",
  data() {
    return {};
  },
};
</script>

<style scoped>
section {
  position: absolute;

  width: calc(100% - 45px);
  margin-left: 45px;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  z-index: 2;
  transition: 0.3s;
}

section h3 {
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  margin: 0;
  color: rgb(50, 50, 50);
}

section p {
  font-family: "Quicksand", sans-serif;
  color: rgb(150, 150, 150);
  font-size: 14px;
  margin-top: 3px;
  font-style: italic;
}
</style>
