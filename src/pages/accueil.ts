import { bootPage } from '../core/boot'
import { ctaBand, bouquetCard, etiquette } from '../core/ui'
import { bouquets } from '../data/bouquets'
import { flowers, flowerById } from '../data/flowers'
import { press, stats, hours, SITE, ratingBlooms } from '../data/site'
import { testimonials } from '../data/testimonials'
import { posts } from '../data/posts'
import { composerStems, stemFlower } from '../data/composerStems'
import { capitalise } from '../core/dom'
import { photoBySlug, photoImg } from '../data/photos'
import { photoBand } from '../core/ui'
import { routeStops } from '../data/routeStops'
import { flowerHead, stemIcon } from '../core/art'
import { flowerOfMonth, moisNom, inSeason } from '../core/season'
import { href, $, $$ } from '../core/dom'
import { gsap, ScrollTrigger, SplitText } from '../core/motion'

const clamp = (n: number) => Math.max(0, Math.min(1, n))

bootPage('accueil', ({ month }) => {
  const vedette = flowerById(flowerOfMonth(month))
  const semaine = bouquets.filter((b) => b.mois.includes(month) && b.etat === 'frais').slice(0, 6)
  const fleursMois = flowers.filter((f) => inSeason(f.mois, month) && f.kind !== 'leaf')
  return `
<section class="hero" id="hero">
  <div class="hero-in wrap">
    <div class="hero-copy">
      <h1 class="hero-title" aria-label="Saint Germain des Fleurs">Saint Germain<br>des Fleurs</h1>
      <p class="hero-sub">Fleurs locales de saison, cueillies à Plouézec, vendues place Saint-Germain, à Rennes.</p>
      <div class="hero-cta">
        <a class="btn magnetic" href="${href('composer.html')}">Composer votre bouquet</a>
        <a class="btn btn--ghost" href="${href('saisons.html')}">Les fleurs de ${moisNom(month)}</a>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <svg viewBox="0 0 400 720" class="hero-svg" focusable="false">
        <ellipse cx="200" cy="676" rx="150" ry="14" class="soil"/>
        <g class="sway">
          <path id="stem" d="M200 676C192 580 216 500 203 400S190 262 200 200" pathLength="1" class="stem"/>
          <g class="hleaf" data-t="0.18" data-x="196" data-y="590" data-r="-35"><path d="M0 0C-30 -10 -52 -34 -50 -64C-24 -56 -4 -34 0 0Z" fill="#5E6F4E"/></g>
          <g class="hleaf" data-t="0.37" data-x="206" data-y="500" data-r="38"><path d="M0 0C30 -12 56 -34 52 -70C24 -60 4 -36 0 0Z" fill="#6B8F4E"/></g>
          <g class="hleaf" data-t="0.56" data-x="204" data-y="410" data-r="-30"><path d="M0 0C-26 -8 -46 -30 -44 -58C-20 -50 -3 -30 0 0Z" fill="#5E6F4E"/></g>
          <g class="hleaf" data-t="0.75" data-x="198" data-y="320" data-r="32"><path d="M0 0C24 -8 44 -28 40 -56C18 -48 3 -30 0 0Z" fill="#6B8F4E"/></g>
          <g id="bud"><ellipse rx="9" ry="14" fill="#6B8F4E"/></g>
          <g id="bloom"><g transform="translate(200 196)">${flowerHead(vedette, 112, 5)}</g></g>
        </g>
      </svg>
      <div class="hero-tag" id="hero-tag">${etiquette(`${moisNom(month)} · ${vedette.nom.toLowerCase()}`)}</div>
    </div>
  </div>
</section>

<section class="section wrap ph-intro">
  <div class="section-head"><h2 class="h2" data-split>Des seaux pleins, chaque matin.</h2><p class="lede" data-reveal>Des fleurs coupées la veille, posées en vrac dans les seaux de zinc, puis montées en bouquet devant vous.</p></div>
  ${photoBand([photoBySlug('boutique-pleine'), photoBySlug('seau-pivoines'), photoBySlug('echelle-fleurs')], 'ph-band--hero')}
</section>

<section class="section wrap week">
  <div class="section-head"><h2 class="h2" data-split>Cette semaine à la boutique</h2><p class="lede" data-reveal>Des bouquets d’exemple, qui suivent le calendrier de ${moisNom(month)}. Les prix sont indicatifs.</p></div>
  <div class="grid g-3 week-grid">${semaine.map((b) => bouquetCard(b)).join('')}</div>
  <p class="more" data-reveal><a class="btn btn--ghost" href="${href('bouquets.html')}">Voir tout le catalogue</a></p>
</section>

<section class="route-teaser" id="teaser">
  <div class="wrap teaser-in">
    <div class="teaser-copy">
      <h2 class="h2" data-split>De Plouézec à Saint-Germain.</h2>
      <p class="lede" data-reveal>Les fleurs sont cueillies à la ferme, passent par les marchés de Paimpol et des Lices, puis arrivent sur le comptoir de la place Saint-Germain.</p>
      <p data-reveal><a class="btn magnetic" href="${href('route.html')}">Suivre la route</a></p>
    </div>
    <div class="teaser-draw">
      <svg viewBox="0 0 320 640" class="teaser-svg" aria-hidden="true" focusable="false">
        <path id="troad-bg" d="M60 30C60 110 250 130 250 220S70 300 70 380 250 450 250 540 160 600 160 620" class="road-bg"/>
        <path id="troad" d="M60 30C60 110 250 130 250 220S70 300 70 380 250 450 250 540 160 600 160 620" pathLength="1" class="road"/>
        ${routeStops.map((s, i) => `<g class="tstop" data-t="${s.t}" data-i="${i}"><circle r="9" class="stop-dot"/></g>`).join('')}
      </svg>
      <ol class="teaser-list">${routeStops.map((s) => `<li class="tstop-l"><strong>${s.lieu}</strong><span>${s.moment}${s.aConfirmer ? ' (à confirmer)' : ''}</span></li>`).join('')}</ol>
    </div>
  </div>
</section>

<section class="section month">
  <div class="wrap">
    <div class="section-head"><h2 class="h2" data-split>En ${moisNom(month)}, au champ.</h2><p class="lede" data-reveal>La boutique ne vend que ce qui pousse. Voici les fleurs du mois dans le catalogue d’exemple.</p></div>
    <ul class="month-strip">${fleursMois.slice(0, 8).map((f, i) => `<li data-reveal><div>${stemIcon(f, i + 9)}</div><span>${f.nom}</span></li>`).join('')}</ul>
    <p data-reveal><a class="link" href="${href('saisons.html')}">Voir toute l’année</a></p>
  </div>
</section>

<section class="section composer-teaser">
  <div class="wrap ct-in">
    <div>
      <h2 class="h2" data-split>Composer à la tige.</h2>
      <p class="lede" data-reveal>Un banc de tiges qui ne montre que les fleurs du mois. Vous les posez dans le papier kraft, et le message de commande est prêt à partir par mail ou par téléphone.</p>
      <p data-reveal><a class="btn magnetic" href="${href('composer.html')}">Essayer le composeur</a></p>
    </div>
    <ul class="ct-stems" aria-hidden="true">${composerStems.filter((s) => stemFlower(s).mois.includes(month)).slice(0, 6).map((s, i) => `<li style="--r:${(i - 2.5) * 5}deg">${stemIcon(stemFlower(s), i + 40)}</li>`).join('')}</ul>
  </div>
</section>

<section class="section section--tint press">
  <div class="wrap">
    <div class="section-head"><h2 class="h2" data-split>Ce qu’on en dit</h2></div>
    <div class="press-grid">${press.map((p, i) => `<figure class="quote ${i === 0 ? 'quote--lead' : ''}" data-reveal><blockquote>« ${p.texte} »</blockquote><figcaption>${p.source}${p.date ? `, ${p.date}` : ''}</figcaption></figure>`).join('')}</div>
    <p class="hint" data-reveal>Évaluation sur Blooms.fr : ${ratingBlooms.note}/${ratingBlooms.sur} (${ratingBlooms.avis} notes). Source tierce, non confirmée.</p>
  </div>
</section>

<section class="section wrap stats-row">
  <div class="grid g-4">${stats.map((s) => {
    const n = /^\d+/.exec(s.valeur)
    return `<div class="stat" data-reveal><p class="stat-v display"${n ? ` data-count="${n[0]}" data-suffix="${s.valeur.slice(n[0].length)}"` : ''}>${s.valeur}</p><p class="stat-l">${s.etiquette}</p><p class="stat-d">${s.detail}</p></div>`
  }).join('')}</div>
</section>

<section class="marquee-sec" aria-label="Témoignages génériques d’exemple">
  <div class="marquee" tabindex="0">
    <ul class="marquee-track">${[...testimonials, ...testimonials].map((t, i) => `<li${i >= testimonials.length ? ' aria-hidden="true"' : ''}><blockquote>${t.texte}</blockquote><p>${t.auteur}, ${t.contexte.toLowerCase()}</p></li>`).join('')}</ul>
  </div>
  <p class="wrap hint">Témoignages génériques d’exemple. Aucun avis réel n’est reproduit sur cette maquette.</p>
</section>

<section class="section ph-mosaic-sec">
  <div class="wrap">
    <div class="section-head"><h2 class="h2" data-split>Du champ au comptoir.</h2><p class="lede" data-reveal>Le plein champ de Plouézec, les dahlias de fin d’été, les bouquets séchés de l’hiver.</p></div>
    ${photoBand(['champ-rose', 'dahlias-vase', 'prairie-coteau', 'bouquet-sec-kraft', 'panier-osier', 'dahlia-ouvert', 'pavots-ambre', 'seaux-etal'].map(photoBySlug), 'ph-mosaic')}
    <p data-reveal><a class="link" href="${href('galerie.html')}">Toutes les photos</a></p>
  </div>
</section>

<section class="section wrap jt">
  <div class="section-head"><h2 class="h2" data-split>Dans le journal</h2></div>
  <div class="grid g-3">${[...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map((p) => `<article class="post" data-reveal><figure class="post-thumb">${photoImg(photoBySlug(p.photo))}<figcaption class="ph-label">Photo d’illustration</figcaption></figure><p class="post-meta">${etiquette(p.categorie)} <span>${capitalise(new Date(p.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }))}</span></p><h3 class="h3">${p.titre}</h3><p>${p.resume}</p><a class="link" href="${href('journal.html')}">Lire dans le journal</a></article>`).join('')}</div>
</section>

<section class="section wrap visit">
  <div class="visit-grid">
    <div><h2 class="h2" data-split>Passez nous voir.</h2><p class="lede" data-reveal>${SITE.adresse.rue}, ${SITE.adresse.ville}. Derrière l’église Saint-Germain, sur la ligne B du métro.</p><p data-reveal><a class="link" href="${SITE.mapsUrl}" target="_blank" rel="noopener">Ouvrir le plan</a></p></div>
    <table class="hours" data-reveal><caption class="sr">Horaires</caption><tbody>${hours.map((r) => `<tr><th scope="row">${r.jour}</th><td>${r.ouvert ? `${r.debut!.replace(':00', ' h')} à ${r.fin!.replace(':00', ' h')}${r.note ? ' *' : ''}` : 'fermé'}</td></tr>`).join('')}</tbody></table>
  </div>
  <p class="hint" data-reveal>* Dimanche à confirmer. Horaires relevés sur Instagram et Blooms.fr.</p>
</section>
${ctaBand()}`
}, ({ reduced, main }) => {
  // --- Hero : la tige pousse au défilement ---
  const stem = $<SVGPathElement>('#stem')!
  const len = 1
  const leaves = $$<SVGGElement>('.hleaf')
  const bud = $<SVGGElement>('#bud')!
  const bloom = $<SVGGElement>('#bloom')!
  const tag = $('#hero-tag')!
  const title = $('.hero-title')!
  const pathEl = stem as SVGPathElement
  const total = pathEl.getTotalLength()
  const render = (v: number) => {
    const sv = clamp(v / 0.66)
    stem.style.strokeDasharray = String(len)
    stem.style.strokeDashoffset = String(len - sv)
    const pt = pathEl.getPointAtLength(total * sv)
    gsap.set(bud, { x: pt.x, y: pt.y, opacity: v < 0.6 ? 1 : clamp(1 - (v - 0.6) / 0.08), scale: 0.7 + sv * 0.5 })
    leaves.forEach((l) => {
      const t = Number(l.dataset.t)
      const p = clamp((v - t * 0.66) / 0.14)
      gsap.set(l, { x: Number(l.dataset.x), y: Number(l.dataset.y), rotation: Number(l.dataset.r) * (0.6 + 0.4 * p), scale: p, transformOrigin: '0 0' })
    })
    const bv = clamp((v - 0.64) / 0.36)
    gsap.set(bloom, { scale: 0.15 + 0.85 * bv, opacity: clamp(bv * 3), rotation: -28 * (1 - bv), svgOrigin: '200 200' })
    gsap.set(tag, { opacity: clamp((v - 0.9) / 0.1), y: 10 * (1 - clamp((v - 0.9) / 0.1)) })
  }
  if (reduced) {
    render(1)
    gsap.set(title, { visibility: 'visible' })
    $('.hero')!.classList.add('is-static')
  } else {
    const state = { intro: 0, scroll: 0 }
    const draw = () => render(Math.max(state.intro, state.scroll))
    render(0)
    gsap.to(state, { intro: 0.2, duration: 2, ease: 'power2.out', delay: 0.5, onUpdate: draw })
    gsap.set(title, { visibility: 'visible' })
    const split = SplitText.create(title, { type: 'chars,words', charsClass: 'hc' })
    // Ordinateur : épinglage long et lettres très dispersées. Tactile : épinglage court, dispersion réduite.
    const mm = gsap.matchMedia()
    mm.add({ desk: '(min-width: 48rem) and (pointer: fine)', touch: 'not all and (min-width: 48rem) and (pointer: fine)' }, (c) => {
      const desk = !!c.conditions?.desk
      const amp = desk ? 1 : 0.45
      gsap.to(state, { scroll: 1, ease: 'none', onUpdate: draw, scrollTrigger: { trigger: '#hero', start: 'top top', end: desk ? '+=170%' : '+=90%', scrub: desk ? 0.7 : 0.4, pin: true, anticipatePin: 1 } })
      gsap.from(split.chars, { y: () => gsap.utils.random(-70, 70) * amp, x: () => gsap.utils.random(-30, 30) * amp, rotation: () => gsap.utils.random(-28, 28) * amp, opacity: 0, duration: desk ? 1.6 : 1.2, ease: 'expo.out', stagger: { each: desk ? 0.03 : 0.022, from: 'random' }, delay: 0.1 })
    })
    gsap.from('.hero-sub, .hero-cta', { y: 24, opacity: 0, duration: 1, delay: 0.9, stagger: 0.12, ease: 'power3.out' })
  }

  // --- Teaser de la route : la route se dessine ---
  const road = $<SVGPathElement>('#troad')
  const stops = $$<SVGGElement>('.tstop')
  if (road) {
    const rl = (document.querySelector('#troad-bg') as SVGPathElement).getTotalLength()
    stops.forEach((s) => { const p = (document.querySelector('#troad-bg') as SVGPathElement).getPointAtLength(rl * Number(s.dataset.t)); s.setAttribute('transform', `translate(${p.x} ${p.y})`) })
    if (!reduced) {
      road.style.strokeDasharray = '1'
      road.style.strokeDashoffset = '1'
      const items = $$('.tstop-l')
      gsap.set(stops, { scale: 0, transformOrigin: 'center' })
      gsap.set(items, { opacity: 0.25, x: -8 })
      gsap.to(road, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.teaser-draw', start: 'top 70%', end: 'bottom 60%', scrub: 0.6, onUpdate: (self) => {
        stops.forEach((s, i) => { const on = self.progress >= Number(s.dataset.t) - 0.02; gsap.to(s, { scale: on ? 1 : 0, duration: 0.5, ease: 'back.out(2)', overwrite: true }); gsap.to(items[i], { opacity: on ? 1 : 0.25, x: on ? 0 : -8, duration: 0.5, overwrite: true }) })
      } } })
    } else {
      road.style.strokeDasharray = '1'
      road.style.strokeDashoffset = '0'
    }
  }
  // Cartes : le clic ouvre le catalogue
  $$('.week-grid [data-bouquet]', main).forEach((b) => b.addEventListener('click', () => { const a = document.createElement('a'); a.href = href('bouquets.html'); document.body.append(a); a.click(); a.remove() }))
  ScrollTrigger.refresh()
})
