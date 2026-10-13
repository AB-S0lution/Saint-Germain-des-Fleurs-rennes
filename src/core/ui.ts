// Fragments HTML réutilisés par plusieurs pages.
import { bouquetSVG, wreathSVG } from './art'
import { esc, euro, href } from './dom'
import { SITE } from '../data/site'
import { MOIS_COURTS } from '../data/months'
import type { Bouquet } from '../data/bouquets'
import type { Dried } from '../data/dried'
import { flowerById } from '../data/flowers'
import { photoImg, type Photo } from '../data/photos'

/** Bandeau de photos d'illustration (Unsplash), révélé au défilement.
 *  Sur téléphone, les bandeaux `--hero` et `--slim` deviennent un carrousel à balayer (scroll-snap). */
export function photoBand(list: Photo[], cls = ''): string {
  const swipe = /ph-band--(hero|slim)/.test(cls)
  return `<div class="ph-band ${cls}"${swipe ? ' tabindex="0" role="region" aria-label="Photos d’illustration, à faire défiler"' : ''}>${list.map((ph) => `<figure class="ph" data-reveal="clip">${photoImg(ph)}</figure>`).join('')}</div>
<p class="ph-note">Photos d’illustration (Unsplash), pas des photos de la boutique.${swipe ? '<span class="swipe-hint" aria-hidden="true"> Balayez pour voir la suite →</span>' : ''}</p>`
}

/** Une photo d'illustration encadrée, avec son étiquette « Photo d'illustration ». */
export function photoFrame(ph: Photo, cls = ''): string {
  return `<figure class="ph-frame ${cls}">${photoImg(ph)}<figcaption class="ph-label">Photo d’illustration</figcaption></figure>`
}

export function pageHead(o: { titre: string; lede: string; kicker?: string }): string {
  return `<section class="page-head wrap">
  ${o.kicker ? `<p class="kicker" data-reveal>${o.kicker}</p>` : ''}
  <h1 class="display" data-split>${o.titre}</h1>
  <p class="lede" data-reveal>${o.lede}</p>
  <svg class="page-head-line" viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 12C100 0 150 24 300 12S500 0 600 12" pathLength="1" /></svg>
</section>`
}

export function etiquette(texte: string, cls = ''): string {
  return `<span class="etiq ${cls}">${texte}</span>`
}

export function bouquetArt(b: Bouquet): string {
  return bouquetSVG({ seed: b.id.length * 7 + b.prix, tiges: b.fleurs.slice(0, 4).map((id, i) => [id, i === 0 ? 3 : 2] as [string, number]), wrap: b.etat === 'sec' ? '#B89B7A' : '#C9A27E' })
}

export function bouquetCard(b: Bouquet, enSaison = true, mois = ''): string {
  return `<article class="card bq-card${enSaison ? '' : ' is-off'}" data-reveal>
  <button class="card-hit" type="button" data-bouquet="${b.id}" aria-label="Voir le détail : ${esc(b.nom)}"></button>
  <div class="card-art">${bouquetArt(b)}</div>
  <div class="card-body">
    <h3 class="card-title">${b.nom}</h3>
    <p class="card-meta">${b.fleurs.slice(0, 3).map((f) => flowerById(f).nom.toLowerCase()).join(', ')}</p>
    <p class="card-foot"><span class="price">dès ${euro(b.prix)} <small>indicatif</small></span>${etiquette(enSaison ? (b.etat === 'sec' ? 'séché' : 'de saison') : `revient en ${mois}`)}</p>
  </div>
</article>`
}

export function driedCard(d: Dried, i: number): string {
  const art = d.type === 'couronne' ? wreathSVG(d.fleurs, i + 2, d.teinte) : bouquetSVG({ seed: i + 40, tiges: d.fleurs.map((f) => [f, 3] as [string, number]), wrap: '#B89B7A' })
  return `<article class="card" data-reveal>
  <div class="card-art ${d.type === 'couronne' ? 'is-round' : ''}">${art}</div>
  <div class="card-body">
    <h3 class="card-title">${d.nom}</h3>
    <p class="card-meta">${d.desc}</p>
    <p class="card-foot"><span class="price">dès ${euro(d.prix)} <small>indicatif</small></span>${etiquette(d.diametre ?? d.type)}</p>
  </div>
</article>`
}

/** Barre de 12 cases : les mois où une fleur est de saison. */
export function monthBar(mois: number[], current: number): string {
  return `<ol class="mbar" aria-label="Mois de disponibilité">${MOIS_COURTS.map((m, i) => `<li class="${mois.includes(i + 1) ? 'on' : ''}${i + 1 === current ? ' now' : ''}"><span class="sr">${m}</span></li>`).join('')}</ol>`
}

export function orderMailto(subject: string, body: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ctaBand(titre = 'Un bouquet, ça se commande en deux minutes.'): string {
  return `<section class="cta-band"><div class="wrap cta-in">
  <h2 class="h2" data-split>${titre}</h2>
  <div class="cta-actions" data-reveal>
    <a class="btn magnetic" href="${href('composer.html')}">Composer votre bouquet</a>
    <a class="btn btn--ghost" href="${SITE.telHref}">Appeler ${SITE.tel}</a>
  </div>
</div></section>`
}

export function sampleNote(txt = 'Catalogue et prix d’exemple, à remplacer par ceux de la boutique.'): string {
  return `<p class="sample-note" role="note">${txt}</p>`
}

export function mapsLink(label = 'Voir le plan'): string {
  return `<a class="link" href="${SITE.mapsUrl}" target="_blank" rel="noopener">${label}</a>`
}
