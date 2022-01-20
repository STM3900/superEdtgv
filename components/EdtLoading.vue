<template>
  <section class="edt-case">
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
</template>

<script>
export default {
  name: "EdtLoading",
  data() {
    return {};
  },
  methods: {
    getRandomPlaceHolder() {
      return [true, true, false, false].sort((a, b) => 0.5 - Math.random());
    },
  },
};
</script>

<style scoped>
.edt-case div .placeholder {
  width: 100%;
  margin-bottom: 1px;
}

.edt-case div .placeholder > div {
  padding: 13px;
  margin-left: 3px;
  margin-right: 3px;
}

.edt-case div .filler {
  visibility: hidden;
  width: 100%;
}
</style>
