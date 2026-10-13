import { bootPage } from '../core/boot'
import { pageHead } from '../core/ui'
import { SITE } from '../data/site'

bootPage('confidentialite', () => `
${pageHead({ kicker: 'Vie privée', titre: 'Confidentialité.', lede: 'Ce site ne collecte aucune donnée personnelle.' })}
<section class="section wrap prose">
  <h2>Ce que le site ne fait pas</h2>
  <ul><li>Pas de cookie, pas de traceur, pas de statistiques de fréquentation.</li><li>Pas de formulaire envoyé à un serveur : le formulaire de la page Contact prépare un mail dans votre application, rien n’est transmis par le site.</li><li>Pas de paiement en ligne.</li><li>Pas de contenu chargé depuis un autre site : les polices et les images sont servies par le site lui-même.</li></ul>
  <h2>Ce que le site enregistre dans votre navigateur</h2>
  <p>Si vous choisissez de « voir un autre mois » dans la page Fleurs de saison, ce choix (un numéro de mois) est conservé dans le stockage local de votre navigateur pour que les pages suivantes s’affichent dans le même mois. Il reste sur votre appareil et peut être effacé en revenant au mois en cours.</p>
  <h2>Quand vous nous contactez</h2>
  <p>Si vous appelez le ${SITE.tel} ou écrivez à ${SITE.email}, vos informations sont traitées par la boutique pour répondre à votre demande. Pour exercer vos droits, écrivez à la même adresse.</p>
  <h2>Liens sortants</h2>
  <p>Les liens vers Instagram et Google Maps ouvrent des services tiers qui ont leur propre politique de confidentialité.</p>
</section>
`)
