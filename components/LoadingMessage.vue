<template>
  <section>
    <p :class="`p-${getTheme} section-${getTheme} ${status ? 'show' : 'hide'}`">
      {{ currentFact }}
    </p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoadingMessage",
  data() {
    return {
      factsTab: [
        "Sur Vénus, la température au sol n'est jamais en-dessous de 446°C",
        "La Lune est noire, elle reflète seulement 6% de la lumière solaire qui l'atteint",
        "Vénus met plus de temps à faire un tour sur elle-même qu'à faire le tour du Soleil (243 jours contre 225)",
        "Le cœur de la Terre est plus chaud que la surface du Soleil (😳)",
        "Mercure peut varier de température de 600°C d'écart entre le jour et la nuit",
        "Mars abrite le plus haut sommet du système solaire, et celui-ci fait 3x celui de l'Everest (26km de haut)",
        "Il y a plus d'étoiles dans l'Univers que de grains de sable sur la Terre",
        "Il pleut presque tout le temps sur Vénus. Par contre la pluie c'est de l'acide sulfurique ^^",
        "Les bulles ne peuvent pas exister dans l'espace :(",
        "Le vent est tellement rapide sur Neptune qu'il peut briser le mur du son",
        "Il y a 3 atomes par mètre cube dans l'espace",
        "Une cuillière d'une étoile à neutrons pèserait 10 millions de tonnes sur la Terre",
        "Dans le monde scientifique les différentes couches à l'intérieur d'une étoile à neutrons s'appelle \"Les pâtes nucléaires\"",
        "Les empreintes des astonautes resteront sur la lune pendant vraiment vraiment longtemps",
        "Les larmes ne coulent pas dans l'espace",
        "Dans le vide, le son ne peut pas se propager. Personne ne vous entendra crier",
        "Jupiter fait 300 fois le poids de la Terre",
        "Chaque année, 100 000 tonnes de météorites tombent sur la terre",
        "Dans l'espace, les astronautes peuvent gagner jusqu'à 3% de leur taille initiale",
        "Félicette est le premier chat à avoir voyagé dans l'espace en 1963",
        "Chaque année, la Lune s'éloigne de la Terre de 3.78 centimètres",
        "Grace à la force centrifuge de la Terre, vous êtes plus léger près de l'équateur que sur les pôles #fitness",
        "On observe toujours la même face de la lune depuis la Terre",
        "Jupiter est assez large pour accueillir l'ensemble des autres planètes du système solaire réunies",
        "Sur Vénus, un jour est plus long qu'une année",
        "Valentina Terechkova est la première femme à être allée dans l'espace",
        "Sans la présence de la Lune, la Terre ferait sa rotation en 6 heures au lieu des 24h initiales",
        "Notre galaxie mesure environ une centaine de milliers d'années-lumière de long",
        "La lune se situe à 380 000km de la Terre",
        "La masse du Soleil représente 99% de la masse du système solaire",
        "La température de l'espace est de -273.15°C",
        "Une journée sur Mercure équivaut à 59 jours sur Terre",
        "Il y a 170 milliards de galaxies dans l'Univers",
        "Le soleil est tellement grand qu'on pourrait y mettre 1.3 millions de Terres dedans",
        "Si la Terre faisait la taille d'un ballon de basket, la Lune ferait la taille d'une balle de tennis",
      ],
      currentFact: "",
      status: true,
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  mounted() {
    this.updateFact();
    setInterval(() => {
      this.updateFact();
    }, 4000);
  },

  methods: {
    getRandom(tab) {
      return tab[Math.floor(Math.random() * tab.length)];
    },
    updateFact() {
      this.status = false;
      setTimeout(() => {
        this.currentFact = this.getRandom(this.factsTab);
        setTimeout(() => {
          this.status = true;
        }, 300);
      }, 300);
    },
  },
};
</script>

<style scoped>
section {
  position: absolute;

  width: calc(100% - 45px);
  margin-left: 45px;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  z-index: 999999;
  transition: 0.3s;
}

section p {
  padding: 15px;
  border-radius: 5px;
  transition: 0.3s;
}

.section-light {
  background: white;
}

.section-dark {
  background: #191919;
}

.show {
  opacity: 1;
  animation: fadeIn 0.3s ease;
  transition: 0.3s;
}

.hide {
  opacity: 0;
  animation: fadeOut 0.3s ease;
  transition: 0.3s;
}

@keyframes fadeIn {
  0% {
    transform: translateY(-4px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-4px);
    opacity: 0;
  }
}

@media screen and (max-width: 400px) {
  section p {
    font-size: 12px;
  }
}
</style>
