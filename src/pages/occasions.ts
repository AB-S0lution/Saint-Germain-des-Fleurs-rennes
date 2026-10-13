import { bootPage } from '../core/boot'
import { pageHead, ctaBand, etiquette, orderMailto, photoFrame } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { occasions } from '../data/occasions'
import { bouquets } from '../data/bouquets'
import { href, euro } from '../core/dom'
import { SITE } from '../data/site'
import { MOIS } from '../data/months'

const conf = occasions.filter((o) => o.confirmed)
const demande = occasions.filter((o) => !o.confirmed)

bootPage('occasions', () => `
${pageHead({ kicker: 'Occasions', titre: 'Pour chaque occasion, ce qui est de saison.', lede: 'Fête des mères, anniversaires, naissances, ou juste pour faire du bien : on compose avec ce qui s’ouvre cette semaine.' })}
<section class="section wrap">
  <div class="occ-list">
    ${conf.map((o) => `<article class="occ" data-reveal>
      <div class="occ-main">
        <h2 class="h2">${o.titre}</h2>
        <p class="occ-acc">${o.accroche}</p>
        <p>${o.texte}</p>
        ${o.moisFort.length && o.moisFort.length < 12 ? `<p class="hint">Moment fort : ${o.moisFort.map((m) => MOIS[m - 1]).join(', ')}.</p>` : ''}
      </div>
      <div class="occ-side">${photoFrame(photoBySlug(o.photo), 'occ-photo')}
      <ul class="occ-sug" aria-label="Idées de bouquets">${o.suggestions.map((id) => bouquets.find((b) => b.id === id)).filter(Boolean).map((b) => `<li><span>${b!.nom}</span><span class="price">dès ${euro(b!.prix)}</span></li>`).join('')}</ul></div>
    </article>`).join('')}
  </div>
</section>
<section class="section section--tint">
  <div class="wrap">
    <div class="section-head"><h2 class="h2" data-split>Sur demande</h2><p class="lede">Ces demandes ne sont pas confirmées comme prestations de la boutique. Le plus simple est de nous en parler.</p></div>
    <div class="grid g-3">
      ${demande.map((o) => `<article class="place" data-reveal>${photoFrame(photoBySlug(o.photo), 'place-photo')}${etiquette('sur demande')}<h3 class="h3">${o.titre}</h3><p>${o.texte}</p><a class="link" href="${orderMailto(`Demande : ${o.titre}`, `Bonjour,\n\nJe vous contacte au sujet de : ${o.titre}.\n\n`)}">Écrire à la boutique</a> <span class="hint">ou appeler le <a href="${SITE.telHref}">${SITE.tel}</a></span></article>`).join('')}
    </div>
  </div>
</section>
<section class="section wrap prose"><p data-reveal>Pour voir les bouquets de saison, rendez-vous dans le <a class="link" href="${href('bouquets.html')}">catalogue</a>, ou composez le vôtre.</p></section>
${ctaBand()}
`)
