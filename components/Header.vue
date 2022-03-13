<template>
  <header :class="`header-${getTheme}`">
    <h1 :class="`h1-${getTheme}`">
      Super ED<span :style="{ color: getSelectedColor.normal }"
        >TGV <fa class="icon-logo" icon="stream"
      /></span>
    </h1>
    <ThemeSwitcher />
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["getSelectedColor", "getTheme"]),
  },
  mounted() {
    this.changeTheme(localStorage.getItem("theme") ?? "light");
  },
  methods: {
    ...mapActions(["changeTheme"]),
  },
};
</script>

<style scoped>
header {
  margin-bottom: 25px;
  border-bottom: solid 1px;
  transition: 0.3s;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  transition: 0.3s;
}

.header-light {
  border-color: #e1e1e1;
}

.header-dark {
  border-color: rgb(50, 50, 50);
}

header h1 {
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
  font-weight: 500;
  margin-top: 0;
  padding-top: 12px;
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
