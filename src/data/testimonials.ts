// Données d'exemple : témoignages GÉNÉRIQUES (aucun avis réel collecté). Jamais de nom propre.
export interface Testimonial {
  id: string
  texte: string
  auteur: string
  contexte: string
}

export const testimonials: Testimonial[] = [
  { id: 't1', texte: 'Un bouquet simple, naturel, qui ressemble à ce qu’on voit au marché. Il a tenu plus d’une semaine.', auteur: 'Client·e fidèle', contexte: 'Bouquet du marché' },
  { id: 't2', texte: 'On a appelé le matin, c’était prêt à midi. Les pivoines se sont ouvertes le lendemain.', auteur: 'Client·e fidèle', contexte: 'Commande par téléphone' },
  { id: 't3', texte: 'La boutique est minuscule et pleine de seaux. On y vient aussi pour le plaisir d’y entrer.', auteur: 'Client·e de passage', contexte: 'Visite en boutique' },
  { id: 't4', texte: 'Des hortensias séchés qui sont toujours beaux six mois plus tard.', auteur: 'Client·e fidèle', contexte: 'Fleurs séchées' },
  { id: 't5', texte: 'J’ai donné mon budget, et on m’a composé quelque chose de très juste.', auteur: 'Client·e fidèle', contexte: 'Composition sur mesure' },
  { id: 't6', texte: 'On sent qu’il y a une vraie saison derrière chaque bouquet.', auteur: 'Client·e fidèle', contexte: 'Bouquet de saison' },
  { id: 't7', texte: 'Un petit bouquet pour dire merci, emballé dans du kraft, parfait.', auteur: 'Client·e de passage', contexte: 'Petit cadeau' },
  { id: 't8', texte: 'La couronne de lavande parfume toute l’entrée.', auteur: 'Client·e fidèle', contexte: 'Couronne séchée' },
]
