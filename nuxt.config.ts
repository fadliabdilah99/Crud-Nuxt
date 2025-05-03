// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
      public: {
          baseUrl: process.env.BASE_URL
      }
  },

  app: {
      head: {
          link: [
              {
                  rel: 'icon',
                  href: '/assets/img/kaiadmin/favicon.ico',
                  type: 'image/x-icon'
              },
              {
                  rel: 'stylesheet',
                  href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
                  integrity: 'sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD',
                  crossorigin: 'anonymous'
              },
              {
                  rel: 'preconnect',
                  href: 'https://fonts.googleapis.com'
              },
              {
                  rel: 'stylesheet',
                  href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600&display=swap'
              },
              {
                  rel: 'stylesheet',
                  href: '/assets/css/bootstrap.min.css'
              },
              {
                  rel: 'stylesheet',
                  href: '/assets/css/plugins.min.css'
              },
              {
                  rel: 'stylesheet',
                  href: '/assets/css/kaiadmin.min.css'
              },
              {
                  rel: 'stylesheet',
                  href: '/assets/css/fonts.min.css'
              },

          ],
          script: [
              {
                  src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
                  integrity: 'sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN',
                  crossorigin: 'anonymous'
              },
              {
                  src: 'https://cdn.jsdelivr.net/npm/sweetalert2@11',
              },
              {
                  src: '/assets/js/plugin/webfont/webfont.min.js',
              },
              {
                  src: '/assets/js/plugin/chart.js/chart.min.js',
              },
              {
                  src: '/assets/js/core/jquery-3.7.1.min.js'
              },
              {
                  src: '/assets/js/core/popper.min.js'
              },
              {
                  src: '/assets/js/core/bootstrap.min.js'
              },
              {
                  src: '/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js'
              },
              {
                  src: '/assets/js/plugin/datatables/datatables.min.js'
              },
              {
                  src: '/assets/js/kaiadmin.min.js'
              },
              {
                  src: '/assets/js/setting-demo2.js'
              },
              {
                  innerHTML: `
                  WebFont.load({
                    google: { families: ["Public Sans:300,400,500,600,700"] },
                    custom: {
                      families: [
                        "Font Awesome 5 Solid",
                        "Font Awesome 5 Regular",
                        "Font Awesome 5 Brands",
                        "simple-line-icons",
                      ],
                      urls: ["/assets/css/fonts.min.css"],
                    },
                    active: function () {
                      sessionStorage.fonts = true;
                    },
                  });
                  `
              },
          ],
      }
  },

  compatibilityDate: '2025-04-29'
})