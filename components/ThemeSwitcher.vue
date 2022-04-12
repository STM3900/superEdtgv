<template>
  <div class="unselectable">
    <fa
      @click="toggleViewCalendar"
      :class="`icon-theme calendar ${getTheme} ${
        statusCalendar ? 'show' : 'hide'
      } ${getPerson.firstname && getPerson.lastname ? '' : 'inactive'}`"
      :icon="['fas', 'calendar']"
    />
    <fa
      @click="toggleCurrentTheme()"
      :class="`icon-theme ${getTheme} ${status ? 'show' : 'hide'}`"
      :icon="icon"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vClickOutside from "v-click-outside";

export default {
  name: "ThemeSwitcher",
  data() {
    return {
      icon: "sun",
      status: true,
      statusCalendar: true,
    };
  },
  computed: {
    ...mapGetters(["getTheme", "getViewStatusCalendar", "getPerson"]),
  },
  mounted() {
    if (localStorage.getItem("theme")) {
      this.icon = localStorage.getItem("theme") == "light" ? "sun" : "moon";
    }
  },
  methods: {
    ...mapActions(["changeTheme", "changeViewStatusCalendar"]),
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

      setTimeout(() => {
        this.statusCalendar = false;
        setTimeout(() => {
          this.statusCalendar = true;
        }, 300);
      }, 50);
    },
    toggleViewCalendar() {
      if (this.getPerson.firstname && this.getPerson.lastname) {
        setTimeout(() => {
          this.changeViewStatusCalendar(!this.getViewStatusCalendar);
        }, 1);
      }
    },
  },
};
</script>

<style scoped>
.icon-theme {
  transition: 0.3s;
  margin-left: 10px;
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

.inactive {
  opacity: 0.5;
  transition: 0.3s;
}

.inactive:hover {
  transition: 0.3s;
  cursor: auto;
  transform: rotate(0deg);
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
