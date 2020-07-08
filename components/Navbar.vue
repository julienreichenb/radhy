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
      <b-nav-item class="mr-4" href="dashboard">
        {{ $t('navbar.dashboard') }}
      </b-nav-item>
      <b-nav-item class="mr-4" href="about">
        {{ $t('navbar.about') }}
      </b-nav-item>
      <b-nav-item-dropdown :text="this.$t('navbar.lang.title')" right>
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
