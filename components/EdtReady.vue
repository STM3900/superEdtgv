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
            <section
              class="edt-subject"
              :style="
                tab.coursLength == 2
                  ? 'margin-bottom: 10px;'
                  : tab.coursLength == 1
                  ? 'margin-left: 100px;'
                  : ''
              "
            >
              {{ tab.subject }}
            </section>
            <section class="edt-prof">
              <span>
                {{ tab.professor }}
                <p v-if="tab.coursLength > 1" class="room-small">
                  {{ tab.room }}
                </p>
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
    return {
      referenceTable: {
        lundi: 1,
        mardi: 2,
        mercredi: 3,
        jeudi: 4,
        vendredi: 5,
      },
      referenceNameTab: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"],
    };
  },
  computed: {
    ...mapGetters(["getEdtData", "getSelectedColor"]),
  },
  methods: {
    getreference(ref) {
      return this.referenceTable[ref];
    },
    generateAllCours(tab) {
      tab = Object.entries(tab);
      const orderTab = [];
      const daysTab = [];

      const finalTab = [];

      for (let i = 0; i < tab.length; i++) {
        daysTab.push(tab[i][0]);
      }

      for (let i = 0; i < 5; i++) {
        orderTab.push(
          daysTab.includes(this.referenceNameTab[i]) ? true : false
        );
      }

      let counter = 0;

      for (let i = 0; i < this.referenceNameTab.length; i++) {
        finalTab.push(
          orderTab[i]
            ? this.generateTab(tab[counter][1])
            : { type: "filler", coursLength: 1 }
        );

        if (orderTab[i]) {
          counter++;
        }
      }

      return finalTab;
    },
    convertTimeToFloat(time) {
      const hoursMinutes = time.split(/[.:]/);
      let hours = parseInt(hoursMinutes[0], 10);
      let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
    },
    generateTab(tab) {
      const tabFunc = tab.slice();
      const finalTab = [];
      let previousCours;
      let hoursRemaining = 12;

      tabFunc.sort((a, b) => a.start.substring(0, 2) - b.start.substring(0, 2));

      for (let i = 0; i < tabFunc.length; i++) {
        let tabObj = {};
        if (i == 0 && this.convertTimeToFloat(tabFunc[i].start) != 8) {
          const timeBeforeCours = this.convertTimeToFloat(tabFunc[i].start) - 8;

          finalTab.push({ type: "filler", coursLength: timeBeforeCours });
          hoursRemaining -= timeBeforeCours;
        } else if (previousCours) {
          const timeBetweenCours =
            this.convertTimeToFloat(tabFunc[i].start) -
            this.convertTimeToFloat(previousCours.end);
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
        tabObj.room = tabFunc[i].room;

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
        this.convertTimeToFloat(cours.end) -
        this.convertTimeToFloat(cours.start)
      );
    },
    truncateProfTag(str) {
      return str.replace(/ *\<[^)]*\> */g, "");
    },
  },
};
</script>

<style scoped>
@-moz-document url-prefix() {
  .edt-case {
    margin-top: 30px;
  }
}

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
  align-items: flex-end;
  align-content: center;
  padding: 13px;

  position: absolute;
  bottom: 0;
}

.edt-prof a {
  transition: 0.3s;
  margin-right: 30px;
}

.room-small {
  font-size: 10px;
  margin: 0;
}

@media screen and (max-width: 400px) {
  .edt-time {
    font-size: 10px;
  }

  .edt-subject {
    font-size: 14px;
  }

  .edt-prof {
    font-size: 10px;
  }
}
</style>
