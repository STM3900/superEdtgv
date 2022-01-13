export const state = () => ({
  status: "idle",
  edtData: [],
});

export const getters = {
  getStatus: (state) => {
    return state.status;
  },

  getEdtData: (state) => {
    return state.edtData;
  },
};

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },

  SET_EDT_DATA(state, edtData) {
    state.edtData = edtData;
  },
};

export const actions = {
  changeStatus(context, status) {
    context.commit("SET_STATUS", status);
  },

  fetchEdtdata(context) {
    context.commit("SET_STATUS", "loading");
    this.$axios
      .get(
        "https://api-calendar.calendz.app/v1/week?firstname=theo&lastname=migeat"
      )
      .then((response) => {
        context.commit("SET_STATUS", "ready");
        context.commit("SET_EDT_DATA", response.data);
      });
  },
};
