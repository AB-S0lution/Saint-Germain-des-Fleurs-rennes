import { bootPage } from '../core/boot'
import { pageHead, ctaBand, etiquette, sampleNote, photoBand } from '../core/ui'
import { posts } from '../data/posts'
import { $, $$, capitalise } from '../core/dom'
import { photos, photoImg } from '../data/photos'

const cats: [string, string][] = [['tous', 'Tout'], ['saison', 'Saison'], ['entretien', 'Entretien'], ['ferme', 'Ferme'], ['sécher', 'Sécher']]
const fmt = (d: string) => capitalise(new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }))
const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

bootPage('journal', () => `
${pageHead({ kicker: 'Journal', titre: 'Notes de saison.', lede: 'Ce qui fleurit, comment le garder, et ce qui se passe à la ferme.' })}
<section class="section wrap">
  ${sampleNote('Articles d’exemple, dates fictives. Photos d’illustration (Unsplash).')}
  <div class="filters" role="group" aria-label="Catégorie">${cats.map(([k, l], i) => `<button class="chip" type="button" data-cat="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
  <div class="posts" id="posts">
    ${sorted.map((p, i) => `<article class="post ${i === 0 ? 'post--lead' : ''}" data-cat="${p.categorie}" data-reveal>
      <button class="post-hit" type="button" data-post="${p.id}" aria-label="Lire : ${p.titre}"></button>
      <figure class="post-thumb">${photoImg(photos[(i * 7 + 2) % photos.length])}</figure>
      <p class="post-meta">${etiquette(p.categorie)} <span>${fmt(p.date)}, ${p.lecture} min</span></p>
      <h2 class="h3">${p.titre}</h2>
      <p>${p.resume}</p>
      <span class="link">Lire la suite</span>
    </article>`).join('')}
  </div>
</section>
<dialog id="dlg" aria-labelledby="dlg-t"><button class="dlg-close" type="button" aria-label="Fermer">&times;</button><div class="dlg-body" id="dlg-body"></div></dialog>
${ctaBand()}
`, () => {
  const dlg = $<HTMLDialogElement>('#dlg')!
  const body = $('#dlg-body')!
  $$('[data-post]').forEach((b) => b.addEventListener('click', () => {
    const p = posts.find((x) => x.id === b.dataset.post)!
    body.innerHTML = `${photoImg(photos[(sorted.indexOf(p) * 7 + 2) % photos.length], 'photo dlg-photo')}<p class="post-meta"><span class="etiq">${p.categorie}</span> <span>${fmt(p.date)}</span></p><h2 class="h2" id="dlg-t">${p.titre}</h2>${p.corps.map((t) => `<p>${t}</p>`).join('')}`
    dlg.showModal()
  }))
  $('.dlg-close', dlg)!.addEventListener('click', () => dlg.close())
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close() })
  const chips = $$('[data-cat].chip')
  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)))
    $$('.post').forEach((p) => { p.hidden = c.dataset.cat !== 'tous' && p.dataset.cat !== c.dataset.cat })
  }))
})
