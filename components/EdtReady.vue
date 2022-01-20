<template>
  <section class="edt-case">
    <div
      v-for="(cours, i) in generateAllCours(getEdtData.week)"
      :key="i"
      :style="{ animationDelay: `${0.1 * i}s` }"
    >
      <div
        v-for="(tab, i) in cours"
        :key="i"
        :class="tab.type == 'cours' ? 'cours' : 'filler'"
        :style="{
          height: `calc(100% / 12 * ${tab.coursLength})`,
        }"
      >
        <div
          v-if="tab.type == 'cours'"
          :style="{ background: getSelectedColor.normal }"
        >
          <div :style="{ color: getSelectedColor.dark }">
            <section class="edt-time">{{ tab.start }} - {{ tab.end }}</section>
            <section class="edt-subject">
              {{ tab.subject }}
            </section>
            <section class="edt-prof">
              <span>
                {{ tab.professor }}
              </span>
              <a
                v-if="tab.link"
                :href="tab.link"
                target="_blank"
                :style="{ color: getSelectedColor.dark }"
              >
                <fa class="icon-link" icon="link" />
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EdtReady",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getEdtData", "getSelectedColor"]),
  },
  methods: {
    generateAllCours(tab) {
      tab = Object.entries(tab);

      let finalTab = [];
      for (let i = 0; i < tab.length; i++) {
        finalTab.push(this.generateTab(tab[i][1]));
      }

      return finalTab;
    },
    convertTimeToInt(time) {
      return +time.substring(0, 2);
    },
    generateTab(tab) {
      const tabFunc = tab.slice();
      const finalTab = [];
      let previousCours;
      let hoursRemaining = 12;

      tabFunc.sort((a, b) => a.start.substring(0, 2) - b.start.substring(0, 2));

      for (let i = 0; i < tabFunc.length; i++) {
        let tabObj = {};
        if (i == 0 && this.convertTimeToInt(tabFunc[i].start) != 8) {
          const timeBeforeCours = this.convertTimeToInt(tabFunc[i].start) - 8;

          finalTab.push({ type: "filler", coursLength: timeBeforeCours });
          hoursRemaining -= timeBeforeCours;
        } else if (previousCours) {
          const timeBetweenCours =
            this.convertTimeToInt(tabFunc[i].start) -
            this.convertTimeToInt(previousCours.end);
          if (timeBetweenCours > 0) {
            finalTab.push({ type: "filler", coursLength: timeBetweenCours });
            hoursRemaining -= timeBetweenCours;
          }
        }

        tabObj.type = "cours";
        tabObj.coursLength = this.getCoursLength(tabFunc[i]);
        tabObj.subject = tabFunc[i].subject;
        tabObj.professor = this.truncateProfTag(tabFunc[i].professor);
        tabObj.start = tabFunc[i].start;
        tabObj.end = tabFunc[i].end;
        tabObj.link = tabFunc[i].link;

        finalTab.push(tabObj);
        hoursRemaining -= tabObj.coursLength;
        previousCours = tabFunc[i];
      }

      if (hoursRemaining) {
        finalTab.push({ type: "filler", coursLength: hoursRemaining });
      }

      return finalTab;
    },
    getCoursLength(cours) {
      return (
        this.convertTimeToInt(cours.end) - this.convertTimeToInt(cours.start)
      );
    },
    truncateProfTag(str) {
      return str.replace(/ *\<[^)]*\> */g, "");
    },
  },
};
</script>

<style scoped>
.edt-time {
  font-size: 12px;
  padding: 13px;
  position: absolute;
  top: 0;
}

.edt-subject {
  align-self: center;
  text-align: center;

  padding-left: 13px;
  padding-right: 13px;
}

.edt-prof {
  font-size: 12px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 13px;

  position: absolute;
  bottom: 0;
}

.edt-prof a {
  transition: 0.3s;
  margin-right: 30px;
}
</style>
