<template>
  <div class="loading-logo">
    <svg width="31px" height="31px" viewBox="0 0 31 31">
      <title>Logo</title>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(0.000000, -1.000000)" fill="#77C6C2">
          <g transform="translate(0.000000, 1.000000)">
            <g>
              <path d="M20.8692912,20.8691696 L9.92811471,20.8691696 L9.92811471,9.92799314 L20.8692912,9.92799314 L20.8692912,11.4998755 L16.6143892,15.4107382 L20.8692912,19.3212971 L20.8692912,20.8691696 Z M15.3987029,-0.000212745098 C6.89436961,-0.000212745098 -9.1176471e-05,6.89424804 -9.1176471e-05,15.3985814 C-9.1176471e-05,23.9029147 6.89436961,30.7973755 15.3987029,30.7973755 C23.9030363,30.7973755 30.7974971,23.9029147 30.7974971,15.3985814 C30.7974971,6.89424804 23.9030363,-0.000212745098 15.3987029,-0.000212745098 L15.3987029,-0.000212745098 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    //
  }
</script>

<style scoped>
  body, html, #__nuxt {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-logo {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: sk-rotateplane 2.4s infinite ease-in-out;
  }

  .loading-logo svg {
    transform: scale(1.75);
  }

  @keyframes sk-rotateplane {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }

    25% {
      transform: rotateX(-180deg) rotateY(0deg);
    }

    50% {
      transform: rotateX(-180deg) rotateY(-180deg);
    }

    75% {
      transform: rotateX(-360deg) rotateY(-180deg);
    }

    100% {
      transform: rotateX(-360deg) rotateY(-360deg);
    }
  }
</style>
