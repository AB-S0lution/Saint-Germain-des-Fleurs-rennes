// Données d'exemple : questions fréquentes. Les réponses sur la livraison, les prix et les
// délais restent volontairement prudentes (non communiquées par la boutique).
export interface Faq {
  id: string
  q: string
  a: string
  cat: 'commander' | 'fleurs' | 'entretien' | 'boutique'
}

export const faq: Faq[] = [
  { id: 'commander', cat: 'commander', q: 'Comment commander un bouquet ?', a: 'Par téléphone au 07 84 87 20 23 ou par mail à saintgermaindesfleurs@gmail.com. Le site ne prend pas de paiement : il vous aide à préparer votre message.' },
  { id: 'retrait', cat: 'commander', q: 'Puis-je retirer ma commande en boutique ?', a: 'Oui, au 4 place Saint-Germain. Indiquez le jour et l’heure souhaités à la commande.' },
  { id: 'livraison', cat: 'commander', q: 'Faites-vous de la livraison ?', a: 'La boutique mentionne la livraison, mais la zone et les frais ne sont pas communiqués sur ce site. Posez la question à la commande.' },
  { id: 'prix', cat: 'commander', q: 'Quels sont les prix ?', a: 'Les prix affichés sur ce site sont des exemples. Les prix réels sont à demander à la boutique.' },
  { id: 'delai', cat: 'commander', q: 'Combien de temps à l’avance faut-il commander ?', a: 'Pour un bouquet du jour, un coup de téléphone suffit. Pour une date particulière (fête des mères), prévoyez quelques jours.' },
  { id: 'saison', cat: 'fleurs', q: 'Pourquoi ne trouve-t-on pas toutes les fleurs toute l’année ?', a: 'Nous vendons les fleurs de saison. Les tiges hors saison sont grisées dans « Composer à la tige », avec le mois de leur retour.' },
  { id: 'local', cat: 'fleurs', q: 'D’où viennent les fleurs ?', a: 'La boutique est la boutique de ville d’une ferme florale à Plouézec (Côtes-d’Armor). Certaines variétés viennent de la ferme, les autres sont à confirmer.' },
  { id: 'intrants', cat: 'fleurs', q: 'Les fleurs sont-elles cultivées sans produits chimiques ?', a: 'La ferme cultive sans aucun intrant chimique et sans serre chauffée (source : actu.fr).' },
  { id: 'seche', cat: 'fleurs', q: 'Vendez-vous des fleurs séchées ?', a: 'Oui : bouquets et couronnes de fleurs séchées, selon la saison.' },
  { id: 'durer', cat: 'entretien', q: 'Comment faire durer mon bouquet ?', a: 'Recoupez les tiges en biais, enlevez les feuilles qui trempent, changez l’eau tous les deux jours et évitez radiateur et courants d’air.' },
  { id: 'pivoine', cat: 'entretien', q: 'Ma pivoine ne s’ouvre pas, que faire ?', a: 'Placez-la dans l’eau tiède, dans une pièce fraîche et lumineuse. Elle s’ouvre en deux à trois jours.' },
  { id: 'horaires', cat: 'boutique', q: 'Quels sont les horaires ?', a: 'Du mardi au vendredi de 10 h à 19 h, le samedi de 9 h à 19 h, le dimanche de 10 h à 13 h (dimanche à confirmer). Fermé le lundi.' },
  { id: 'acces', cat: 'boutique', q: 'Comment venir ?', a: 'Au 4 place Saint-Germain, derrière l’église Saint-Germain. La ligne B du métro s’arrête à la station Saint-Germain. L’entrée est accessible en fauteuil roulant (source : agrégateur, à vérifier).' },
  { id: 'marches', cat: 'boutique', q: 'Où trouver la ferme sur les marchés ?', a: 'Le marché des Lices (samedi) et celui de Paimpol (mardi) sont cités par la presse ; la vente à la ferme le jeudi aussi. Tout est à confirmer.' },
]
