<template>
  <div>
    <fa
      @click="toggleCurrentTheme()"
      :class="`icon-theme ${getTheme} ${status ? 'show' : 'hide'}`"
      :icon="icon"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ThemeSwitcher",
  data() {
    return {
      icon: "sun",
      status: true,
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  mounted() {
    if (localStorage.getItem("theme")) {
      this.icon = localStorage.getItem("theme") == "light" ? "sun" : "moon";
      console.log(localStorage.getItem("theme"));
    }
  },
  methods: {
    ...mapActions(["changeTheme"]),
    toggleCurrentTheme() {
      const theme = this.getTheme == "light" ? "dark" : "light";
      this.changeTheme(theme);
      localStorage.setItem("theme", theme);

      this.status = false;
      setTimeout(() => {
        this.icon = this.getTheme == "light" ? "sun" : "moon";
        setTimeout(() => {
          this.status = true;
        }, 150);
      }, 150);
    },
  },
};
</script>

<style scoped>
.icon-theme {
  transition: 0.3s;
}

.icon-theme:hover {
  cursor: pointer;
  transform: rotate(-5deg);
}

.light {
  color: rgb(150, 150, 150);
  transition: 0.3s;
}

.dark {
  color: white;
  transition: 0.3s;
}

.show {
  opacity: 1;
  animation: fadeIn 0.15s ease;
  transition: 0.3s;
}

.hide {
  opacity: 0;
  animation: fadeOut 0.15s ease;
  transition: 0.3s;
}

@keyframes fadeIn {
  0% {
    transform: translateY(-3px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-3px);
    opacity: 0;
  }
}
</style>
