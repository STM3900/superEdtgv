<template>
  <header>
    <h1>
      Super ED<span :style="{ color: getSelectedColor.normal }"
        >TGV <fa class="icon-logo" icon="stream"
      /></span>
    </h1>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["getSelectedColor"]),
  },
};
</script>

<style scoped>
header {
  margin-bottom: 25px;
  border-bottom: solid 1px #e1e1e1;
  transition: 0.3s;
}

header h1 {
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
}

header h1 span {
  color: hsl(200, 70%, 75%);
}

header h1 span .icon-logo {
  font-size: 10px;
  margin-left: -4px;
  margin-bottom: 3px;
}

@media screen and (max-width: 460px) {
  header h1 {
    font-size: 16px;
  }

  header h1 span .icon-logo {
    margin-left: -4px;
    margin-bottom: 2px;
  }
}

@media screen and (max-width: 400px) {
  header h1 {
    font-size: 14px;
  }

  header h1 span .icon-logo {
    font-size: 8px;
    margin-left: -3px;
    margin-bottom: 2px;
  }
}
</style>
