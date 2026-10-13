import { bootPage } from '../core/boot'
import { pageHead, ctaBand, photoBand } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { faq } from '../data/faq'
import { $, $$ } from '../core/dom'

const cats: [string, string][] = [['tous', 'Tout'], ['commander', 'Commander'], ['fleurs', 'Les fleurs'], ['entretien', 'Entretien'], ['boutique', 'La boutique']]

bootPage('faq', () => `
${pageHead({ kicker: 'Questions fréquentes', titre: 'Commander, retirer, entretenir.', lede: 'Les réponses les plus demandées. Pour le reste, appelez la boutique.' })}
<section class="wrap ph-top">${photoBand(['bouquet-vase', 'seaux-etal', 'sechees-blanches'].map(photoBySlug), 'ph-band--slim')}</section>
<section class="section wrap">
  <div class="faq-tools">
    <div class="field"><label for="q">Rechercher une question</label><input id="q" type="search" autocomplete="off" placeholder="Par exemple : livraison"></div>
    <div class="filters" role="group" aria-label="Catégorie">${cats.map(([k, l], i) => `<button class="chip" type="button" data-cat="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
  </div>
  <div class="faq" id="faq">
    ${faq.map((f) => `<details class="faq-item" data-cat="${f.cat}" data-reveal><summary><span>${f.q}</span><i aria-hidden="true"></i></summary><div class="faq-a"><p>${f.a}</p></div></details>`).join('')}
  </div>
  <p id="vide" class="empty" hidden>Aucune question ne correspond. Essayez un autre mot, ou appelez la boutique au 07 84 87 20 23.</p>
</section>
${ctaBand('Une autre question ? Appelez ou écrivez.')}
`, () => {
  let cat = 'tous'
  const q = $<HTMLInputElement>('#q')!
  const items = $$<HTMLDetailsElement>('.faq-item')
  const apply = () => {
    const t = q.value.trim().toLowerCase()
    let n = 0
    items.forEach((d) => {
      const ok = (cat === 'tous' || d.dataset.cat === cat) && (!t || d.textContent!.toLowerCase().includes(t))
      d.hidden = !ok
      if (ok) n++
    })
    $('#vide')!.hidden = n > 0
  }
  q.addEventListener('input', apply)
  $$('[data-cat].chip').forEach((c) => c.addEventListener('click', () => {
    cat = c.dataset.cat!
    $$('[data-cat].chip').forEach((x) => x.setAttribute('aria-pressed', String(x === c)))
    apply()
  }))
})
