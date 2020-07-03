<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/">{{ $t('appname') }}</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item-dropdown :text="this.$t('navbar.lang.title')">
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
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
export default {
  components: { Footer },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.lang-icon {
  width: 25px;
  height: auto;
}
</style>
