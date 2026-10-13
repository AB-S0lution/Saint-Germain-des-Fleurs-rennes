import { bootPage } from '../core/boot'
import { pageHead, ctaBand, driedCard, sampleNote, photoBand } from '../core/ui'
import { photosByTheme } from '../data/photos'
import { dried } from '../data/dried'
import { $$ } from '../core/dom'

const types: [string, string][] = [['tous', 'Tout voir'], ['couronne', 'Couronnes'], ['bouquet', 'Bouquets'], ['botte', 'Bottes'], ['suspension', 'Suspensions']]

bootPage('seches', () => `
${pageHead({ kicker: 'Fleurs séchées et couronnes', titre: 'Des fleurs qui durent tout l’hiver.', lede: 'La boutique propose des bouquets et des couronnes de fleurs séchées. Les hortensias de la ferme, séchés à l’automne, en sont la vedette.' })}
<section class="section wrap">
  ${sampleNote('Pièces et prix d’exemple. Les créations réelles varient selon la saison.')}
  <div class="filters" role="group" aria-label="Type de création">${types.map(([k, l], i) => `<button class="chip" type="button" data-type="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
  <div class="grid g-3" id="liste">${dried.map((d, i) => `<div data-t="${d.type}">${driedCard(d, i)}</div>`).join('')}</div>
</section>
<section class="section wrap">
  ${photoBand(photosByTheme('seche'), 'ph-mosaic')}
</section>
<section class="section section--tint">
  <div class="wrap prose">
    <h2 class="h2" data-split>Faire sécher soi-même</h2>
    <p data-reveal>Cueillir en fin de floraison, par temps sec. Effeuiller, lier en petites bottes, suspendre la tête en bas dans un endroit aéré et sombre. Compter deux à trois semaines. Les hortensias, eux, se sèchent debout, dans un vase avec un fond d’eau.</p>
    <p data-reveal>Plus de conseils dans le journal : « Sécher ses hortensias », « Lavande, fraîche puis séchée », « Faire sa couronne d’hiver ».</p>
  </div>
</section>
${ctaBand()}
`, () => {
  const chips = $$('[data-type]')
  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)))
    $$('#liste > div').forEach((d) => { d.hidden = c.dataset.type !== 'tous' && d.dataset.t !== c.dataset.type })
  }))
})
