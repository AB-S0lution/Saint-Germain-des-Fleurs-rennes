// Données d'exemple : variétés et calendrier de floraison.
// Réel (cité par la presse) : tulipe, ellébore, anémone, renoncule, pivoine, dahlia, hortensia.
// Tout le reste est plausible pour la Bretagne mais NON vérifié : `origine: 'à confirmer'`.
import { r, TOUTE_ANNEE } from './months'

export type ArtKind = 'rosette' | 'cup' | 'daisy' | 'globe' | 'hellebore' | 'spike' | 'pompon' | 'berry' | 'leaf' | 'umbel'
export type Couleur = 'blanc' | 'rose' | 'rouge' | 'orange' | 'jaune' | 'bleu' | 'violet' | 'vert'

export interface Flower {
  id: string
  nom: string
  mois: number[]
  couleur: Couleur
  kind: ArtKind
  /** couleur principale + couleur du cœur (hex) */
  teintes: [string, string]
  vase: string
  origine: 'ferme' | 'à confirmer'
  /** vrai si la fleur est citée dans la presse comme cultivée à la ferme */
  citee: boolean
  note: string
}

export const flowers: Flower[] = [
  { id: 'ellebore', nom: 'Ellébore', mois: r(12, 3), couleur: 'blanc', kind: 'hellebore', teintes: ['#E9E3CF', '#8C9A5B'], vase: '7 à 10 jours', origine: 'ferme', citee: true, note: 'La fleur de l’hiver : elle penche la tête, on la regarde de près.' },
  { id: 'perce-neige', nom: 'Perce-neige', mois: r(1, 2), couleur: 'blanc', kind: 'hellebore', teintes: ['#F6F4EC', '#7C9163'], vase: '4 à 6 jours', origine: 'à confirmer', citee: false, note: 'Petits bouquets de poche, à poser près d’une fenêtre.' },
  { id: 'noisetier', nom: 'Chatons de noisetier', mois: r(1, 2), couleur: 'jaune', kind: 'spike', teintes: ['#C9B45A', '#8B7B3A'], vase: '2 semaines', origine: 'à confirmer', citee: false, note: 'Des branches souples qui donnent de la hauteur aux bouquets d’hiver.' },
  { id: 'anemone', nom: 'Anémone', mois: r(2, 4), couleur: 'violet', kind: 'daisy', teintes: ['#6B3E8C', '#24212B'], vase: '5 à 7 jours', origine: 'ferme', citee: true, note: 'Le cœur sombre et les pétales de soie : une des fleurs du marché de printemps.' },
  { id: 'narcisse', nom: 'Narcisse', mois: r(2, 4), couleur: 'jaune', kind: 'cup', teintes: ['#F1D54A', '#E39A2B'], vase: '5 à 6 jours', origine: 'à confirmer', citee: false, note: 'À mettre dans un vase seul : leur sève abîme les autres tiges.' },
  { id: 'jacinthe', nom: 'Jacinthe', mois: r(3, 4), couleur: 'bleu', kind: 'spike', teintes: ['#7D8FD1', '#4B5CA8'], vase: '6 à 8 jours', origine: 'à confirmer', citee: false, note: 'Un parfum qui remplit la pièce.' },
  { id: 'muscari', nom: 'Muscari', mois: r(3, 4), couleur: 'bleu', kind: 'spike', teintes: ['#4D5FB0', '#2E3A7A'], vase: '5 à 7 jours', origine: 'à confirmer', citee: false, note: 'Des grappes minuscules, très bleues.' },
  { id: 'tulipe', nom: 'Tulipe', mois: r(3, 5), couleur: 'rouge', kind: 'cup', teintes: ['#D1453B', '#F0D27A'], vase: '5 à 8 jours', origine: 'ferme', citee: true, note: 'Elles continuent de pousser dans le vase : laissez-leur de la place.' },
  { id: 'renoncule', nom: 'Renoncule', mois: r(3, 5), couleur: 'orange', kind: 'rosette', teintes: ['#E8703A', '#B4451C'], vase: '7 à 9 jours', origine: 'ferme', citee: true, note: 'Des dizaines de pétales de papier, en rond.' },
  { id: 'fritillaire', nom: 'Fritillaire', mois: r(4, 4), couleur: 'violet', kind: 'hellebore', teintes: ['#8C5B84', '#4C2F4A'], vase: '5 jours', origine: 'à confirmer', citee: false, note: 'La clochette à damier.' },
  { id: 'myosotis', nom: 'Myosotis', mois: r(4, 5), couleur: 'bleu', kind: 'umbel', teintes: ['#8FB1E0', '#F2E27A'], vase: '4 à 5 jours', origine: 'à confirmer', citee: false, note: 'Un nuage bleu pour entourer les tulipes.' },
  { id: 'lilas', nom: 'Lilas', mois: r(4, 5), couleur: 'violet', kind: 'spike', teintes: ['#B79AD0', '#8A6AAE'], vase: '5 à 7 jours', origine: 'à confirmer', citee: false, note: 'Tiges fendues au pied et vase très frais.' },
  { id: 'pivoine', nom: 'Pivoine', mois: r(5, 6), couleur: 'rose', kind: 'rosette', teintes: ['#D88A9A', '#F4CBD2'], vase: '5 à 7 jours', origine: 'ferme', citee: true, note: 'On les achète en bouton et on les regarde s’ouvrir. Mai, juin, pas plus.' },
  { id: 'iris', nom: 'Iris', mois: r(5, 6), couleur: 'violet', kind: 'cup', teintes: ['#6D56B5', '#E8C546'], vase: '4 à 6 jours', origine: 'à confirmer', citee: false, note: 'Une fleur par tige, très graphique.' },
  { id: 'pied-alouette', nom: 'Pied-d’alouette', mois: r(6, 7), couleur: 'bleu', kind: 'spike', teintes: ['#5F7BC4', '#9AB0E6'], vase: '6 à 8 jours', origine: 'à confirmer', citee: false, note: 'La verticale des bouquets d’été.' },
  { id: 'digitale', nom: 'Digitale', mois: r(6, 7), couleur: 'rose', kind: 'spike', teintes: ['#C984A4', '#8C4F6E'], vase: '6 jours', origine: 'à confirmer', citee: false, note: 'Belle mais toxique : à tenir loin des enfants et des animaux.' },
  { id: 'nigelle', nom: 'Nigelle', mois: r(6, 7), couleur: 'bleu', kind: 'daisy', teintes: ['#9FC1E8', '#5E7FB0'], vase: '5 à 6 jours', origine: 'à confirmer', citee: false, note: 'Les fleurs bleues, puis les capsules à sécher.' },
  { id: 'ammi', nom: 'Ammi', mois: r(6, 10), couleur: 'blanc', kind: 'umbel', teintes: ['#F3F1E6', '#C9D2B0'], vase: '6 à 8 jours', origine: 'à confirmer', citee: false, note: 'La dentelle blanche qui aère un bouquet.' },
  { id: 'rose-jardin', nom: 'Rose de jardin', mois: r(6, 9), couleur: 'rose', kind: 'rosette', teintes: ['#E7A9B0', '#C8707F'], vase: '5 à 7 jours', origine: 'à confirmer', citee: false, note: 'Parfumée, pas toujours droite, jamais ennuyeuse.' },
  { id: 'gypsophile', nom: 'Gypsophile', mois: r(6, 8), couleur: 'blanc', kind: 'umbel', teintes: ['#FBFAF4', '#E5E8D6'], vase: '7 jours', origine: 'à confirmer', citee: false, note: 'Se sèche très bien.' },
  { id: 'lavande', nom: 'Lavande', mois: r(6, 7), couleur: 'violet', kind: 'spike', teintes: ['#8F7BC2', '#6A56A0'], vase: '10 jours', origine: 'à confirmer', citee: false, note: 'Fraîche ou séchée, elle reste parfumée.' },
  { id: 'hortensia', nom: 'Hortensia', mois: r(7, 10), couleur: 'bleu', kind: 'globe', teintes: ['#6C7FB0', '#B9C5E4'], vase: '7 à 10 jours', origine: 'ferme', citee: true, note: 'La spécialité de la ferme. Frais en été, séché en automne.' },
  { id: 'dahlia', nom: 'Dahlia', mois: r(7, 10), couleur: 'rouge', kind: 'pompon', teintes: ['#7A2E3A', '#B5495A'], vase: '5 à 7 jours', origine: 'ferme', citee: true, note: 'Des géométries parfaites, du lie-de-vin au corail.' },
  { id: 'cosmos', nom: 'Cosmos', mois: r(7, 10), couleur: 'rose', kind: 'daisy', teintes: ['#EFA3BC', '#F2D14A'], vase: '5 jours', origine: 'à confirmer', citee: false, note: 'Légers, ils bougent au moindre courant d’air.' },
  { id: 'zinnia', nom: 'Zinnia', mois: r(7, 10), couleur: 'orange', kind: 'pompon', teintes: ['#F08A3C', '#C5521E'], vase: '7 à 9 jours', origine: 'à confirmer', citee: false, note: 'Des couleurs franches, très durables.' },
  { id: 'tournesol', nom: 'Tournesol', mois: r(7, 9), couleur: 'jaune', kind: 'daisy', teintes: ['#F2B91F', '#4A3320'], vase: '6 à 8 jours', origine: 'à confirmer', citee: false, note: 'Variétés sans pollen, pour ne pas tacher la nappe.' },
  { id: 'phlox', nom: 'Phlox', mois: r(7, 8), couleur: 'rose', kind: 'umbel', teintes: ['#E08BB2', '#B3548A'], vase: '5 à 7 jours', origine: 'à confirmer', citee: false, note: 'Parfumé le soir.' },
  { id: 'agapanthe', nom: 'Agapanthe', mois: r(7, 8), couleur: 'bleu', kind: 'umbel', teintes: ['#5B76C2', '#8FA5DD'], vase: '8 à 10 jours', origine: 'à confirmer', citee: false, note: 'Une grosse ombelle pour un grand vase.' },
  { id: 'souci', nom: 'Souci', mois: r(6, 10), couleur: 'orange', kind: 'daisy', teintes: ['#F29A2E', '#C9701B'], vase: '5 à 7 jours', origine: 'à confirmer', citee: false, note: 'Une fleur de jardin de campagne.' },
  { id: 'rudbeckia', nom: 'Rudbeckia', mois: r(8, 10), couleur: 'jaune', kind: 'daisy', teintes: ['#EDB021', '#5A3A1C'], vase: '7 jours', origine: 'à confirmer', citee: false, note: 'Le soleil de la fin d’été.' },
  { id: 'amarante', nom: 'Amarante', mois: r(8, 10), couleur: 'rouge', kind: 'spike', teintes: ['#8F2A3E', '#5E1A2A'], vase: '8 à 10 jours', origine: 'à confirmer', citee: false, note: 'Des chenilles de velours, qui se sèchent bien.' },
  { id: 'aster', nom: 'Aster', mois: r(9, 10), couleur: 'violet', kind: 'daisy', teintes: ['#9A7FD0', '#F0D04A'], vase: '7 jours', origine: 'à confirmer', citee: false, note: 'Les dernières fleurs de l’automne.' },
  { id: 'chrysantheme', nom: 'Chrysanthème', mois: r(10, 11), couleur: 'jaune', kind: 'pompon', teintes: ['#E7B54A', '#C28A1E'], vase: '14 jours', origine: 'à confirmer', citee: false, note: 'Une fleur de la Toussaint, qui tient longtemps.' },
  { id: 'sedum', nom: 'Sedum', mois: r(9, 11), couleur: 'rose', kind: 'umbel', teintes: ['#B8667A', '#8E4558'], vase: '10 jours', origine: 'à confirmer', citee: false, note: 'Un rose cuivré, tout en volume.' },
  { id: 'physalis', nom: 'Physalis', mois: r(9, 12), couleur: 'orange', kind: 'berry', teintes: ['#E98A2A', '#B4561A'], vase: 'plusieurs semaines', origine: 'à confirmer', citee: false, note: 'Les lanternes se gardent sèches tout l’hiver.' },
  { id: 'cotoneaster', nom: 'Baies de cotonéaster', mois: r(10, 1), couleur: 'rouge', kind: 'berry', teintes: ['#C4382E', '#7C1F1A'], vase: '2 semaines', origine: 'à confirmer', citee: false, note: 'Des branches de baies pour les bouquets d’hiver.' },
  { id: 'eucalyptus', nom: 'Eucalyptus', mois: TOUTE_ANNEE, couleur: 'vert', kind: 'leaf', teintes: ['#8FA897', '#5E7B6A'], vase: '2 à 3 semaines', origine: 'à confirmer', citee: false, note: 'Feuillage d’appoint, présent toute l’année.' },
  { id: 'fougere', nom: 'Fougère', mois: r(4, 10), couleur: 'vert', kind: 'leaf', teintes: ['#6B8F4E', '#476B32'], vase: '7 jours', origine: 'à confirmer', citee: false, note: 'Du vert profond pour calmer les couleurs vives.' },
  { id: 'lierre', nom: 'Lierre fleuri', mois: r(10, 12), couleur: 'vert', kind: 'umbel', teintes: ['#9AA46B', '#5E6F4E'], vase: '2 semaines', origine: 'à confirmer', citee: false, note: 'Les ombelles de lierre, très appréciées des insectes.' },
  { id: 'houx', nom: 'Houx', mois: r(11, 1), couleur: 'rouge', kind: 'berry', teintes: ['#B93028', '#2F4A2E'], vase: '3 semaines', origine: 'à confirmer', citee: false, note: 'Pour les couronnes et les tables de décembre.' },
]

export const flowerById = (id: string): Flower => {
  const f = flowers.find((x) => x.id === id)
  if (!f) throw new Error(`Fleur inconnue : ${id}`)
  return f
}
