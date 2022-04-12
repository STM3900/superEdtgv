<template>
  <aside
    v-click-outside="externalClick"
    :class="`aside-${getTheme} ${
      getViewStatusCalendar && getPerson.firstname && getPerson.lastname
        ? ''
        : 'hidden'
    }`"
  >
    <p :class="`p-${getTheme}`">
      Exportez votre emploi du temps vers un service tiers !
    </p>
    <button
      @click="copyUrlCalendar"
      :style="{
        background: getSelectedColor.normal,
        color: getSelectedColor.dark,
        borderColor: getSelectedColor.normal,
      }"
    >
      Copier l'url d'intégration
      <section
        :style="{
          borderColor: getSelectedColor.normal,
          background: getSelectedColor.normal,
        }"
        :class="`overlay ${overlayStatus ? '' : 'overlay-hidden'}`"
      >
        <span> Copié !</span>
      </section>
    </button>
    <br />
    <button
      @click="downloadCalendar"
      :style="{
        color:
          getTheme == 'light' ? getSelectedColor.dark : getSelectedColor.normal,
        borderColor: getSelectedColor.normal,
      }"
    >
      Télécharger au format ics
    </button>
    <p :class="`p-${getTheme} smol-text`">
      Cette fonctionnalité est encore en test
    </p>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vClickOutside from "v-click-outside";

export default {
  name: "ExportCalendar",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    ...mapGetters([
      "getViewStatusCalendar",
      "getTheme",
      "getSelectedColor",
      "getPerson",
    ]),
  },
  data() {
    return {
      overlayStatus: false,
    };
  },
  methods: {
    ...mapActions(["changeViewStatusCalendar"]),
    formatName(person) {
      return {
        firstname: this.formatString(person.firstname),
        lastname: this.formatString(person.lastname),
        date: person.date,
      };
    },
    formatString(string) {
      return string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
    downloadCalendar() {
      const goodPerson = this.formatName(this.getPerson);
      document.location.href = `https://api-calendar.calendz.app/v1/month?firstname=${goodPerson.firstname}&lastname=${goodPerson.lastname}&format=icalendar`;
    },
    copyUrlCalendar() {
      const goodPerson = this.formatName(this.getPerson);
      navigator.clipboard.writeText(
        `https://api-calendar.calendz.app/v1/month?firstname=${goodPerson.firstname}&lastname=${goodPerson.lastname}&format=icalendar`
      );
      this.overlayStatus = true;
      setTimeout(() => {
        this.overlayStatus = false;
      }, 700);
    },
    externalClick(event) {
      this.changeViewStatusCalendar(false);
    },
  },
};
</script>

<style scoped>
aside {
  z-index: 1000;
  position: absolute;
  top: 8%;
  right: 0;

  width: 250px;

  margin-right: 10px;
  padding: 20px;

  border: solid 1px;
  border-radius: 5px;

  color: white;
  transition: 0.3s;

  text-align: right;
}

.hidden {
  right: -300px;
}

.aside-light {
  border-color: #e1e1e1;
  background: white;
}

.aside-dark {
  border-color: rgb(50, 50, 50);
  background: #191919;
}

button {
  font-family: "Quicksand", sans-serif;
  position: relative;

  background: none;
  transition: 0.3s;
  padding: 8px 15px;

  border-radius: 5px;
  border: none;
  border: solid 1px;

  margin-bottom: 10px;
  transition: 0.3s;
}

button {
  opacity: 1;
}

button:not(:active):hover {
  cursor: pointer;
  transform: scale(0.99);
}

button:active {
  transform: scale(0.93);
}

.smol-text {
  font-size: 10px;
  font-style: italic;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;

  top: -1px;
  left: -1px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;

  border-radius: 5px;
  border: solid 1px;

  transition: 0.3s;
}

.overlay-hidden {
  opacity: 0;
}

.overlay span {
  margin: 0;
  padding: 0;
  margin-top: -1px;
}

@media screen and (max-width: 400px) {
  aside p {
    font-size: 12px;
  }

  button {
    font-size: 12px;
  }

  .smol-text {
    font-size: 8px;
  }
}
</style>
