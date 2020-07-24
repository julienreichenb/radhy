<template>
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="/">
      <img
        src="../static/radhy_logo.png"
        height="50"
        class="d-inline-block mr-3"
        alt="Logo"
      />{{ $t('appname') }}
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item
        class="mr-4"
        href="dashboard"
        :class="currentRouteName.includes('dashboard') ? 'current' : ''"
      >
        {{ $t('navbar.dashboard') }}
      </b-nav-item>
      <b-nav-item
        class="mr-4"
        href="about"
        :class="currentRouteName.includes('about') ? 'current' : ''"
      >
        {{ $t('navbar.about') }}
      </b-nav-item>
      <b-nav-item-dropdown
        :text="this.$t('navbar.lang.title')"
        right
        class="mr-4"
      >
        <b-dropdown-item :to="switchLocalePath('fr')"
          ><img src="../static/france.png" class="lang-icon" />
          {{ $t('navbar.lang.fr') }}</b-dropdown-item
        >
        <b-dropdown-item :to="switchLocalePath('en')"
          ><img src="../static/united.png" class="lang-icon" />
          {{ $t('navbar.lang.en') }}</b-dropdown-item
        >
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.name
    },
  },
}
</script>
<style lang="scss" scoped>
.current .nav-link {
  font-weight: bold;
  color: $basecolor-dark !important;
}
</style>
