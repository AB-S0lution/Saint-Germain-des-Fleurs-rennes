// Plan du site : chaque entrée correspond à un fichier HTML à la racine.
export interface PageDef {
  id: string
  file: string
  label: string
  court?: string
  desc: string
}

export const PAGES: PageDef[] = [
  { id: 'accueil', file: 'index.html', label: 'Accueil', desc: 'Fleuriste à Rennes, place Saint-Germain : fleurs locales de saison, de la ferme de Plouézec à la boutique.' },
  { id: 'histoire', file: 'histoire.html', label: 'Notre histoire', desc: 'Du bûcheron devenu horticulteur au marché des Lices, puis à la boutique ouverte le 17 mai 2020.' },
  { id: 'ferme', file: 'ferme.html', label: 'La ferme', desc: 'La Ferme aux Mille Fleurs à Plouézec : 5 hectares, un tunnel, aucun intrant chimique.' },
  { id: 'route', file: 'route.html', label: 'La route', desc: 'Le trajet d’une tige, de Plouézec à la place Saint-Germain, en cinq étapes.' },
  { id: 'saisons', file: 'saisons.html', label: 'Fleurs de saison', court: 'Saisons', desc: 'Le calendrier des fleurs, mois par mois, et l’index des variétés.' },
  { id: 'bouquets', file: 'bouquets.html', label: 'Bouquets et créations', court: 'Bouquets', desc: 'Catalogue d’exemple de bouquets, filtrable par saison, couleur, occasion et prix indicatif.' },
  { id: 'composer', file: 'composer.html', label: 'Composer votre bouquet', court: 'Composer', desc: 'Composez un bouquet avec les tiges de saison, puis envoyez votre commande par mail ou téléphone.' },
  { id: 'seches', file: 'seches.html', label: 'Fleurs séchées et couronnes', court: 'Séchées', desc: 'Bouquets, bottes et couronnes de fleurs séchées.' },
  { id: 'occasions', file: 'occasions.html', label: 'Occasions', desc: 'Fête des mères, anniversaires, naissances, ou juste pour faire du bien.' },
  { id: 'marches', file: 'marches.html', label: 'Les marchés', desc: 'Marché des Lices, marché de Paimpol, vente à la ferme : jours et horaires à confirmer.' },
  { id: 'journal', file: 'journal.html', label: 'Journal', desc: 'Notes de saison, conseils d’entretien et nouvelles de la ferme.' },
  { id: 'galerie', file: 'galerie.html', label: 'Galerie « Chez vous ! »', court: 'Galerie', desc: 'Des bouquets chez vous : illustrations d’exemple.' },
  { id: 'faq', file: 'faq.html', label: 'Questions fréquentes', court: 'FAQ', desc: 'Commander, retirer, entretenir : les réponses.' },
  { id: 'contact', file: 'contact.html', label: 'Contact et commande', court: 'Contact', desc: 'Téléphone, mail, horaires et plan : commandez par téléphone ou par mail.' },
  { id: 'mentions', file: 'mentions.html', label: 'Mentions légales', desc: 'Mentions légales du site de démonstration.' },
  { id: 'confidentialite', file: 'confidentialite.html', label: 'Confidentialité', desc: 'Aucune donnée personnelle collectée par ce site.' },
]

export const pageById = (id: string): PageDef => PAGES.find((p) => p.id === id) ?? PAGES[0]
export const NAV_PRIMARY = ['saisons', 'bouquets', 'composer', 'route', 'contact']
