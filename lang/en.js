export default {
  appname: 'RADHY',
  radhy:
    'Integrated Representation\n' +
    'of Individual Adaptations and\n' +
    'Hydrologic Dynamics on the\n' +
    'Büech Basin',
  footer: 'RADHY Büech © ',
  loading: 'Loading map data...',
  head: {
    home: 'Welcome',
    dashboard: 'Dashboard',
    about: 'About',
  },
  navbar: {
    lang: {
      title: 'Language',
      fr: 'French',
      en: 'English',
    },
    about: 'About',
    dashboard: 'Dashboard',
  },
  partners: {
    title: 'Our partners',
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
  go_to_dashboard: 'Go to Dashboard',
  go_to_about: 'More about RADHY',
  dashboard: {
    picker: 'Select the date',
    error: 'No data available at this date.',
    hru: {
      title: 'Shaping the Basin in Areas',
      text:
        `The Buëch Basin is cut in areas, where multiple hydrological and topological measures are taken hourly : rain, soil composition, underground stored water, ...` +
        `The agricultural parcels are also indexed but are not displayed yet on the charts or the map.`,
      rain: {
        title: 'Rain, in liters',
      },
      snow: {
        title: 'Snow, in liters',
      },
      stored: {
        title: 'Stored water inside the soil, in liters',
      },
    },
    reach: {
      title: 'Rivers and Streams',
      text:
        'The watercourses are split in sections, the flow and the stagnant water of which are also hourly measured.',
      runoff: {
        title: 'Water runoff, in liters',
      },
      stored: {
        title: 'Stagnant water, in liters',
      },
    },
    chart: {
      day: 'Date',
      rain: 'Rain (L)',
      stored: 'Underground water (L)',
      runoff: 'Streamed water (L)',
      storedr: 'Stagnant water (L)',
      type: 'Soil Type',
      quantity: 'Proportion',
      argile: 'Clay',
      limon: 'Silt',
      sable: 'Sand',
      unknown: 'Unknown',
      title: {
        hruoverall: 'Rainfall Influence on the Underground Water',
        reachoverall: 'Streaming Water / Stagnant Water Proportions',
        soil: 'Global Soil Composition',
        width: 'Watercourses Width, in meters',
      },
    },
    map: {
      modal: {
        title: 'Map markers meaning',
        text:
          `<p>The <b>rainfall</b> are described by the <span class="water-circle">blue circles</span>. The wider and more colored the circle, the more import the rainfall.</p>` +
          `<p>The <b>areas</b> in <span class="hru-area">dark blue</span> symbolize the amount of underground water : the darker the area, the larger the quantity.</p>` +
          `<p>The <b>watercourses</b> are shown on the map with the <span class="reach-vector">blue lines</span>.` +
          ` The color intensity is influenced by the amount of stored water in the segment and the width by the stream flow.</p>` +
          `<p>You can navigate between the days by using the <b>timeline</b> at the top of the page.</p>`,
      },
      tooltip: {
        stored: 'Underground Water',
        rain: 'Rain',
        snow: 'Snow',
        runoff: 'Streamed Water',
        storedReach: 'Stagnant Water',
        elevation: 'Elevation',
        width: 'Width',
        composition: 'Soil Composition',
        recenter: 'Recenter the map',
      },
      options: {
        tooltip: 'Tooltips',
        stored: 'Underground',
        rain: 'Rainfall',
        reach: 'Watercourses',
        map_jc: 'Dangers areas',
      },
    },
  },
  about: {
    overview: {
      header: 'Project Overview',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat blandit ex, ut eleifend neque sodales at. Morbi odio quam, condimentum ut ligula at, aliquam molestie mi. Vivamus ultricies mollis commodo. Duis sollicitudin, mauris in imperdiet feugiat, tellus erat cursus leo, et dapibus arcu odio quis nulla. Nulla consectetur iaculis varius. Nunc velit nunc, finibus nec nulla sed, dictum luctus nisi. Donec augue lectus, vulputate nec faucibus eu, semper id ipsum. Quisque eu sapien egestas, tempus justo et, elementum neque. Sed sit amet ligula ac ipsum congue sagittis. Vivamus tempus egestas ipsum in luctus. Duis hendrerit luctus neque non sagittis. Pellentesque ut viverra tellus. Curabitur consequat justo quis dui tempus pretium.',
    },
    modeling: {
      header: 'Data collection and Simulations',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat blandit ex, ut eleifend neque sodales at. Morbi odio quam, condimentum ut ligula at, aliquam molestie mi. Vivamus ultricies mollis commodo. Duis sollicitudin, mauris in imperdiet feugiat, tellus erat cursus leo, et dapibus arcu odio quis nulla. Nulla consectetur iaculis varius. Nunc velit nunc, finibus nec nulla sed, dictum luctus nisi. Donec augue lectus, vulputate nec faucibus eu, semper id ipsum. Quisque eu sapien egestas, tempus justo et, elementum neque. Sed sit amet ligula ac ipsum congue sagittis. Vivamus tempus egestas ipsum in luctus. Duis hendrerit luctus neque non sagittis. Pellentesque ut viverra tellus. Curabitur consequat justo quis dui tempus pretium.',
    },
    visualisations: {
      header: 'Data visualisations',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat blandit ex, ut eleifend neque sodales at. Morbi odio quam, condimentum ut ligula at, aliquam molestie mi. Vivamus ultricies mollis commodo. Duis sollicitudin, mauris in imperdiet feugiat, tellus erat cursus leo, et dapibus arcu odio quis nulla. Nulla consectetur iaculis varius. Nunc velit nunc, finibus nec nulla sed, dictum luctus nisi. Donec augue lectus, vulputate nec faucibus eu, semper id ipsum. Quisque eu sapien egestas, tempus justo et, elementum neque. Sed sit amet ligula ac ipsum congue sagittis. Vivamus tempus egestas ipsum in luctus. Duis hendrerit luctus neque non sagittis. Pellentesque ut viverra tellus. Curabitur consequat justo quis dui tempus pretium.',
    },
    thanks: {
      header: 'Acknowledgements',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat blandit ex, ut eleifend neque sodales at. Morbi odio quam, condimentum ut ligula at, aliquam molestie mi. Vivamus ultricies mollis commodo. Duis sollicitudin, mauris in imperdiet feugiat, tellus erat cursus leo, et dapibus arcu odio quis nulla. Nulla consectetur iaculis varius. Nunc velit nunc, finibus nec nulla sed, dictum luctus nisi. Donec augue lectus, vulputate nec faucibus eu, semper id ipsum. Quisque eu sapien egestas, tempus justo et, elementum neque. Sed sit amet ligula ac ipsum congue sagittis. Vivamus tempus egestas ipsum in luctus. Duis hendrerit luctus neque non sagittis. Pellentesque ut viverra tellus. Curabitur consequat justo quis dui tempus pretium.',
    },
  },
}
