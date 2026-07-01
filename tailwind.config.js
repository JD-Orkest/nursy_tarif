/** @type {import('tailwindcss').Config} */
module.exports = {
  // ─── Chemins à scanner pour purger les classes inutilisées ───────────────
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],

  theme: {
    // ─── Polices par défaut (remplacement global) ────────────────────────
    fontFamily: {
      display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      body:    ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      sans:    ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },

    extend: {
      // ─── Palette "Clinical Sanctuary" ──────────────────────────────────
      colors: {
        // Surfaces (layering sans bordures — No-Line Rule)
        'surface':              '#f7fafb',
        'surface-dim':          '#d7dadb',
        'surface-lowest':       '#ffffff',
        'surface-low':          '#f1f4f5',
        'surface-container':    '#ebeeef',
        'surface-high':         '#e6e9ea',
        'surface-highest':      '#e0e3e4',
        'surface-tonal':        '#F4F9F9',
        'surface-base':         '#FFFFFF',

        // Texte — jamais de noir pur
        'on-surface':           '#181c1d',
        'on-surface-variant':   '#3d494a',
        'inverse-surface':      '#2d3132',
        'inverse-on-surface':   '#eef1f2',

        // Contours (uniquement pour les focus ring, jamais pour dividers)
        'outline':              '#6d797a',
        'outline-variant':      '#bdc9ca',

        // Couleur principale — "The Authority"
        'primary':              '#15919B',
        'primary-alt':          '#00666e',
        'primary-end':          '#00818a',
        'on-primary':           '#ffffff',
        'primary-container':    '#00818a',
        'inverse-primary':      '#6fd6e0',

        // Couleur secondaire — "The Atmosphere"
        'secondary':            '#ADD8DC',
        'secondary-alt':        '#3c6569',
        'on-secondary':         '#ffffff',
        'secondary-container':  '#bce7ec',
        'on-secondary-container':'#40696d',

        // Accent neutre
        'accent-muted':         '#7FA5A8',

        // États
        'error':                '#ba1a1a',
        'on-error':             '#ffffff',
        'error-container':      '#ffdad6',

        // Alias CTA gradient
        'cta-start':            '#00666E',
        'cta-end':              '#00818A',
      },

      // ─── Échelle typographique ──────────────────────────────────────────
      fontSize: {
        'display-lg': ['3rem',    { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline-lg':['2rem',    { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'headline-md':['1.5rem',  { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'headline-sm':['1.25rem', { lineHeight: '1.3' }],
        'body-lg':    ['1.125rem',{ lineHeight: '1.6' }],
        'body-md':    ['1rem',    { lineHeight: '1.6' }],
        'body-sm':    ['0.875rem',{ lineHeight: '1.5' }],
        'label-sm':   ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.05em' }],
      },

      // ─── Arrondis (forme architecturale — jamais de pill) ──────────────
      borderRadius: {
        'card':   '20px',   // cartes & modals
        'button': '12px',   // boutons & inputs (alias de rounded-xl)
      },

      // ─── Ombres "Ambient" (tonal, jamais dures) ────────────────────────
      boxShadow: {
        'level-1': '0 2px 8px 0 rgba(21, 145, 155, 0.06)',
        'level-2': '0 4px 20px 0 rgba(21, 145, 155, 0.08)',
        'level-3': '0 8px 40px 0 rgba(21, 145, 155, 0.14)',
        'cta':     '0 8px 32px 0 rgba(21, 145, 155, 0.30)',
        'cta-hover':'0 16px 48px 0 rgba(21, 145, 155, 0.42)',
        'card':    '0 4px 24px 0 rgba(21, 145, 155, 0.08), 0 1px 4px 0 rgba(24, 28, 29, 0.04)',
        'focus':   '0 0 0 3px rgba(21, 145, 155, 0.20)',
        'glass':   '0 8px 32px 0 rgba(21, 145, 155, 0.10)',
      },

      // ─── Animations (pures CSS — zéro dépendance tierce) ───────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'fade-in':    'fade-in 0.5s ease both',
        'float':      'float 4s ease-in-out infinite',
        'scale-in':   'scale-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'slide-down': 'slide-down 0.3s ease both',
      },

      // ─── Timing functions fluides ───────────────────────────────────────
      transitionTimingFunction: {
        'clinical': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
      },

      // ─── Espacements éditoriaux supplémentaires ─────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // ─── Largeur maximale du conteneur éditorial ────────────────────────
      maxWidth: {
        'container': '1440px',
        'content':   '1200px',
        'narrow':    '720px',
        'form':      '680px',
      },

      // ─── Backdrop blur pour le glassmorphisme ───────────────────────────
      backdropBlur: {
        'glass': '20px',
      },
    },
  },

  plugins: [
    // ─── Utilitaires CTA gradient & glassmorphisme ──────────────────────
    function ({ addUtilities }) {
      addUtilities({
        // Gradient principal des boutons CTA (135°)
        '.bg-cta-gradient': {
          background: 'linear-gradient(135deg, #00666E 0%, #00818A 100%)',
        },
        '.bg-cta-gradient-hover': {
          background: 'linear-gradient(135deg, #004f55 0%, #006971 100%)',
        },
        // Texte dégradé (pour les accents typographiques)
        '.text-gradient': {
          background:              'linear-gradient(135deg, #15919B 0%, #00818A 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip':       'text',
        },
        // Glassmorphisme (éléments flottants)
        '.glass': {
          background:               'rgba(255, 255, 255, 0.88)',
          'backdrop-filter':        'blur(20px)',
          '-webkit-backdrop-filter':'blur(20px)',
        },
        '.glass-tonal': {
          background:               'rgba(247, 250, 251, 0.85)',
          'backdrop-filter':        'blur(20px)',
          '-webkit-backdrop-filter':'blur(20px)',
        },
      })
    },
  ],
}
