// Données d'exemple : plantes et plants de la ferme. Le fait que la ferme produise feuillages,
// plantes en pot et plants de légumes est réel (actu.fr) ; leur présence en boutique et les prix ne le sont pas.
export interface Plant {
  id: string
  nom: string
  desc: string
  type: 'plante en pot' | 'plant de légume' | 'feuillage'
  saison: number[]
  prix: number
  entretien: string
}

export const plants: Plant[] = [
  { id: 'plant-tomate', nom: 'Plants de tomates anciennes', desc: 'Variétés rustiques, à planter après les saints de glace.', type: 'plant de légume', saison: [4, 5, 6], prix: 3.5, entretien: 'Soleil, tuteur, arrosage au pied.' },
  { id: 'plant-courgette', nom: 'Plants de courgettes', desc: 'Un plant suffit pour une famille.', type: 'plant de légume', saison: [5, 6], prix: 3, entretien: 'Beaucoup de place et d’eau.' },
  { id: 'plant-salade', nom: 'Plants de salades', desc: 'Laitues et batavias, par barquette.', type: 'plant de légume', saison: [3, 4, 5, 9], prix: 2.5, entretien: 'Mi-ombre en été.' },
  { id: 'hortensia-pot', nom: 'Hortensia en pot', desc: 'Un hortensia de la ferme, prêt pour la terrasse.', type: 'plante en pot', saison: [4, 5, 6, 7], prix: 18, entretien: 'Eau de pluie, mi-ombre.' },
  { id: 'dahlia-tubercule', nom: 'Dahlias en pot', desc: 'Pour le balcon, avec des fleurs jusqu’aux gelées.', type: 'plante en pot', saison: [5, 6, 7, 8], prix: 9, entretien: 'Soleil, coupe des fleurs fanées.' },
  { id: 'pivoine-pot', nom: 'Pivoine en pot', desc: 'À planter à l’automne pour fleurir l’année suivante.', type: 'plante en pot', saison: [10, 11], prix: 22, entretien: 'Ne pas planter trop profond.' },
  { id: 'aromatiques', nom: 'Aromatiques en godet', desc: 'Thym, persil, ciboulette, menthe.', type: 'plante en pot', saison: [4, 5, 6, 7, 8, 9], prix: 3.8, entretien: 'Fenêtre claire.' },
  { id: 'feuillage-eucalyptus', nom: 'Eucalyptus (branches)', desc: 'Branches coupées pour vos propres bouquets.', type: 'feuillage', saison: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], prix: 6, entretien: 'Vase d’eau fraîche.' },
  { id: 'feuillage-fougere', nom: 'Fougères (bottes)', desc: 'Pour les bouquets verts.', type: 'feuillage', saison: [4, 5, 6, 7, 8, 9, 10], prix: 5, entretien: 'Garder au frais.' },
  { id: 'feuillage-houx', nom: 'Houx et lierre (branches)', desc: 'Pour les couronnes et les tables d’hiver.', type: 'feuillage', saison: [11, 12, 1], prix: 7, entretien: 'Ne craint pas le froid.' },
]
