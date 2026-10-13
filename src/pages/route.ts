import { bootPage } from '../core/boot'
import { pageHead, ctaBand, etiquette, photoBand } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { routeStops } from '../data/routeStops'
import { sceneSVG } from '../core/art'
import { flowerById } from '../data/flowers'
import { flowerOfMonth, moisNom } from '../core/season'
import { $, $$ } from '../core/dom'
import { gsap, ScrollTrigger } from '../core/motion'

const clamp = (n: number) => Math.max(0, Math.min(1, n))
const SKY = ['#f2c9a0', '#f6e3b8', '#d8e6ea', '#f1d49b', '#8b6a8f']

bootPage('route', ({ month }) => {
  const vedette = flowerById(flowerOfMonth(month))
  return `
${pageHead({ kicker: 'La route', titre: 'Le voyage d’une tige.', lede: `Cinq étapes, de la côte du Goëlo à la place Saint-Germain. Faites défiler : la lumière passe de l’aube au soir. En ${moisNom(month)}, c’est ${vedette.nom.toLowerCase()} qui voyage.` })}
<section class="route" id="route" aria-label="Le trajet en cinq étapes">
  <div class="route-pin">
    <div class="route-sky" aria-hidden="true">${SKY.map((c, i) => `<i data-k="${i}" style="background:linear-gradient(180deg, ${c}, color-mix(in srgb, ${c} 40%, #f3eee4))"></i>`).join('')}<b class="sun"></b></div>
    <p class="route-hint" aria-hidden="true">Balayez les étapes →</p>
    <div class="route-track" id="track">
      <div class="route-road" aria-hidden="true"><svg id="road-svg" viewBox="0 0 5000 400" preserveAspectRatio="none"><path id="road-bg" d="" /><path id="road" d="" pathLength="1" /></svg><div class="cart" id="cart"><svg viewBox="0 0 60 70"><path d="M30 66V30" stroke="#5E6F4E" stroke-width="3"/><circle cx="30" cy="22" r="14" fill="${vedette.teintes[0]}"/><circle cx="30" cy="22" r="5" fill="${vedette.teintes[1]}"/></svg></div></div>
      ${routeStops.map((s, i) => `<article class="rpanel" data-i="${i}">
        <div class="rcard">
          <div class="rscene">${sceneSVG(s.id, vedette)}</div>
          <p>${etiquette(s.etiquette)} ${s.aConfirmer ? etiquette('à confirmer', 'etiq--warn') : ''}</p>
          <h2 class="h2">${s.titre}</h2>
          <p class="rmoment">${s.lieu}, ${s.moment.toLowerCase()}</p>
          <p>${s.texte}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section class="section wrap">
  <div class="section-head"><h2 class="h2" data-split>Au bout de la route</h2><p class="lede" data-reveal>Le champ à l’aube, l’étal du samedi, puis les seaux de la place Saint-Germain.</p></div>
  ${photoBand(['champ-marguerites', 'panier-osier', 'seau-pivoines'].map(photoBySlug), 'ph-band--hero')}
</section>
<section class="section wrap prose">
  <p data-reveal>Nous n’affichons pas de distance : elle n’a pas été mesurée pour ce site. Les jours et horaires de marché sont à confirmer auprès de la boutique.</p>
</section>
${ctaBand()}
`
}, ({ reduced }) => {
  const route = $('#route')!
  if (reduced || window.innerWidth < 320) { route.classList.add('is-flat'); return }
  const pin = $('.route-pin')!
  const track = $('#track')!
  const road = $<SVGPathElement>('#road')!
  const roadBg = $<SVGPathElement>('#road-bg')!
  const svg = $('#road-svg')!
  const cart = $('#cart')!
  const skies = $$('.route-sky i')
  const sun = $('.sun')!
  const panels = $$('.rpanel')
  let total = 0
  let len = 0
  const pts = [[0, 330], ...routeStops.map((_, i) => [(i + 0.5) * 1000, [300, 210, 280, 190, 290][i]]), [5000, 300]]

  const build = () => {
    let d = `M${pts[0][0]} ${pts[0][1]}`
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1]
      const [x1, y1] = pts[i]
      d += `C${x0 + (x1 - x0) / 2} ${y0} ${x1 - (x1 - x0) / 2} ${y1} ${x1} ${y1}`
    }
    roadBg.setAttribute('d', d)
    road.setAttribute('d', d)
    len = roadBg.getTotalLength()
    road.style.strokeDasharray = '1'
    total = track.scrollWidth
  }
  const fracAtX = (x: number) => {
    let lo = 0
    let hi = 1
    for (let i = 0; i < 26; i++) {
      const mid = (lo + hi) / 2
      if (roadBg.getPointAtLength(len * mid).x < x) lo = mid; else hi = mid
    }
    return lo
  }
  const update = (p: number) => {
    const vw = window.innerWidth
    const x = p * (total - vw) + vw * (0.16 + 0.34 * p)
    const f = fracAtX((x / total) * 5000)
    const pt = roadBg.getPointAtLength(len * f)
    const sx = total / 5000
    const sy = svg.getBoundingClientRect().height / 400
    gsap.set(cart, { x: pt.x * sx - 30, y: pt.y * sy - 66 })
    road.style.strokeDashoffset = String(1 - f)
    const k = p * 4
    skies.forEach((s, i) => gsap.set(s, { opacity: clamp(1 - Math.abs(k - i)) }))
    gsap.set(sun, { x: p * vw * 0.78, y: -Math.sin(p * Math.PI) * 70, scale: 1 + (p > 0.8 ? (p - 0.8) * 1.5 : 0), opacity: p > 0.92 ? 1 - (p - 0.92) * 8 : 1 })
    panels.forEach((el, i) => { const near = 1 - Math.min(1, Math.abs(k - i) / 1.1); gsap.set(el, { opacity: 0.35 + 0.65 * near }) })
  }
  // Ordinateur : défilement horizontal épinglé. Téléphone et tablette tactile : panneaux à balayer
  // (scroll-snap natif), le ciel et le soleil suivent le balayage, sans épinglage fragile.
  const mm = gsap.matchMedia()
  mm.add({ desk: '(min-width: 48rem) and (hover: hover) and (pointer: fine)', touch: 'not all and (min-width: 48rem) and (hover: hover) and (pointer: fine)' }, (c) => {
    if (c.conditions?.desk) {
      build()
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${track.scrollWidth - window.innerWidth}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true, onRefresh: build, onUpdate: (self) => update(self.progress) },
      })
      update(0)
      return
    }
    route.classList.add('is-swipe')
    const vw = () => window.innerWidth
    let raf = 0
    const onSwipe = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = track.scrollWidth - track.clientWidth
        const p = max > 0 ? track.scrollLeft / max : 0
        const k = p * 4
        skies.forEach((s, i) => gsap.set(s, { opacity: clamp(1 - Math.abs(k - i)) }))
        gsap.set(sun, { x: p * vw() * 0.6, y: -Math.sin(p * Math.PI) * 24 })
        panels.forEach((el, i) => gsap.set(el, { opacity: 0.55 + 0.45 * (1 - Math.min(1, Math.abs(k - i) / 1.1)) }))
      })
    }
    track.addEventListener('scroll', onSwipe, { passive: true })
    onSwipe()
    gsap.from(panels, { opacity: 0, x: 40, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: track, start: 'top 85%', once: true } })
    return () => { track.removeEventListener('scroll', onSwipe); cancelAnimationFrame(raf); route.classList.remove('is-swipe') }
  })
  ScrollTrigger.refresh()
})
