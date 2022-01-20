<template>
  <div>
    <h1>Super EDTGV</h1>
    <HeyMessage :name="person.firstname" :color="getSelectedColor.normal" />
    <article
      :class="
        getTogglePanel
          ? 'person-form-show person-form'
          : 'person-form-hide person-form'
      "
    >
      <section>
        <div>
          <label for="firstname">Prénom</label>
          <input type="text" id="firstname" v-model="person.firstname" />
        </div>
        <div>
          <label for="lastname">Nom</label>
          <input type="text" id="lastname" v-model="person.lastname" />
        </div>
        <div>
          <label for="date">Date</label>
          <input
            type="date"
            id=""
            date
            v-model="formDate"
            @change="prepareDate(formDate)"
          />
        </div>
      </section>
      <div>
        <button
          v-if="!formDate"
          @click="
            fetchCurentWeekEdtdata(formatName(person));
            saveName();
          "
          :disabled="!person.firstname || !person.lastname"
          :style="{
            background: getSelectedColor.normal,
            color: getSelectedColor.dark,
            borderColor: getSelectedColor.normal,
          }"
        >
          Chercher la semaine en cours
        </button>
        <button
          v-else
          @click="
            fetchEdtdata(formatName(person));
            saveName();
          "
          :disabled="!person.firstname || !person.lastname"
          :style="{
            background: getSelectedColor.normal,
            color: getSelectedColor.dark,
            borderColor: getSelectedColor.normal,
          }"
        >
          Chercher
        </button>
        <button
          @click="resetStorage"
          :style="{
            color: getSelectedColor.dark,
            borderColor: getSelectedColor.normal,
          }"
        >
          Réinitialiser tes préférences
        </button>
      </div>

      <div class="color-wrapper">
        <ColorChanger />
        <div class="cache-class">
          <label for="cacheCheckbox">Désactiver le cache</label>
          <input
            type="checkbox"
            id="cacheCheckbox"
            :class="getSelectedColor.class"
            v-model="cacheActivateCheckbox"
            @change="saveCache()"
          />
        </div>
      </div>
    </article>

    <article class="edt-container">
      <section v-if="getStatus == 'ready'" class="edt-case">
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
            <div :style="{ background: getSelectedColor.normal }">
              <div :style="{ color: getSelectedColor.dark }">
                <section class="edt-time">
                  {{ tab.start }} - {{ tab.end }}
                </section>
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
      <section v-show="getStatus == 'loading'" class="edt-case">
        <div v-for="i in 5" :key="i">
          <div
            v-for="(item, i) in getRandomPlaceHolder()"
            :key="i"
            class="placeholder"
          >
            <div v-if="item">
              <content-placeholders :rounded="true">
                <content-placeholders-heading :img="false" />
                <content-placeholders-text :lines="2" />
              </content-placeholders>
            </div>
            <div
              v-else
              class="filler"
              :style="{
                height: '110px',
              }"
            ></div>
          </div>
        </div>
      </section>
      <section v-show="getStatus == 'error'" class="edt-case-error">
        <h3>Pas de cours !</h3>
        <p>(Ou alors mauvaise saisie)</p>
      </section>
      <table>
        <thead>
          <th>&nbsp;</th>
          <th v-for="(day, i) in weekDays" :key="day">
            <span :style="{ animationDelay: `${0.3 + 0.07 * i}s` }">
              {{ day }}
            </span>
            <span
              v-if="getStatus == 'ready'"
              :style="{ animationDelay: `${0.1 * i}s` }"
              >{{ getDateOfDay(i) }}</span
            >
          </th>
        </thead>
        <tbody>
          <tr v-for="i in 12" :key="i">
            <td
              class="table-hours"
              :style="{ animationDelay: `${0.4 + 0.07 * i}s` }"
            >
              {{ i + 7 }}h
            </td>
            <td v-for="i in 5" :key="i" class="table-normal-columns"></td>
          </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ColorChanger from "~/components/ColorChanger.vue";

export default {
  name: "IndexPage",
  computed: {
    ...mapGetters([
      "getStatus",
      "getEdtData",
      "getSelectedColor",
      "getTogglePanel",
      "getCacheActivate",
    ]),
    cacheActivateCheckbox: {
      get() {
        return this.getCacheActivate;
      },
      set(status) {
        this.changeCacheActivate(status);
      },
    },
  },
  data() {
    return {
      person: {
        firstname: "",
        lastname: "",
        date: "",
      },
      formDate: "",
      formYear: "2022",
      weekDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    };
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.person = JSON.parse(localStorage.getItem("user"));
      if (localStorage.getItem("userDate")) {
        this.formDate = JSON.parse(localStorage.getItem("userDate"));
      }

      this.changeCacheActivate(
        JSON.parse(localStorage.getItem("userCache")) ?? false
      );

      setTimeout(() => {
        !localStorage.getItem("userDate")
          ? (this.prepareDate(this.formDate),
            this.fetchCurentWeekEdtdata(this.formatName(this.person)))
          : this.fetchEdtdata(this.formatName(this.person));
      }, 1000);
    }
  },
  methods: {
    ...mapActions([
      "changeStatus",
      "fetchCurentWeekEdtdata",
      "fetchEdtdata",
      "changeCacheActivate",
    ]),
    getDateOfDay(index) {
      let startDate = this.getDateOfISOWeek(
        this.getEdtData.weekNumber,
        this.formYear
      );
      startDate.setDate(startDate.getDate() + index);

      return this.formatDate(startDate);
    },
    getDateOfISOWeek(w, y) {
      var simple = new Date(y, 0, 1 + (w - 1) * 7);
      var dow = simple.getDay();
      var ISOweekStart = simple;
      if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
      else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
      return ISOweekStart;
    },
    prepareDate(date) {
      // MM-JJ-AA
      this.formYear = date.substring(0, 4);
      const year = date.slice(2, 4);

      date = date.substring(5);
      date = `${date}-${year}`;

      this.person.date = date;
    },
    formatDate(d) {
      return [d.getDate(), d.getMonth() + 1]
        .map((n) => (n < 10 ? `0${n}` : `${n}`))
        .join("/");
    },
    convertTimeToInt(time) {
      return +time.substring(0, 2);
    },
    getCoursLength(cours) {
      return (
        this.convertTimeToInt(cours.end) - this.convertTimeToInt(cours.start)
      );
    },
    generateAllCours(tab) {
      tab = Object.entries(tab);

      let finalTab = [];
      for (let i = 0; i < tab.length; i++) {
        finalTab.push(this.generateTab(tab[i][1]));
      }

      return finalTab;
    },
    generateTab(tab) {
      let finalTab = [];
      let previousCours;
      let hoursRemaining = 12;

      for (let i = 0; i < tab.length; i++) {
        let tabObj = {};
        if (i == 0 && this.convertTimeToInt(tab[i].start) != 8) {
          const timeBeforeCours = this.convertTimeToInt(tab[i].start) - 8;

          finalTab.push({ type: "filler", coursLength: timeBeforeCours });
          hoursRemaining -= timeBeforeCours;
        } else if (previousCours) {
          const timeBetweenCours =
            this.convertTimeToInt(tab[i].start) -
            this.convertTimeToInt(previousCours.end);
          if (timeBetweenCours > 0) {
            finalTab.push({ type: "filler", coursLength: timeBetweenCours });
            hoursRemaining -= timeBetweenCours;
          }
        }
        tabObj.type = "cours";
        tabObj.coursLength = this.getCoursLength(tab[i]);
        tabObj.subject = tab[i].subject;
        tabObj.professor = this.truncateProfTag(tab[i].professor);
        tabObj.start = tab[i].start;
        tabObj.end = tab[i].end;
        tabObj.link = tab[i].link;

        finalTab.push(tabObj);
        hoursRemaining -= tabObj.coursLength;
        previousCours = tab[i];
      }

      if (hoursRemaining) {
        finalTab.push({ type: "filler", coursLength: hoursRemaining });
      }

      return finalTab;
    },
    truncateProfTag(str) {
      return str.replace(/ *\<[^)]*\> */g, "");
    },
    formatString(string) {
      return string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
    formatName(person) {
      return {
        firstname: this.formatString(person.firstname),
        lastname: this.formatString(person.lastname),
        date: person.date,
      };
    },
    saveName() {
      localStorage.setItem("user", JSON.stringify(this.person));
      localStorage.setItem("userDate", JSON.stringify(this.formDate));
    },
    saveCache() {
      localStorage.setItem("userCache", this.getCacheActivate);
    },
    resetStorage() {
      localStorage.clear();
    },
    getRandomPlaceHolder() {
      return [true, true, false, false].sort((a, b) => 0.5 - Math.random());
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Quicksand", sans-serif;
}

h1 {
  font-family: "Quicksand", sans-serif;
}

/* person form 120*/
.person-form-show {
  max-height: 120px;
  opacity: 1;
  padding: 20px;
}

.person-form-hide {
  max-height: 0;
  opacity: 0;
  padding: 0px 20px;
}

.person-form {
  overflow: hidden;
  max-width: 725px;

  transition: 0.3s;
  border: solid 1px #e1e1e1;

  border-radius: 5px;
}

.person-form section {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;

  gap: 20px;

  margin-top: 10px;
  margin-bottom: 20px;
}

.person-form section div {
  position: relative;
}

.color-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.cache-class {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}

.cache-class label {
  font-family: "Quicksand", sans-serif;
  margin: 0;
  font-size: 14px;
  margin-right: 5px;
}

/* pour la checkbox */

.cache-class input[type="checkbox"] {
  -webkit-appearance: none;
  margin: 0;
  margin-right: 3px;

  padding: 7px;
  border-radius: 4px;

  display: inline-block;
  position: relative;
  transition: 0.3s;
}

.cache-class input[type="checkbox"]:hover {
  cursor: pointer;
}

.cache-class .color1 {
  border: 1px solid hsl(0, 70%, 75%);
}

.cache-class .color1:checked {
  background-color: hsl(0, 70%, 85%);
}

.cache-class .color2 {
  border: 1px solid hsl(60, 70%, 75%);
}

.cache-class .color2:checked {
  background-color: hsl(60, 70%, 85%);
}

.cache-class .color3 {
  border: 1px solid hsl(100, 70%, 75%);
}

.cache-class .color3:checked {
  background-color: hsl(100, 70%, 85%);
}

.cache-class .color4 {
  border: 1px solid hsl(170, 70%, 75%);
}

.cache-class .color4:checked {
  background-color: hsl(170, 70%, 85%);
}

.cache-class .color5 {
  border: 1px solid hsl(200, 70%, 75%);
}

.cache-class .color5:checked {
  background-color: hsl(200, 70%, 85%);
}

.cache-class .color6 {
  border: 1px solid hsl(250, 70%, 75%);
}

.cache-class .color6:checked {
  background-color: hsl(250, 70%, 85%);
}

.cache-class .color7 {
  border: 1px solid hsl(330, 70%, 75%);
}

.cache-class .color7:checked {
  background-color: hsl(330, 70%, 85%);
}

.cache-class input[type="checkbox"]:checked:after {
  content: ""; /* \2714 */
  font-size: 8px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: white;
}

/* */

.person-form section input {
  font-family: "Quicksand", sans-serif;

  /* haut | droit | bas | gauche */
  padding: 5px 2px 2px 2px;

  font-size: 16px;
  border: none;
  border-bottom: solid 1px black;

  outline: none;
}

.person-form section input[type="date"] {
  /* haut | droit | bas | gauche */
  padding: 4px 2px 1px 2px;
}

.person-form section label {
  font-family: "Quicksand", sans-serif;
  position: absolute;
  top: -8px;
  font-size: 10px;
}

.person-form button {
  font-family: "Quicksand", sans-serif;

  background: none;
  transition: 0.3s;
  padding: 8px 15px;

  border-radius: 5px;
  border: none;
  border: solid 1px;

  margin-bottom: 10px;
}

.person-form button:disabled {
  opacity: 0.5;
  transform: scale(0.99);
}

.person-form button:not(:active):not(:disabled):hover {
  cursor: pointer;
  transform: scale(0.99);
}

.person-form button:active {
  transform: scale(0.93);
}

/* edt */
.edt-container {
  max-width: 1500px;
  margin-top: 25px;
  position: relative;
}

.edt-case-error {
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
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

.edt-case-error h3 {
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  margin: 0;
  color: rgb(50, 50, 50);
}

.edt-case-error p {
  font-family: "Quicksand", sans-serif;
  color: rgb(150, 150, 150);
  font-size: 14px;
  margin-top: 3px;
  font-style: italic;
}

.edt-case {
  position: absolute;

  width: calc(100% - 45px);
  margin-left: 45px;

  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;

  z-index: 2;
}

.edt-case > div {
  margin-top: 36px;
  width: calc(20% - 2px);
  height: calc(100% - 37px);

  margin-right: 2px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;

  transition: 0.3s;
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.edt-case div .cours {
  width: 100%;
  margin-bottom: 1px;
}

.edt-case div .cours > div {
  /* background: #1689be; */
  transition: 0.3s;
  border-radius: 5px;
  height: 100%;

  margin-left: 3px;
  margin-right: 3px;
}

.edt-case div .cours > div > div {
  font-family: "Quicksand", sans-serif;
  color: white;
  height: 85%;
  padding: 13px;

  text-transform: capitalize;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
}

.edt-case div .placeholder {
  width: 100%;
  margin-bottom: 1px;
}

.edt-case div .placeholder > div {
  padding: 13px;
  margin-left: 3px;
  margin-right: 3px;
}

.edt-time {
  font-size: 12px;
}

.edt-subject {
  align-self: center;
  text-align: center;
}

.edt-prof {
  font-size: 12px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.edt-prof a {
  transition: 0.3s;
}

.edt-case div .filler {
  visibility: hidden;
  width: 100%;
}

table {
  width: 100%;
  border-spacing: 0px;
  min-height: 650px;

  font-family: "Quicksand", sans-serif;
  transition: 0.3s;
  z-index: 1;
}

thead th {
  text-align: left;
  padding-bottom: 10px;
  font-size: 20px;
}

thead th span,
.table-normal-columns {
  transition: 0.3s;
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

tbody tr td {
  width: 20%;
  padding: 10px;
}

tbody tr td:not(:last-child) {
  border-right: solid 1px #e1e1e1;
}

tbody tr td:first-child {
  width: auto;
}

.table-hours {
  transition: 0.3s;
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  0% {
    transform: translateX(-5px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
