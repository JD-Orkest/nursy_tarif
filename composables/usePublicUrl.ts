/**
 * usePublicUrl — Préfixe un chemin d'asset public avec le baseURL de l'app.
 *
 * En développement   : baseURL = '/'         → /logo.svg
 * Sur GitHub Pages   : baseURL = '/nursy_tarif/' → /nursy_tarif/logo.svg
 *
 * Usage :
 *   const logoUrl = usePublicUrl('logo.svg')
 *   <img :src="logoUrl" />
 */
export const usePublicUrl = (path: string): string => {
  const { app } = useRuntimeConfig()
  const base = (app.baseURL ?? '/').replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${cleanPath}`
}
