export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Super EDTGV",
    htmlAttrs: {
      lang: "fr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Marre d'un edt moche ? Avec EDTGV, accéder à vos cours à tout instant, sans vous ruiner les yeux.",
      },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#93ceec" },
    ],
    link: [
      { rel: "icon", type: "image/png", href: "./favicon.png" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/placeholder.js", "~plugins/GoogleAnalytics.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      "nuxt-fontawesome",
      {
        component: "fa", //customize component name
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faLink", "faStream", "faLightbulb", "faSun", "faMoon"],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: [],
          },
          { set: "@fortawesome/free-regular-svg-icons", icons: [] },
        ],
      },
    ],
    "@nuxtjs/dotenv",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    base: "/edtgv/",
  },
};
