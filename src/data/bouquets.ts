// Données d'exemple : bouquets et créations. Noms, descriptions et PRIX sont des exemples
// (prix indicatifs, non communiqués par la boutique). Aucune disponibilité réelle.
import { r, TOUTE_ANNEE } from './months'
import type { Couleur } from './flowers'

export type Occasion = 'anniversaire' | 'fete-des-meres' | 'naissance' | 'merci' | 'maison' | 'invite'

export interface Bouquet {
  id: string
  nom: string
  desc: string
  fleurs: string[]
  mois: number[]
  prix: number
  couleur: Couleur
  occasions: Occasion[]
  etat: 'frais' | 'sec'
  taille: 'S' | 'M' | 'L'
}

const b = (id: string, nom: string, desc: string, fleurs: string[], mois: number[], prix: number, couleur: Couleur, occasions: Occasion[], taille: 'S' | 'M' | 'L' = 'M', etat: 'frais' | 'sec' = 'frais'): Bouquet =>
  ({ id, nom, desc, fleurs, mois, prix, couleur, occasions, etat, taille })

export const bouquets: Bouquet[] = [
  b('bouquet-du-marche', 'Le bouquet du marché', 'La base de la boutique : ce qui est le plus beau ce matin, lié à la main, sans recette fixe.', ['dahlia', 'cosmos', 'ammi', 'fougere'], r(6, 10), 25, 'rose', ['maison', 'merci'], 'M'),
  b('retour-des-lices', 'Retour des Lices', 'Un bouquet généreux, de ceux qu’on rapporte du marché sous le bras.', ['renoncule', 'anemone', 'myosotis'], r(3, 5), 28, 'orange', ['maison', 'anniversaire'], 'M'),
  b('port-lazo', 'Port-Lazo', 'Bleus de mer et blancs d’écume : hortensia, nigelle et un peu d’eucalyptus.', ['hortensia', 'nigelle', 'eucalyptus'], r(7, 9), 32, 'bleu', ['merci', 'maison'], 'L'),
  b('moulin-de-craca', 'Moulin de Craca', 'Dahlias lie-de-vin et feuillage sombre, pour un intérieur d’automne.', ['dahlia', 'amarante', 'cotoneaster'], r(9, 11), 34, 'rouge', ['anniversaire', 'invite'], 'L'),
  b('goelo', 'Goëlo', 'Hortensias et ammi, une botte simple qui se suffit à elle-même.', ['hortensia', 'ammi'], r(7, 10), 24, 'bleu', ['maison'], 'M'),
  b('premier-jeudi', 'Premier jeudi', 'Tulipes et renoncules en mélange libre, comme dans les seaux de la ferme.', ['tulipe', 'renoncule', 'fougere'], r(3, 5), 22, 'orange', ['maison', 'merci'], 'M'),
  b('place-saint-germain', 'Place Saint-Germain', 'Notre bouquet signature : toujours aux couleurs du mois.', ['dahlia', 'zinnia', 'rudbeckia', 'eucalyptus'], r(8, 10), 38, 'orange', ['anniversaire', 'invite'], 'L'),
  b('maree-basse', 'Marée basse', 'Gypsophile, nigelle et lavande : très léger, très clair.', ['gypsophile', 'nigelle', 'lavande'], r(6, 7), 20, 'blanc', ['naissance', 'merci'], 'S'),
  b('cueilli-ce-matin', 'Cueilli ce matin', 'Une brassée de ce qui s’ouvre cette semaine. On ne sait jamais d’avance.', ['pivoine', 'iris', 'digitale'], r(5, 6), 36, 'rose', ['fete-des-meres', 'anniversaire'], 'L'),
  b('rue-de-corbin', 'Rue de Corbin', 'Petit format de poche pour un cadeau qui se glisse dans un sac.', ['anemone', 'muscari'], r(3, 4), 15, 'violet', ['merci'], 'S'),
  b('dimanche-matin', 'Dimanche matin', 'Pivoines en bouton, à regarder s’ouvrir dans la journée.', ['pivoine', 'ammi'], r(5, 6), 42, 'rose', ['fete-des-meres', 'naissance'], 'M'),
  b('les-lices', 'Les Lices', 'Rose de jardin, phlox et feuillage : le côté jardin de grand-mère.', ['rose-jardin', 'phlox', 'fougere'], r(7, 9), 30, 'rose', ['anniversaire', 'fete-des-meres'], 'M'),
  b('pivoines-douest', 'Pivoines d’ouest', 'Six pivoines et rien d’autre. Une seule semaine par an à leur meilleur.', ['pivoine'], r(5, 6), 48, 'rose', ['fete-des-meres', 'anniversaire'], 'M'),
  b('granit-rose', 'Granit rose', 'Sedum cuivré, dahlias roses et baies : les couleurs de la côte de Granit rose.', ['sedum', 'dahlia', 'cotoneaster'], r(9, 11), 33, 'rose', ['invite', 'anniversaire'], 'M'),
  b('ardoise', 'Ardoise', 'Ellébores, noisetier et eucalyptus : un bouquet gris-vert pour l’hiver.', ['ellebore', 'noisetier', 'eucalyptus'], r(12, 2), 29, 'vert', ['maison', 'merci'], 'M'),
  b('brume-de-paimpol', 'Brume de Paimpol', 'Ammi, gypsophile et agapanthe : un nuage blanc et bleu pâle.', ['ammi', 'gypsophile', 'agapanthe'], r(7, 8), 35, 'blanc', ['naissance', 'invite'], 'L'),
  b('premier-printemps', 'Premier printemps', 'Narcisses, jacinthes et muscari, tout en parfum.', ['narcisse', 'jacinthe', 'muscari'], r(3, 4), 21, 'jaune', ['maison', 'merci'], 'M'),
  b('fin-d-ete', 'Fin d’été', 'Tournesols, rudbeckias et zinnias, pour les tables qui ont du monde.', ['tournesol', 'rudbeckia', 'zinnia'], r(8, 9), 31, 'jaune', ['invite', 'anniversaire'], 'L'),
  b('toussaint', 'Toussaint', 'Chrysanthèmes et lierre fleuri, sobres et durables.', ['chrysantheme', 'lierre'], r(10, 11), 26, 'jaune', ['maison'], 'M'),
  b('givre', 'Givre', 'Perce-neige et branches de noisetier, un tout petit bouquet d’hiver.', ['perce-neige', 'noisetier'], r(1, 2), 14, 'blanc', ['merci', 'naissance'], 'S'),
  b('houx-et-baies', 'Houx et baies', 'Houx, baies de cotonéaster et physalis, pour décembre.', ['houx', 'cotoneaster', 'physalis'], r(11, 12), 32, 'rouge', ['invite', 'maison'], 'M'),
  b('plein-champ', 'Plein champ', 'Cosmos, souci et nigelle, en vrac comme au bord du champ.', ['cosmos', 'souci', 'nigelle'], r(7, 9), 23, 'orange', ['maison', 'merci'], 'M'),
  b('lilas-blanc', 'Brassée de lilas', 'Une seule brassée de lilas, à poser dans un grand pot.', ['lilas'], r(4, 5), 27, 'violet', ['fete-des-meres', 'maison'], 'L'),
  b('mille-fleurs', 'Mille fleurs', 'Le bouquet « à la carte » : vous donnez le budget, nous choisissons.', ['dahlia', 'cosmos', 'zinnia', 'ammi'], r(7, 10), 45, 'rose', ['anniversaire', 'invite'], 'L'),
  b('tige-seule', 'Une tige', 'Une seule fleur, bien choisie, dans un papier kraft.', ['tulipe'], r(3, 5), 5, 'rouge', ['merci'], 'S'),
  b('tige-hortensia', 'Hortensia seul', 'Un hortensia, une grosse tête. Se garde en le laissant sécher.', ['hortensia'], r(7, 10), 12, 'bleu', ['maison'], 'S'),
  b('automne-doux', 'Automne doux', 'Asters, rudbeckias et physalis, pour la rentrée.', ['aster', 'rudbeckia', 'physalis'], r(9, 10), 29, 'violet', ['maison', 'anniversaire'], 'M'),
  b('bretagne-sauvage', 'Bretagne sauvage', 'Fougère, myosotis et iris, vert et bleu.', ['fougere', 'myosotis', 'iris'], r(4, 6), 26, 'bleu', ['merci', 'maison'], 'M'),
  b('douceur-de-mai', 'Douceur de mai', 'Pivoines, myosotis et fougère : le bouquet des fêtes des mères.', ['pivoine', 'myosotis', 'fougere'], r(5, 5), 40, 'rose', ['fete-des-meres'], 'L'),
  b('pot-de-fleurs-secheres', 'Botte d’hortensias séchés', 'Hortensias séchés à l’air, à poser sans eau.', ['hortensia', 'lavande'], TOUTE_ANNEE, 28, 'bleu', ['maison', 'merci'], 'M', 'sec'),
  b('seche-nuage', 'Nuage séché', 'Gypsophile, statice et amarante séchés, un bouquet qui dure des mois.', ['gypsophile', 'amarante'], TOUTE_ANNEE, 24, 'blanc', ['maison', 'naissance'], 'M', 'sec'),
  b('seche-terre', 'Terre cuite', 'Physalis, amarante et rudbeckia séchés, aux teintes de brique.', ['physalis', 'amarante'], TOUTE_ANNEE, 26, 'orange', ['maison'], 'M', 'sec'),
  b('seche-lavande', 'Botte de lavande', 'Lavande séchée, liée au raphia.', ['lavande'], TOUTE_ANNEE, 14, 'violet', ['maison', 'merci'], 'S', 'sec'),
  b('seche-prairie', 'Prairie sèche', 'Un mélange d’herbes, de nigelles et d’ammi séchés.', ['nigelle', 'ammi', 'gypsophile'], TOUTE_ANNEE, 22, 'blanc', ['maison'], 'M', 'sec'),
  b('seche-grand', 'Grande gerbe séchée', 'La grande gerbe, pour un vase haut ou un coin de cheminée.', ['hortensia', 'amarante', 'physalis', 'lavande'], TOUTE_ANNEE, 58, 'rose', ['invite', 'anniversaire'], 'L', 'sec'),
  b('sur-mesure', 'Création sur mesure', 'Dites-nous la pièce, les couleurs, le budget : nous composons avec ce qui est de saison.', ['dahlia', 'cosmos', 'eucalyptus'], TOUTE_ANNEE, 60, 'vert', ['anniversaire', 'invite', 'merci'], 'L'),
]
