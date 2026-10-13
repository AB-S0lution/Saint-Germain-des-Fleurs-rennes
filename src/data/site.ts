// Faits RÉELS et vérifiés (sources : voir PLAN.md §1). Ne modifier qu'avec une source.
export const SITE = {
  nom: 'Saint Germain des Fleurs',
  slogan: 'Fleurs locales de saison',
  adresse: { rue: '4 place Saint-Germain', cp: '35000', ville: 'Rennes' },
  tel: '07 84 87 20 23',
  telHref: 'tel:+33784872023',
  email: 'saintgermaindesfleurs@gmail.com',
  instagram: 'saintgermaindesfleurs',
  instagramUrl: 'https://www.instagram.com/saintgermaindesfleurs/',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=4+place+Saint-Germain+35000+Rennes',
  ouverture: '17 mai 2020',
  ferme: { nom: 'La Ferme aux Mille Fleurs', lieu: 'Plouézec (Côtes-d’Armor)' },
} as const

export interface HoursRow {
  jour: string
  /** 0 = dimanche (convention Date.getDay) */
  idx: number
  ouvert: boolean
  debut?: string
  fin?: string
  note?: string
}

/** Horaires relevés sur Instagram (@saintgermaindesfleurs) et Blooms.fr. Dimanche absent d'une source : à confirmer. */
export const hours: HoursRow[] = [
  { jour: 'Lundi', idx: 1, ouvert: false },
  { jour: 'Mardi', idx: 2, ouvert: true, debut: '10:00', fin: '19:00' },
  { jour: 'Mercredi', idx: 3, ouvert: true, debut: '10:00', fin: '19:00' },
  { jour: 'Jeudi', idx: 4, ouvert: true, debut: '10:00', fin: '19:00' },
  { jour: 'Vendredi', idx: 5, ouvert: true, debut: '10:00', fin: '19:00' },
  { jour: 'Samedi', idx: 6, ouvert: true, debut: '09:00', fin: '19:00' },
  { jour: 'Dimanche', idx: 0, ouvert: true, debut: '10:00', fin: '13:00', note: 'à confirmer' },
]

export interface PressQuote {
  texte: string
  source: string
  date?: string
  url: string
  note?: string
}

/** Citations de presse RÉELLES, attribuées à leur source. */
export const press: PressQuote[] = [
  { texte: 'De très jolis bouquets et ce qui ne gâche rien des prix très abordables !', source: 'France Bleu Armorique', url: 'https://www.facebook.com/francebleuarmorique/videos/o%C3%B9-trouver-des-fleurs-bretonnes/723406814196182', note: 'Extrait d’une vidéo Facebook ; à revérifier.' },
  { texte: 'Des créations exclusives, à la fois simples, naturelles et splendides.', source: 'Unidivers', date: 'octobre 2020', url: 'https://unidivers.fr/saint-germain-des-fleurs-fleuriste-rennes/' },
  { texte: 'L’espace est petit mais déborde de fleurs.', source: 'Unidivers', date: 'octobre 2020', url: 'https://unidivers.fr/saint-germain-des-fleurs-fleuriste-rennes/' },
  { texte: 'Les fleurs de Plouézec sont bien connues sur le grand marché des Lices.', source: 'actu.fr', url: 'https://actu.fr/bretagne/plouezec_22214/a-plouezec-la-ferme-aux-mille-fleurs-ouvre-ses-portes-tous-les-jeudis_58915612.html' },
]

export interface Stat {
  valeur: string
  etiquette: string
  detail: string
}

/** Chiffres réels uniquement. */
export const stats: Stat[] = [
  { valeur: '5 ha', etiquette: 'cultivés à Plouézec', detail: 'La ferme aux Mille Fleurs, côté Goëlo.' },
  { valeur: '2020', etiquette: 'ouverture de la boutique', detail: 'Le 17 mai, quand les marchés fermaient.' },
  { valeur: '0', etiquette: 'intrant chimique', detail: 'Sans aucun intrant chimique, selon actu.fr.' },
  { valeur: '1', etiquette: 'tunnel, pas de serre chauffée', detail: 'Les fleurs poussent à la saison.' },
]

export const ratingBlooms = { note: 4.5, sur: 5, avis: '50 et plus', source: 'Blooms.fr' }
