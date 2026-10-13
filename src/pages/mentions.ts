import { bootPage } from '../core/boot'
import { pageHead, photoBand } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { SITE } from '../data/site'

bootPage('mentions', () => `
${pageHead({ kicker: 'Informations légales', titre: 'Mentions légales.', lede: 'Ce site est une maquette de démonstration réalisée pour présenter une proposition de site web.' })}
<section class="wrap ph-top">${photoBand(['herbier', 'champ-rose', 'fleurs-bois'].map(photoBySlug), 'ph-band--slim')}</section>
<section class="section wrap prose">
  <h2>Nature du site</h2>
  <p>Ce site est une démonstration non officielle. Il n’a pas été commandé ni validé par la boutique. Le catalogue, les prix, les articles du journal, les témoignages génériques et les illustrations sont des exemples.</p>
  <h2>Établissement présenté</h2>
  <p>${SITE.nom}, ${SITE.adresse.rue}, ${SITE.adresse.cp} ${SITE.adresse.ville}. Téléphone : ${SITE.tel}. Mail : ${SITE.email}.</p>
  <p>Forme juridique, numéro SIREN et numéro de TVA : <strong>à compléter</strong> (non vérifiés au moment de la rédaction).</p>
  <h2>Hébergement</h2>
  <p>Ce site statique est destiné à être hébergé sur GitHub Pages (GitHub, Inc.). Il n’utilise ni base de données ni serveur applicatif.</p>
  <h2>Sources des faits</h2>
  <p>Les faits sur la boutique et la ferme (adresse, téléphone, horaires, histoire, pratiques de culture) viennent de sources publiques : Instagram @${SITE.instagram}, Unidivers (octobre 2020), actu.fr, Rennes c’est bien (février 2026), Blooms.fr. Les citations de presse sont attribuées à leur source.</p>
  <h2>Images</h2>
  <p>Les illustrations (fleurs, bouquets, vases) sont dessinées en SVG pour ce site. Les photographies sont des photos d’illustration issues d’Unsplash (licence Unsplash), servies depuis ce site : ce ne sont pas des photos de la boutique ni de la ferme. Aucune photographie de la boutique n’est utilisée.</p>
  <h2>Polices</h2>
  <p>Fraunces, Instrument Sans (licence SIL OFL) et IBM Plex Mono (licence SIL OFL), servies depuis le site lui-même.</p>
  <h2>Propriété intellectuelle</h2>
  <p>Le nom « Saint Germain des Fleurs » appartient à son titulaire. Le code et les illustrations de cette maquette sont fournis pour démonstration.</p>
</section>
`)
