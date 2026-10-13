// Données d'exemple : galerie « Chez vous ! ». Illustrations originales générées en SVG,
// légendes génériques : ce ne sont pas des photos de clients.
export interface GalleryItem {
  id: string
  legende: string
  lieu: 'rebord de fenêtre' | 'commode' | 'table' | 'cheminée' | 'entrée' | 'étagère'
  fleurs: string[]
  vase: 'pichet' | 'bouteille' | 'bocal' | 'cruche' | 'verre'
  ratio: 'portrait' | 'carre' | 'paysage'
  graine: number
}

const g = (id: string, legende: string, lieu: GalleryItem['lieu'], fleurs: string[], vase: GalleryItem['vase'], ratio: GalleryItem['ratio'], graine: number): GalleryItem => ({ id, legende, lieu, fleurs, vase, ratio, graine })

export const gallery: GalleryItem[] = [
  g('g1', 'Dahlias lie-de-vin sur un rebord de fenêtre', 'rebord de fenêtre', ['dahlia', 'amarante'], 'pichet', 'portrait', 11),
  g('g2', 'Hortensias bleus dans une cruche', 'table', ['hortensia'], 'cruche', 'carre', 12),
  g('g3', 'Pivoines en bouton sur la commode', 'commode', ['pivoine', 'ammi'], 'bocal', 'portrait', 13),
  g('g4', 'Tulipes dans une bouteille', 'étagère', ['tulipe'], 'bouteille', 'portrait', 14),
  g('g5', 'Anémones et muscari dans un verre', 'rebord de fenêtre', ['anemone', 'muscari'], 'verre', 'carre', 15),
  g('g6', 'Un gros bouquet de cosmos sur la table', 'table', ['cosmos', 'ammi', 'fougere'], 'pichet', 'paysage', 16),
  g('g7', 'Hortensias séchés sur la cheminée', 'cheminée', ['hortensia', 'lavande'], 'cruche', 'paysage', 17),
  g('g8', 'Branches de noisetier à l’entrée', 'entrée', ['noisetier', 'ellebore'], 'cruche', 'portrait', 18),
  g('g9', 'Renoncules orange dans un bocal', 'table', ['renoncule'], 'bocal', 'carre', 19),
  g('g10', 'Tournesols dans un seau', 'entrée', ['tournesol', 'rudbeckia'], 'cruche', 'portrait', 20),
  g('g11', 'Lavande séchée dans un verre', 'étagère', ['lavande'], 'verre', 'carre', 21),
  g('g12', 'Dahlias roses, cuisine du matin', 'table', ['dahlia', 'cosmos'], 'pichet', 'paysage', 22),
  g('g13', 'Un bouquet de lilas dans un grand pot', 'entrée', ['lilas'], 'cruche', 'portrait', 23),
  g('g14', 'Roses de jardin sur la commode', 'commode', ['rose-jardin', 'phlox'], 'pichet', 'carre', 24),
  g('g15', 'Physalis et amarante séchés', 'cheminée', ['physalis', 'amarante'], 'bouteille', 'portrait', 25),
  g('g16', 'Zinnias de fin d’été', 'rebord de fenêtre', ['zinnia', 'tournesol'], 'bocal', 'paysage', 26),
  g('g17', 'Ellébores sur l’étagère', 'étagère', ['ellebore'], 'verre', 'carre', 27),
  g('g18', 'Myosotis et fougère', 'table', ['myosotis', 'fougere'], 'bocal', 'carre', 28),
  g('g19', 'Chrysanthèmes de la Toussaint', 'entrée', ['chrysantheme'], 'cruche', 'portrait', 29),
  g('g20', 'Asters et rudbeckias sur la table', 'table', ['aster', 'rudbeckia'], 'pichet', 'paysage', 30),
  g('g21', 'Gypsophile en nuage', 'commode', ['gypsophile'], 'bouteille', 'portrait', 31),
  g('g22', 'Houx et baies pour décembre', 'cheminée', ['houx', 'cotoneaster'], 'cruche', 'paysage', 32),
  g('g23', 'Agapanthe dans un grand vase', 'table', ['agapanthe'], 'cruche', 'portrait', 33),
  g('g24', 'Sedum et dahlias roses', 'étagère', ['sedum', 'dahlia'], 'pichet', 'carre', 34),
]
