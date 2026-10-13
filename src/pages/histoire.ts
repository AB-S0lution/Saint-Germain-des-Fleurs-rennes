import { bootPage } from '../core/boot'
import { pageHead, ctaBand, photoBand } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { press } from '../data/site'
import { gsap, ScrollTrigger } from '../core/motion'

interface Etape { an: string; titre: string; texte: string; source: string }

// Étapes issues de la presse (Unidivers 2020, actu.fr). Aucune date inventée.
const etapes: Etape[] = [
  { an: 'D’abord', titre: 'Un bûcheron devient horticulteur', texte: 'Jean-Michel Leven a d’abord été bûcheron. Il s’est tourné vers l’horticulture « en réponse à la demande », et a fait tourner la ferme familiale avec sa femme et ses enfants.', source: 'Unidivers, 2020' },
  { an: 'Pendant ~15 ans', titre: 'Rungis, pour les professionnels', texte: 'Pendant une quinzaine d’années, les fleurs sont vendues aux professionnels, au marché de gros de Rungis.', source: 'Unidivers, 2020' },
  { an: 'Puis', titre: 'Les marchés bretons, dont les Lices', texte: 'La famille passe aux marchés de Bretagne. Les fleurs de Plouézec deviennent un rendez-vous du marché des Lices à Rennes, le samedi, pendant une dizaine d’années.', source: 'Unidivers, actu.fr' },
  { an: 'Printemps 2020', titre: 'Les marchés ferment', texte: '« Ça faisait mal au cœur de devoir jeter des fleurs, nos pivoines, nos anémones… » raconte Marie Leven dans la presse. Les fleurs sont livrées à Rennes à partir de la mi-avril, et l’Instagram de la ferme devient le moyen de parler aux clients.', source: 'Unidivers, 2020' },
  { an: '17 mai 2020', titre: 'La boutique ouvre', texte: 'La famille décide de ne pas retourner à Rungis. La boutique de la place Saint-Germain ouvre le 17 mai 2020. « Les fleurs ne sont pas un service primaire, mais elles font du bien. »', source: 'Unidivers, 2020' },
  { an: 'Aujourd’hui', titre: 'La boutique et la ferme', texte: 'La boutique du 4 place Saint-Germain vend des fleurs locales de saison. À Plouézec, la ferme a ouvert ses portes le jeudi, d’après actu.fr (date de l’article inconnue : à confirmer).', source: 'Instagram, actu.fr' },
]

bootPage('histoire', () => `
${pageHead({ kicker: 'Notre histoire', titre: 'Une ferme, un marché, une boutique.', lede: 'Saint Germain des Fleurs est née en plein confinement, quand les fleurs de la ferme de Plouézec n’avaient plus de marché.' })}
<section class="section wrap">
  <div class="tl" id="tl">
    <div class="tl-line" aria-hidden="true"><i></i></div>
    <ol class="tl-list">
      ${etapes.map((e, i) => `<li class="tl-item ${i % 2 ? 'is-r' : ''}" data-reveal>
        <p class="tl-an">${e.an}</p>
        <h2 class="h3">${e.titre}</h2>
        <p>${e.texte}</p>
        <p class="tl-src">Source : ${e.source}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>
<section class="section wrap">
  ${photoBand(['devanture-fleurs', 'roses-jardin', 'bouquets-etal'].map(photoBySlug), 'ph-band--hero')}
</section>
<section class="section section--tint">
  <div class="wrap">
    <div class="section-head"><h2 class="h2" data-split>Ce que la presse en dit</h2></div>
    <div class="grid g-2">
      ${press.map((p) => `<figure class="quote" data-reveal><blockquote>« ${p.texte} »</blockquote><figcaption><a class="link" href="${p.url}" target="_blank" rel="noopener">${p.source}${p.date ? `, ${p.date}` : ''}</a>${p.note ? `<br><small>${p.note}</small>` : ''}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>
${ctaBand('Passez voir la boutique, elle est petite et pleine de fleurs.')}
`, () => {
  const line = document.querySelector<HTMLElement>('.tl-line i')
  if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#tl', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 } })
  ScrollTrigger.refresh()
})
