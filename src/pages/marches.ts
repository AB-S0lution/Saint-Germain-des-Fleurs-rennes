import { bootPage } from '../core/boot'
import { pageHead, ctaBand, etiquette, photoFrame } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { hours, SITE } from '../data/site'
import { href } from '../core/dom'

const points = [
  { id: 'lices', photo: 'panier-osier', nom: 'Marché des Lices', ville: 'Rennes', jour: 'Samedi', heure: 'Matin (horaires à confirmer)', texte: 'Le rendez-vous historique de la famille à Rennes, à quelques minutes à pied de la boutique. La presse écrit que les fleurs de Plouézec y sont bien connues.', source: 'Unidivers, actu.fr' },
  { id: 'paimpol', photo: 'seaux-etal', nom: 'Marché de Paimpol', ville: 'Paimpol', jour: 'Mardi', heure: 'Matin (horaires à confirmer)', texte: 'Cité par la presse comme un marché du mardi. À confirmer auprès de la boutique avant de faire le trajet.', source: 'actu.fr' },
  { id: 'ferme', photo: 'prairie-coteau', nom: 'Vente à la ferme', ville: 'Plouézec', jour: 'Jeudi', heure: '16 h à 19 h (selon actu.fr)', texte: 'La ferme aux Mille Fleurs ouvre ses portes le jeudi après-midi, d’après un article dont la date est inconnue. À vérifier avant de venir.', source: 'actu.fr' },
]

bootPage('marches', () => `
${pageHead({ kicker: 'Où nous trouver', titre: 'La boutique, et les marchés.', lede: 'La boutique du 4 place Saint-Germain est ouverte toute la semaine sauf le lundi. Les marchés et la ferme viennent de la presse : appelez pour confirmer.' })}
<section class="section wrap">
  <div class="grid g-3">
    <article class="place place--shop" data-reveal>
      ${photoFrame(photoBySlug('devanture-fleurs'), 'place-photo')}
      ${etiquette('Boutique', 'etiq--ok')}
      <h2 class="h3">Place Saint-Germain</h2>
      <p>${SITE.adresse.rue}, ${SITE.adresse.cp} ${SITE.adresse.ville}. Derrière l’église Saint-Germain, sur la ligne B du métro (station Saint-Germain).</p>
      <ul class="plain">${hours.map((h) => `<li><span>${h.jour}</span><span>${h.ouvert ? `${h.debut?.replace(':00', ' h')} à ${h.fin?.replace(':00', ' h')}${h.note ? ' (à confirmer)' : ''}` : 'fermé'}</span></li>`).join('')}</ul>
    </article>
    ${points.map((p) => `<article class="place" data-reveal>
      ${photoFrame(photoBySlug(p.photo), 'place-photo')}
      ${etiquette('À confirmer', 'etiq--warn')}
      <h2 class="h3">${p.nom}</h2>
      <p class="place-when"><strong>${p.jour}</strong>, ${p.heure}</p>
      <p>${p.texte}</p>
      <p class="hint">Source : ${p.source}.</p>
    </article>`).join('')}
  </div>
</section>
<section class="section wrap prose">
  <h2 class="h2" data-split>Avant de venir</h2>
  <p data-reveal>Les jours de marché peuvent changer avec les saisons. Un appel au <a class="link" href="${SITE.telHref}">${SITE.tel}</a> ou un message sur <a class="link" href="${SITE.instagramUrl}" target="_blank" rel="noopener">Instagram</a> confirme où trouver les fleurs cette semaine. Pour le détail du trajet d’une tige, voir <a class="link" href="${href('route.html')}">La route</a>.</p>
</section>
${ctaBand()}
`)
