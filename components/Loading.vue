<template>
  <div id="loading">
    <div>
      <p>{{ $t('loading') }}</p>
      <font-awesome-icon icon="spinner" size="4x" spin />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#loading {
  opacity: 0.8;
  height: 100%;
  width: 100%;
  text-align: center;
  margin: 0 0 3em 0;
}

#loading > div {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

svg {
  color: $basecolor;
}
</style>
