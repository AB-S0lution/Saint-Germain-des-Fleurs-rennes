// Données d'exemple : fleurs séchées et couronnes. Prix indicatifs, non communiqués.
export interface Dried {
  id: string
  nom: string
  desc: string
  type: 'couronne' | 'bouquet' | 'botte' | 'suspension'
  diametre?: string
  fleurs: string[]
  prix: number
  teinte: string
}

export const dried: Dried[] = [
  { id: 'couronne-hortensia', nom: 'Couronne d’hortensias', desc: 'Une couronne de porte tressée sur un cercle de saule, couverte d’hortensias séchés bleus et gris.', type: 'couronne', diametre: '35 cm', fleurs: ['hortensia', 'eucalyptus'], prix: 55, teinte: '#6C7FB0' },
  { id: 'couronne-lavande', nom: 'Couronne de lavande', desc: 'Lavande séchée et gypsophile sur un anneau de paille : elle parfume l’entrée.', type: 'couronne', diametre: '28 cm', fleurs: ['lavande', 'gypsophile'], prix: 48, teinte: '#8F7BC2' },
  { id: 'couronne-baies', nom: 'Couronne d’hiver aux baies', desc: 'Houx, baies et physalis séchés, pour décembre et janvier.', type: 'couronne', diametre: '40 cm', fleurs: ['houx', 'physalis', 'cotoneaster'], prix: 62, teinte: '#B93028' },
  { id: 'couronne-ble', nom: 'Couronne prairie', desc: 'Herbes, nigelles et ammi séchés, sur une base naturelle.', type: 'couronne', diametre: '32 cm', fleurs: ['nigelle', 'ammi'], prix: 46, teinte: '#C9A27E' },
  { id: 'couronne-table', nom: 'Couronne de table', desc: 'Une couronne basse, pour poser une bougie au centre.', type: 'couronne', diametre: '25 cm', fleurs: ['amarante', 'physalis'], prix: 42, teinte: '#E98A2A' },
  { id: 'bouquet-hortensia-sec', nom: 'Bouquet d’hortensias séchés', desc: 'Cinq têtes séchées à l’air dans la grange, à poser sans eau.', type: 'bouquet', fleurs: ['hortensia'], prix: 28, teinte: '#6C7FB0' },
  { id: 'bouquet-amarante', nom: 'Gerbe d’amarante', desc: 'Des chenilles lie-de-vin séchées, pour un bouquet de cheminée.', type: 'bouquet', fleurs: ['amarante'], prix: 22, teinte: '#7A2E3A' },
  { id: 'bouquet-nuage', nom: 'Nuage de gypsophile', desc: 'Un nuage blanc, léger, parfait en décoration de mariage ou de table.', type: 'bouquet', fleurs: ['gypsophile'], prix: 18, teinte: '#F3F1E6' },
  { id: 'botte-lavande', nom: 'Botte de lavande', desc: 'Liée au raphia, à glisser dans une armoire.', type: 'botte', fleurs: ['lavande'], prix: 14, teinte: '#8F7BC2' },
  { id: 'botte-nigelle', nom: 'Botte de nigelles', desc: 'Les capsules à rayures, séchées pour les bouquets d’hiver.', type: 'botte', fleurs: ['nigelle'], prix: 12, teinte: '#9FC1E8' },
  { id: 'botte-rudbeckia', nom: 'Botte de rudbeckias', desc: 'Les cœurs bruns, séchés, qui gardent leur forme.', type: 'botte', fleurs: ['rudbeckia'], prix: 13, teinte: '#5A3A1C' },
  { id: 'suspension-murale', nom: 'Suspension murale', desc: 'Une grosse botte à accrocher au mur, tête en bas, comme au séchoir.', type: 'suspension', fleurs: ['hortensia', 'lavande', 'amarante'], prix: 38, teinte: '#B8667A' },
  { id: 'suspension-cerceau', nom: 'Cerceau fleuri', desc: 'Un cerceau de métal habillé de fleurs séchées, pour un lit ou une fenêtre.', type: 'suspension', diametre: '45 cm', fleurs: ['gypsophile', 'nigelle', 'physalis'], prix: 68, teinte: '#C9A27E' },
  { id: 'suspension-physalis', nom: 'Guirlande de physalis', desc: 'Une guirlande de lanternes orange sur un fil, 1,2 mètre.', type: 'suspension', fleurs: ['physalis'], prix: 24, teinte: '#E98A2A' },
]
