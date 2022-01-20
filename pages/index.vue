<template>
  <div>
    <Header class="edt-case-animation" />
    <HeyMessage
      class="edt-case-animation"
      :name="person.firstname"
      :color="getSelectedColor.normal"
      :style="{ animationDelay: '0.3s' }"
    />
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
          Chercher la semaine
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
      <EdtReady v-if="getStatus == 'ready'" class="edt-case-animation" />
      <EdtLoading v-show="getStatus == 'loading'" class="edt-case-animation" />
      <EdtError v-if="getStatus == 'error'" class="edt-case-animation" />
      <EdtTable :formYear="formYear" />
    </article>
    <Footer class="edt-case-animation" />
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
      "changeSelectedColor",
    ]),

    prepareDate(date) {
      // MM-JJ-AA
      this.formYear = date.substring(0, 4);
      const year = date.slice(2, 4);

      date = date.substring(5);
      date = `${date}-${year}`;

      this.person.date = date;
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
      this.person = { firstname: "", lastname: "", date: "" };
      this.formDate = "";
      this.formYear = "2022";
      this.changeSelectedColor({
        normal: "hsl(200, 70%, 75%)",
        dark: "hsl(200, 70%, 15%)",
        class: "color5",
      });
      this.changeStatus("idle");
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
body {
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

.edt-case-animation {
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
