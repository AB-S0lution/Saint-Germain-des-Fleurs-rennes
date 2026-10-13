// Photos d'illustration Unsplash (licence Unsplash), pas des photos du commerce.
// Elles remplacent provisoirement les vraies photos de la boutique et de la ferme.
export type PhotoTheme = 'boutique' | 'champ' | 'dahlia' | 'seche' | 'bouquet'
export interface Photo { slug: string; src: string; alt: string; credit: string; url: string; width: number; height: number; theme: PhotoTheme }

const B = import.meta.env.BASE_URL
const p = (slug: string, id: string, width: number, height: number, alt: string, theme: PhotoTheme): Photo => ({ slug, src: `${B}photos/${slug}.jpg`, alt, credit: 'Unsplash', url: `https://images.unsplash.com/photo-${id}`, width, height, theme })

export const photos: Photo[] = [
  p('seau-pivoines', '1589244159943-460088ed5c92', 1200, 782, 'Roses et anémones dans des seaux en zinc devant une vitrine', 'boutique'),
  p('bouquets-etal', '1565695951564-007d8f297e48', 900, 1200, 'Bouquets emballés dans du papier kraft, serrés sur un étal', 'boutique'),
  p('echelle-fleurs', '1789003748653-3b530be0856c', 1200, 1800, 'Petite boutique baignée de soleil, plantes en pot et fleurs coupées', 'boutique'),
  p('devanture-fleurs', '1487070183336-b863922373d4', 1200, 801, 'Bouquets alignés devant une boutique de fleurs', 'boutique'),
  p('presentoir-rouge', '1586704235550-c4267ca3e6e9', 1200, 800, 'Fleurs en pot sur un présentoir en métal', 'boutique'),
  p('boutique-pleine', '1718568698631-c8e53cc1b18b', 1200, 803, 'Bouquet roulé dans du papier kraft, près d’une bobine de ficelle', 'boutique'),
  p('panier-osier', '1600104197373-c07cc35e4f61', 900, 600, 'Étal de fleurs au marché, paniers en osier sous un auvent', 'boutique'),
  p('etagere-bouquet', '1533616688419-b7a585564566', 1200, 1800, 'Bouquet de roses orange et de mufliers dans un bocal noué de raphia', 'bouquet'),
  p('seaux-etal', '1546905002-af9d9a15880a', 1200, 900, 'Seaux de fleurs coupées présentés à l’étal', 'boutique'),
  p('dahlia-rose', '1620062317671-ef6441546d7d', 1200, 1800, 'Un dahlia corail en pleine floraison', 'dahlia'),
  p('dahlias-vase', '1617417715887-d51297ecdbca', 1200, 801, 'Dahlias corail en bouquet serré', 'dahlia'),
  p('dahlias-macro', '1546842931-886c185b4c8c', 1200, 1811, 'Dahlias pêche vus de près', 'dahlia'),
  p('dahlias-jardin', '1505210497153-8ed5ba1c4ac1', 1200, 1503, 'Un massif de dahlias roses au jardin', 'champ'),
  p('dahlia-ouvert', '1541093113199-a2e9d84e903f', 1200, 1793, 'Dahlia rose grand ouvert', 'dahlia'),
  p('champ-rose', '1602615576820-ea14cf3e476a', 1200, 800, 'Cosmos roses et blancs sous un ciel clair', 'champ'),
  p('prairie-coteau', '1617067128946-8c4f807d91e1', 900, 600, 'Prairie fleurie sur un coteau, arbres en lisière', 'champ'),
  p('champ-fleurs', '1548386135-9002f96a0dc4', 1200, 795, 'Un champ de cosmos roses en été', 'champ'),
  p('champ-marguerites', '1639148865311-b9f989727012', 900, 1350, 'Champ de marguerites sous un ciel nuageux', 'champ'),
  p('coquelicots', '1444930694458-01babf71870c', 1200, 723, 'Champ de coquelicots en fleur', 'champ'),
  p('champ-melange', '1560106130-636dcb77013a', 900, 1200, 'Champ de renoncules de toutes les couleurs', 'champ'),
  p('sechees-bleu', '1586244897859-2cd81e1cad1f', 1200, 1500, 'Fleurs pressées disposées en couronne sur papier blanc', 'seche'),
  p('sechees-brun', '1581524674552-80462a204517', 1200, 1797, 'Fleur séchée brune et blanche', 'seche'),
  p('sechees-blanches', '1619422305894-dd096b3e6b98', 900, 1350, 'Bouquet de fleurs séchées blanches', 'seche'),
  p('herbier', '1638294621924-be97f5f92413', 1200, 800, 'Feuilles et fleurs séchées posées à plat, façon herbier', 'seche'),
  p('herbier-fougere', '1528553688096-8e0735356dae', 1200, 1299, 'Fougère, fleur blanche et fleur rouge pressées', 'seche'),
  p('bouquet-sec-kraft', '1622658641558-235f26dd270b', 1200, 1800, 'Bouquet de fleurs séchées emballé dans du papier pêche', 'seche'),
  p('centre-table', '1561181286-d3fee7d55364', 1200, 1800, 'Tulipes roses dans un vase en verre', 'bouquet'),
  p('bouquet-vase', '1572454591674-2739f30d8c40', 1200, 1800, 'Bouquet rose, beige et rouge dans un vase en verre', 'bouquet'),
  p('fleurs-bois', '1531120364508-a6b656c3e78d', 1200, 900, 'Fleurs de couleurs posées sur une table en bois', 'bouquet'),
  p('pavots-ambre', '1587317996237-eddd7e834d84', 1200, 1800, 'Pavots blancs dans un vase en verre jaune', 'bouquet'),
  p('oeillets-vase', '1497276236755-0f85ba99a126', 1200, 1800, 'Bouquet de roses de jardin roses dans un vase', 'bouquet'),
  p('orange-vase', '1603178455924-ef33372953bb', 1200, 1600, 'Fleurs orange dans un vase en verre', 'bouquet'),
  p('roses-jardin', '1564046710162-5959a502ffe6', 900, 1200, 'Roses, œillets et lavande en bottes serrées', 'boutique'),
  p('bouquet-blanc-violet', '1619707046314-e76ae25d5ab3', 1200, 800, 'Bouquets blancs et violets sur les étagères d’un fleuriste', 'bouquet'),
]

export const photoBySlug = (slug: string): Photo => photos.find((x) => x.slug === slug) ?? photos[0]
export const photosByTheme = (t: PhotoTheme): Photo[] => photos.filter((x) => x.theme === t)

/** Balise <img> paresseuse, prête pour object-fit: cover. */
export function photoImg(ph: Photo, cls = 'photo', eager = false): string {
  return `<img class="${cls}" src="${ph.src}" alt="${ph.alt}" width="${ph.width}" height="${ph.height}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`
}
