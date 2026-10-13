// Données d'exemple : tiges proposées par « Composer à la tige ».
// La disponibilité suit le calendrier de `flowers.ts` ; les prix à la tige sont des exemples.
import { flowerById } from './flowers'

export interface ComposerStem {
  id: string
  fleur: string
  /** prix d'exemple à la tige, en euros */
  prix: number
  /** nombre de tiges conseillé par bouquet */
  conseil: number
}

const s = (fleur: string, prix: number, conseil = 3): ComposerStem => ({ id: `tige-${fleur}`, fleur, prix, conseil })

export const composerStems: ComposerStem[] = [
  s('ellebore', 2.2), s('anemone', 1.6, 5), s('tulipe', 1.2, 7), s('renoncule', 1.8, 5), s('pivoine', 4.5, 3),
  s('iris', 2.4), s('pied-alouette', 2.2), s('ammi', 1.4, 5), s('rose-jardin', 3.2), s('lavande', 1.5, 5),
  s('hortensia', 6.5, 1), s('dahlia', 3.4, 3), s('cosmos', 1.1, 5), s('zinnia', 1.6, 5), s('tournesol', 2.8, 2),
  s('rudbeckia', 1.8, 3), s('amarante', 2.0), s('aster', 1.5), s('chrysantheme', 2.0), s('sedum', 2.4),
  s('physalis', 2.2), s('cotoneaster', 2.4, 2), s('eucalyptus', 1.8, 3), s('fougere', 1.2, 3),
]

export const stemFlower = (st: ComposerStem) => flowerById(st.fleur)
