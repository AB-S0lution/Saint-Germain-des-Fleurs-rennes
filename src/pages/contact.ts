import { bootPage } from '../core/boot'
import { pageHead, ctaBand, orderMailto, mapsLink, photoFrame, photoBand } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { SITE, hours, ratingBlooms } from '../data/site'
import { $ } from '../core/dom'

const h = (t?: string) => (t ? t.replace(':00', ' h').replace(':', ' h ') : '')

function ouvertMaintenant(): string {
  const now = new Date()
  const row = hours.find((x) => x.idx === now.getDay())
  if (!row || !row.ouvert || !row.debut || !row.fin) return 'Fermé aujourd’hui.'
  const cur = now.getHours() * 60 + now.getMinutes()
  const [a, b] = row.debut.split(':').map(Number)
  const [c, d] = row.fin.split(':').map(Number)
  if (cur >= a * 60 + b && cur < c * 60 + d) return `Ouvert maintenant, jusqu’à ${h(row.fin)}.`
  return cur < a * 60 + b ? `Fermé pour l’instant, ouvre à ${h(row.debut)}.` : 'Fermé pour aujourd’hui.'
}

bootPage('contact', () => `
${pageHead({ kicker: 'Contact et commande', titre: 'On commande par téléphone ou par mail.', lede: 'Il n’y a pas de paiement en ligne : écrivez ou appelez, nous préparons le bouquet pour le retrait en boutique.' })}
<section class="section wrap">
  <div class="contact-grid">
    <div class="contact-main" data-reveal>
      <h2 class="h3">Téléphone</h2>
      <p><a class="big-link" href="${SITE.telHref}">${SITE.tel}</a></p>
      <h2 class="h3">Mail</h2>
      <p><a class="big-link" href="mailto:${SITE.email}">${SITE.email.replace('@', '<wbr>@')}</a></p>
      <h2 class="h3">Boutique</h2>
      <address>${SITE.adresse.rue}<br>${SITE.adresse.cp} ${SITE.adresse.ville}</address>
      <p>${mapsLink('Ouvrir dans Google Maps')} · <a class="link" href="${SITE.instagramUrl}" target="_blank" rel="noopener">Instagram @${SITE.instagram}</a></p>
      <p class="hint">Métro ligne B, station Saint-Germain. Entrée accessible en fauteuil roulant (source agrégateur, à vérifier). Évaluation sur Blooms.fr : ${ratingBlooms.note}/${ratingBlooms.sur} (${ratingBlooms.avis} notes), source non confirmée.</p>
    </div>
    <div class="contact-side">
    ${photoFrame(photoBySlug('devanture-fleurs'), 'contact-photo')}
    <div class="hours-card" data-reveal>
      <h2 class="h3">Horaires</h2>
      <p class="open-now" id="open-now" aria-live="polite">${ouvertMaintenant()}</p>
      <table class="hours"><caption class="sr">Horaires d’ouverture</caption><tbody>
        ${hours.map((r) => `<tr class="${r.idx === new Date().getDay() ? 'today' : ''}"><th scope="row">${r.jour}</th><td>${r.ouvert ? `${h(r.debut)} à ${h(r.fin)}${r.note ? ' *' : ''}` : 'fermé'}</td></tr>`).join('')}
      </tbody></table>
      <p class="hint">* Horaires relevés sur Instagram et Blooms.fr. Le dimanche n’apparaît pas dans toutes les sources : à confirmer.</p>
    </div>
    </div>
  </div>
</section>
<section class="section section--tint">
  <div class="wrap order-wrap">
    <div class="section-head"><h2 class="h2" data-split>Préparer votre message</h2><p class="lede">Remplissez ce petit brief : il ouvre votre application de mail avec le message prêt à envoyer. Rien n’est enregistré sur ce site.</p></div>
    <form class="order-form" id="brief" data-reveal novalidate>
      <div class="field"><label for="nom">Votre prénom</label><input id="nom" name="nom" autocomplete="given-name" required><p class="error" id="e-nom" hidden>Indiquez un prénom pour que nous sachions à qui répondre.</p></div>
      <div class="field"><label for="quoi">Ce que vous cherchez</label><select id="quoi" name="quoi"><option>Un bouquet de saison</option><option>Un bouquet sur mesure</option><option>Des fleurs séchées ou une couronne</option><option>Un autre projet (sur demande)</option></select></div>
      <div class="field"><label for="jour">Jour de retrait souhaité</label><input id="jour" name="jour" type="date"></div>
      <div class="field"><label for="budget">Budget indicatif (€)</label><input id="budget" name="budget" type="number" min="5" step="1" inputmode="numeric" placeholder="30"><p class="hint">Facultatif.</p></div>
      <div class="field wide"><label for="msg">Votre message</label><textarea id="msg" name="msg" placeholder="Couleurs, destinataire, occasion, allergies…"></textarea></div>
      <div class="wide"><button class="btn" type="submit">Préparer le mail</button></div>
    </form>
  </div>
</section>
<section class="section wrap">${photoBand(['seaux-etal', 'bouquets-etal', 'panier-osier'].map(photoBySlug), 'ph-band--slim')}</section>
${ctaBand('Plutôt une voix ? Appelez la boutique.')}
`, () => {
  const form = $<HTMLFormElement>('#brief')!
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const f = new FormData(form)
    const nom = String(f.get('nom') ?? '').trim()
    const err = $('#e-nom')!
    err.hidden = !!nom
    if (!nom) { $('#nom')!.focus(); return }
    const lignes = [`Bonjour,`, ``, `Je m’appelle ${nom} et je souhaiterais : ${f.get('quoi')}.`]
    if (f.get('jour')) lignes.push(`Retrait souhaité le : ${f.get('jour')}.`)
    if (f.get('budget')) lignes.push(`Budget indicatif : ${f.get('budget')} €.`)
    if (String(f.get('msg')).trim()) lignes.push(``, String(f.get('msg')).trim())
    lignes.push(``, `Merci, bonne journée.`)
    location.href = orderMailto('Commande de fleurs', lignes.join('\n'))
  })
  window.setInterval(() => { const el = $('#open-now'); if (el) el.textContent = ouvertMaintenant() }, 60000)
})
