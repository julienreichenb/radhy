export default {
  appname: 'RADHY',
  radhy:
    'Représentation intégrée\n' +
    'des Adaptations individuelles et des\n' +
    'Dynamiques HYdrologiques sur le bassin\n' +
    'du Büech',
  footer: 'RADHY Büech © ',
  loading: 'Chargement de la carte...',
  head: {
    home: 'Bienvenue',
    dashboard: 'Dashboard',
    about: 'À propos',
  },
  navbar: {
    lang: {
      title: 'Langue',
      fr: 'Français',
      en: 'Anglais',
    },
    about: 'À propos',
    dashboard: 'Dashboard',
  },
  partners: {
    title: 'Nos partenaires',
    hes: {
      url: 'https://www.hevs.ch/fr/',
      name: '',
    },
    eaurmc: {
      url: 'https://www.eaurmc.fr/',
      name: '',
    },
    geau: {
      url: 'https://www.g-eau.fr/index.php/fr/',
      name: '',
    },
    inrae: {
      url: 'https://www.inrae.fr/',
      name: '',
    },
    zabr: {
      url: 'http://www.graie.org/zabr/',
      name: '',
    },
    umrespace: {
      url: 'https://www.umrespace.org/',
      name: '',
    },
  },
  go_to_dashboard: 'Accéder au Dashboard',
  go_to_about: "Plus d'infos sur RADHY",
  dashboard: {
    hru: {
      title: 'Découpage du bassin versant en zones',
      text:
        `Le bassin du Buëch est découpé en zones. Diverses mesures hydrologiques et topologiques sont prises chaque heure : précipitations, composition du sol, quantité d'eau en sous-sol, ...` +
        `Les parcelles agricoles y sont également répertoriées mais ne sont pour le moment pas représentées sur les graphiques et la carte.`,
      rain: {
        title: 'Précipitations, en litres',
      },
      snow: {
        title: 'Neige, en litres',
      },
      stored: {
        title: 'Eau stockée dans le sol, en litres',
      },
    },
    reach: {
      title: "Cours d'eau",
      text: `Les cours d'eau du bassin sont découpés en tronçons, dont le débit et la quantité d'eau stagnante sont également mesurés chaque heure.`,
      runoff: {
        title: 'Eau écoulée, en litres',
      },
      stored: {
        title: 'Eau stagnante, en litres',
      },
    },
    chart: {
      day: 'Date',
      rain: 'Pluie (L)',
      stored: 'Nappes phréatiques (L)',
      runoff: 'Eau écoulée (L)',
      storedr: 'Eau stagnante (L)',
    },
    map: {
      modal: {
        title: 'Signification des marqueurs sur la carte',
        text:
          `<p>Les <b>précipitations</b> sont décrites par les <span class="water-circle">cercles bleus</span>. Plus le cercle est grand et coloré, plus les précipitations sont importantes.</p>` +
          `<p>Les <b>zones</b> marquées en <span class="hru-area">bleu foncé</span> symbolisent l'eau stockées dans le sol : plus la zone est foncée, plus la nappe est conséquente.</p>` +
          `<p>Les <b>cours d'eau</b> sont représentés sur la carte par les <span class="reach-vector">traits bleus</span>.` +
          ` L'intensité de la couleur est influencée par la quantité d'eau stagnante dans le tronçon et la largeur par le débit s'y écoulant.</p>` +
          `<p>Vous pouvez naviguer de jour en jour en utilisant la <b>ligne temporelle</b> au sommet de la page.</p>`,
      },
      tooltip: {
        stored: 'Nappe phréatique',
        rain: 'Pluie',
        snow: 'Neige',
        runoff: 'Eau écoulée',
        storedReach: 'Eau stagnante',
        elevation: 'Altitude',
        width: 'Largeur',
        recenter: 'Recentrer la carte',
      },
      options: {
        tooltip: 'Infobulles',
        stored: 'Sous-sol',
        rain: 'Précipitations',
        reach: "Cours d'eau",
      },
    },
  },
  about: {
    overview: {
      header: "Vue d'ensemble du projet",
      content: `À l’heure où les changements climatiques en cours induisent des épisodes de sécheresse plus fréquents et plus intenses, la société doit développer sa capacité de résilience et mettre en place des stratégies d’adaptation, notamment dans la gestion de l’eau. Le bassin du Buëch fait ainsi partie des territoires où la tension sur la ressource en eau peut s’avérer importante à certaines périodes de l’année, et nécessiter une adaptation de tous ses usagers. La recherche propose de contribuer à la réflexion sur les futurs possibles et souhaités du bassin du Buëch pour la gestion de l’eau, par une vision co-construite entre chercheurs et acteurs du territoire. Elle prolonge ainsi les réflexions menées dans le Plan de gestion de la ressource en eau (PGRE, SMIGIBA 2019), en adoptant une vision prospective et territorialisée.`,
    },
    modeling: {
      header: 'Collecte des données et simulations',
      content: `La modélisation du système EAU peut permettre de simuler des scénarios d’actions dans diverses situations hydrologiques, contribuant à aider la réflexion sur le partage de l’eau en période de tension sur la ressource. La prise en compte de la vision actuelle et future des acteurs économiques, politiques et des habitants du Buëch de leur territoire face à la problématique de l’eau est l’une des entrées clés de la mise en place de scénarios d’adaptations locales au risque de sécheresse.`,
    },
    visualisations: {
      header: 'Visualisations des données',
      content: `Pour permettre une interprétation correcte des données et aider les différents acteurs à prendre des décisions en toute connaissance de cause, les diverses mesures et simulations doivent pouvoir être visualisées. Au travers de cartes et de graphiques interactifs, l'état actuel et les scénarios futurs de la gestion de l'eau peuvent être interprétés et donner lieu à des décisions concrètes.`,
    },
    thanks: {
      header: 'Remerciements',
      content:
        'Julien Reichenbach, <b>HES-SO Valais/Wallis</b> - Développeur de la plateforme',
    },
  },
}
