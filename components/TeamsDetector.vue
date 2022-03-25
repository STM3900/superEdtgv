<template>
  <div v-if="getStatus == 'ready'">
    <article v-if="checkSetCurrentTeams()" :class="`article-${getTheme}`">
      <fa
        class="icon-hint"
        icon="lightbulb"
        :style="{
          color: getSelectedColor.normal,
        }"
      />

      <section>
        <p :class="`p-${getTheme}`">
          {{ firstSentence }}
          <i class="capitalize">
            {{ capitalize(currentCours.subject) }}
            <span v-if="isBefore">bientôt</span>
          </i>
          <br />
          {{ linkSentence }} en cliquant
          <a
            :href="currentCours.link"
            :style="{
              color: getSelectedColor.normal,
            }"
            >ici</a
          >
          !
        </p>
      </section>
    </article>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CacheCheck",
  data() {
    return {
      currentCours: [],
      isBefore: false,
      firstSentence: "",
      linkSentence: "",
      firstSentenceList: [
        "Il semblerait que tu aies",
        "A tiens, j'crois que t'as",
        "On dirait que t'as",
        "Tiens, tu as",
        "Super t'as le cours",
      ],
      linkSentenceList: [
        "Tu peux le rejoindre directement",
        "Vas-y vite",
        "Soit pas en retard, vas-y",
        "Rejoint-le",
        "Bonne chance, rejoint le",
      ],
    };
  },
  mounted() {
    this.firstSentence = this.getRandom(this.firstSentenceList);
    this.linkSentence = this.getRandom(this.linkSentenceList);
  },
  computed: {
    ...mapGetters(["getEdtData", "getStatus", "getSelectedColor", "getTheme"]),
  },
  methods: {
    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    },
    getRandom(tab) {
      return tab[Math.floor(Math.random() * tab.length)];
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },
    formatDate(date) {
      return [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    },
    getCurrentDate() {
      return this.formatDate(new Date());
    },
    convertCoursTimeToInt(time) {
      return +time.slice(0, 2);
    },
    fixYear(date) {
      let dayMonth = date.slice(0, 6);
      let year = date.slice(6);

      if (year.length > 4) {
        year = year.slice(2);
      }

      return dayMonth + year;
    },
    checkIfActiveCours(cours) {
      const now = new Date();

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const coursStart = this.convertCoursTimeToInt(cours.start);
      const coursEnd = this.convertCoursTimeToInt(cours.end);

      let isActive = false;

      if (
        cours.link &&
        ((currentHour >= coursStart && currentHour < coursEnd) ||
          (currentHour == coursStart - 1 && currentMinute >= 45))
      ) {
        isActive = true;
        this.currentCours = cours; // pas super propre mais ça ira
      }

      if (
        this.convertCoursTimeToInt(cours.start) == currentHour - 1 &&
        currentMinute >= 45
      ) {
        this.isBefore = true;
      } else {
        this.isBefore = false;
      }

      return isActive;
    },
    checkSetCurrentTeams() {
      const tab = Object.entries(this.getEdtData.week);
      let isTeams = false;

      for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i][1].length; j++) {
          if (this.fixYear(tab[i][1][j].date) == this.getCurrentDate()) {
            if (this.checkIfActiveCours(tab[i][1][j])) {
              isTeams = true; // permet de ne pas changer le status quand true puis false
            }
          }
        }
      }

      return isTeams;
    },
  },
};
</script>

<style scoped>
article {
  overflow: hidden;
  max-width: 725px;
  margin-top: 0;

  transition: 0.3s;
  border: solid 1px;

  border-radius: 5px;

  transition: 0.3s;
  max-height: 0;
  opacity: 0;
  animation: showUp 0.5s ease forwards;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}

.article-light {
  border-color: #e1e1e1;
}

.article-dark {
  border-color: rgb(50, 50, 50);
}

article .icon-hint {
  margin-right: 10px;
  margin-top: 3px;
  font-size: 14px;
  transition: 0.3s;
}

article p {
  margin: 0;
  font-size: 14px;
}

article .capitalize {
  text-transform: capitalize;
}

article a {
  transition: 0.3s;
}

@keyframes showUp {
  0% {
    padding: 0px 20px;
    max-height: 0;
    opacity: 0;
  }
  100% {
    padding: 20px;
    max-height: 50px;
    opacity: 1;
  }
}

@media screen and (max-width: 400px) {
  article p {
    font-size: 12px;
  }
}
</style>
