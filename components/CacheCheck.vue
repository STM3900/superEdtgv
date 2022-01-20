<template>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CacheCheck",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCacheActivate", "getSelectedColor"]),
    cacheActivateCheckbox: {
      get() {
        return this.getCacheActivate;
      },
      set(status) {
        this.changeCacheActivate(status);
      },
    },
  },
  mounted() {
    this.changeCacheActivate(
      JSON.parse(localStorage.getItem("userCache")) ?? false
    );
  },
  methods: {
    ...mapActions(["changeCacheActivate"]),
    saveCache() {
      localStorage.setItem("userCache", this.getCacheActivate);
    },
  },
};
</script>

<style scoped>
/* pour la checkbox */
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

@media screen and (max-width: 400px) {
  .cache-class label {
    font-size: 12px;
  }

  .cache-class input[type="checkbox"] {
    padding: 7px;
  }

  .cache-class label {
    text-align: right;
  }
}
</style>
