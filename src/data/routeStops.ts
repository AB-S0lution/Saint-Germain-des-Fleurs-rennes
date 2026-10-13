// Données d'exemple : étapes de « La route ». Les lieux sont réels ; les textes et horaires de la journée sont des exemples.
export interface RouteStop {
  id: string
  lieu: string
  moment: string
  titre: string
  texte: string
  etiquette: string
  /** fraction (0 à 1) de la route, utilisée pour placer l'étape */
  t: number
  aConfirmer: boolean
}

export const routeStops: RouteStop[] = [
  { id: 'ferme', lieu: 'Plouézec', moment: 'Avant l’aube', titre: 'On coupe au champ', texte: 'Sur la côte du Goëlo, entre le moulin de Craca et Port-Lazo, les tiges sont coupées à la fraîcheur du matin, puis mises dans l’eau.', etiquette: 'Plouézec, 22', t: 0.04, aConfirmer: false },
  { id: 'paimpol', lieu: 'Paimpol', moment: 'Mardi, matin', titre: 'Le mardi, Paimpol', texte: 'Le marché de Paimpol est cité par la presse comme un rendez-vous du mardi. Jour et heures sont à confirmer.', etiquette: 'Paimpol, mardi', t: 0.28, aConfirmer: true },
  { id: 'route', lieu: 'La route', moment: 'Le trajet', titre: 'Les seaux à l’arrière', texte: 'Les tiges voyagent debout, dans l’eau, loin du soleil. Elles ne font pas escale : la fraîcheur est la seule règle.', etiquette: 'En route', t: 0.52, aConfirmer: false },
  { id: 'lices', lieu: 'Rennes, marché des Lices', moment: 'Samedi, matin', titre: 'Le samedi, les Lices', texte: 'Les fleurs de Plouézec sont connues sur le grand marché des Lices. Jour et heures sont à confirmer.', etiquette: 'Les Lices, samedi', t: 0.76, aConfirmer: true },
  { id: 'boutique', lieu: '4 place Saint-Germain', moment: 'En fin de journée', titre: 'Sur le comptoir', texte: 'Derrière l’église, la boutique est petite mais déborde de fleurs. C’est ici que le bouquet se compose, ou se choisit tout fait.', etiquette: 'Place Saint-Germain', t: 0.97, aConfirmer: false },
]
