<template>
  <div>
    <Navbar />
    <no-ssr>
      <Nuxt />
    </no-ssr>
    <Footer />
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components: { Footer, Navbar },
}
</script>
<style lang="scss">
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

nav.navbar {
  border-bottom: 1px solid $basecolor !important;
}

.bg-primary {
  background-color: $basecolor !important;
}

.bg-dark {
  background-color: $basecolor-dark !important;
}

.text-primary {
  color: $basecolor !important;
}

button.btn-outline-primary {
  border-color: $basecolor;
  color: $basecolor;
}

button.btn-outline-primary:hover {
  border-color: $basecolor;
  background-color: $basecolor;
}

button.btn-outline-primary:active {
  background-color: $basecolor !important;
}

button.btn-primary {
  border-color: $basecolor;
  background-color: $basecolor;
}

button.btn-primary:hover {
  border-color: $basecolor;
  background-color: $basecolor-dark;
}

button.btn-primary:active {
  background-color: $basecolor !important;
}

button.btn-light {
  color: $basecolor !important;
  border-color: $basecolor !important;
}
</style>
