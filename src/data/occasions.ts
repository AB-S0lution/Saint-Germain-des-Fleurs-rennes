// Données d'exemple : occasions. `confirmed: false` = service NON confirmé par la boutique,
// affiché uniquement comme « sur demande ».
import { r } from './months'

export interface OccasionItem {
  id: string
  titre: string
  accroche: string
  texte: string
  moisFort: number[]
  suggestions: string[]
  confirmed: boolean
  /** Slug d'une photo d'illustration de src/data/photos.ts. */
  photo: string
}

export const occasions: OccasionItem[] = [
  { id: 'fete-des-meres', photo: 'oeillets-vase', titre: 'Fête des mères', accroche: 'Un bouquet de pivoines, de saison, de chez nous.', texte: 'Fin mai, les pivoines sont en pleine saison. Pour la fête des mères, nous vous conseillons de commander quelques jours avant, par téléphone ou par mail, et de choisir un retrait en boutique.', moisFort: [5], suggestions: ['pivoines-douest', 'douceur-de-mai', 'dimanche-matin'], confirmed: true },
  { id: 'anniversaire', photo: 'orange-vase', titre: 'Anniversaires', accroche: 'Un bouquet qui ressemble à la personne.', texte: 'Dites-nous un prénom, une couleur préférée, un budget : nous composons avec ce qui est ouvert cette semaine.', moisFort: r(1, 12), suggestions: ['place-saint-germain', 'mille-fleurs', 'granit-rose'], confirmed: true },
  { id: 'naissance', photo: 'pavots-ambre', titre: 'Naissances', accroche: 'Des teintes douces, sans parfum trop fort.', texte: 'Un petit bouquet clair pour la maternité ou pour le retour à la maison. Pensez à demander des fleurs sans parfum fort.', moisFort: r(1, 12), suggestions: ['maree-basse', 'seche-nuage', 'brume-de-paimpol'], confirmed: true },
  { id: 'merci', photo: 'etagere-bouquet', titre: 'Juste pour faire du bien', accroche: 'Les fleurs ne sont pas un service primaire, mais elles font du bien.', texte: 'Un mardi, un jeudi, sans raison : un petit bouquet de saison, emballé dans du kraft, qui tient dans un sac.', moisFort: r(1, 12), suggestions: ['rue-de-corbin', 'tige-seule', 'premier-jeudi'], confirmed: true },
  { id: 'remerciements', photo: 'boutique-pleine', titre: 'Remerciements et invitations', accroche: 'Arriver chez des amis avec quelque chose de vivant.', texte: 'Un bouquet prêt à emporter à glisser dans le vase de vos hôtes, sans qu’ils aient à le préparer.', moisFort: r(1, 12), suggestions: ['bouquet-du-marche', 'granit-rose', 'brume-de-paimpol'], confirmed: true },
  { id: 'chez-vous', photo: 'centre-table', titre: 'Pour la maison', accroche: 'Chez vous !', texte: 'Le rendez-vous des bouquets vus chez nos clients : une branche sur la commode, une botte sur le rebord de fenêtre.', moisFort: r(1, 12), suggestions: ['goelo', 'ardoise', 'toussaint'], confirmed: true },
  { id: 'mariage', photo: 'bouquet-blanc-violet', titre: 'Mariage', accroche: 'Sur demande : nous contacter.', texte: 'Nous n’avons pas confirmé de prestation de mariage sur ce site. Si vous avez un projet, écrivez-nous ou appelez-nous pour en parler.', moisFort: r(5, 9), suggestions: [], confirmed: false },
  { id: 'deuil', photo: 'sechees-blanches', titre: 'Deuil', accroche: 'Sur demande : nous contacter.', texte: 'Pour une demande de gerbe ou de composition, appelez directement la boutique : nous ne proposons pas de gamme en ligne.', moisFort: r(1, 12), suggestions: [], confirmed: false },
  { id: 'abonnements-ateliers', photo: 'bouquets-etal', titre: 'Abonnements et ateliers', accroche: 'Sur demande : nous contacter.', texte: 'Abonnements de bouquets et ateliers ne sont pas confirmés à ce jour. Si l’idée vous intéresse, dites-le-nous.', moisFort: [], suggestions: [], confirmed: false },
]
