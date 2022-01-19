<template>
  <article class="color-preference">
    <input
      v-for="(color, i) in edtColors"
      :key="color.normal"
      type="radio"
      :id="`radio${i}`"
      :class="`color${i + 1} color-radio`"
      :value="color"
      v-model="selectedColorForm"
      @change="saveColor"
    />
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ColorChanger",
  data() {
    return {
      edtColors: [
        {
          normal: "hsl(0, 70%, 75%)",
          dark: "hsl(0, 70%, 15%)",
        },
        {
          normal: "hsl(60, 70%, 75%)",
          dark: "hsl(60, 70%, 15%)",
        },
        {
          normal: "hsl(100, 70%, 75%)",
          dark: "hsl(100, 70%, 15%)",
        },
        {
          normal: "hsl(170, 70%, 75%)",
          dark: "hsl(170, 70%, 15%)",
        },
        {
          normal: "hsl(200, 70%, 75%)",
          dark: "hsl(200, 70%, 15%)",
        },
        {
          normal: "hsl(250, 70%, 75%)",
          dark: "hsl(250, 70%, 15%)",
        },
        {
          normal: "hsl(330, 70%, 75%)",
          dark: "hsl(330, 70%, 15%)",
        },
      ],
    };
  },
  mounted() {
    this.changeSelectedColor(
      JSON.parse(localStorage.getItem("userColor")) ?? {
        normal: "hsl(200, 70%, 75%)",
        dark: "hsl(200, 70%, 15%)",
      }
    );
  },
  computed: {
    ...mapGetters(["getSelectedColor"]),
    selectedColorForm: {
      get() {
        return this.getSelectedColor;
      },
      set(color) {
        this.changeSelectedColor(color);
      },
    },
  },
  methods: {
    ...mapActions(["changeSelectedColor"]),
    saveColor() {
      localStorage.setItem("userColor", JSON.stringify(this.getSelectedColor));
    },
  },
};
</script>

<style scoped>
.color-radio {
  width: 15px;
  height: 15px;
  transition: 0.3s;
}

.color-radio:checked {
  transform: scale(0.7);
}

.color-radio:hover {
  cursor: pointer;
}
.color-radio:not(:checked):hover {
  transform: scale(0.95);
}

.color-radio:after {
  width: 15px;
  height: 15px;
  border-radius: 20px;
  top: -2px;
  left: -1px;
  position: relative;
  content: "";
  display: inline-block;
  visibility: visible;
  transition: 0.3s;
  border: 2px solid white;
}

.color-radio:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 20px;
  top: -2px;
  left: -1px;
  position: relative;
  content: "";
  display: inline-block;
  visibility: visible;
}

.color1:after {
  background: hsl(0, 70%, 75%);
}

.color2:after {
  background: hsl(60, 70%, 75%);
}

.color3:after {
  background: hsl(100, 70%, 75%);
}

.color4:after {
  background: hsl(170, 70%, 75%);
}

.color5:after {
  background: hsl(200, 70%, 75%);
}

.color6:after {
  background: hsl(250, 70%, 75%);
}

.color7:after {
  background: hsl(330, 70%, 75%);
}
</style>
