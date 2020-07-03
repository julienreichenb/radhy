<template>
  <div id="footer" class="bg-dark">
    <span class="footer-text">{{ $t('footer') + currentYear }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentYear: 0,
    }
  },
  mounted() {
    this.currentYear = new Date().getFullYear()
  },
}
</script>
<style>
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: right;
}
.footer-text {
  padding: 0.5em;
  font-weight: 100;
}
</style>
