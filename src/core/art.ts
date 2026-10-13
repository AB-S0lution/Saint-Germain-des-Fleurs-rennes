// Imagerie originale : toutes les fleurs, bouquets et vases sont dessinés en SVG, sans photo.
import { flowerById, type Flower } from '../data/flowers'

export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Éclaircit (amt > 0) ou assombrit (amt < 0) une couleur #rrggbb. */
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(amt >= 0 ? v + (255 - v) * amt : v * (1 + amt))))
  const r = ch((n >> 16) & 255)
  const g = ch((n >> 8) & 255)
  const b = ch(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

const f1 = (n: number): string => n.toFixed(1)

function petals(n: number, r: number, w: number, fill: string, rot = 0, cy = 0): string {
  let s = ''
  for (let i = 0; i < n; i++) {
    const a = (360 / n) * i + rot
    s += `<ellipse class="petal" cx="0" cy="${f1(-r * 0.55 + cy)}" rx="${f1(w)}" ry="${f1(r * 0.55)}" transform="rotate(${f1(a)})" fill="${fill}"/>`
  }
  return s
}

/** Tête de fleur centrée sur (0, 0), rayon approximatif `r`. */
export function head(kind: Flower['kind'], c1: string, c2: string, r: number, seed = 1): string {
  const rnd = rng(seed * 977 + 13)
  switch (kind) {
    case 'rosette': {
      const rings = [[10, 1, 0.5, shade(c1, -0.12)], [9, 0.8, 0.46, c1], [8, 0.6, 0.4, shade(c1, 0.14)], [6, 0.4, 0.32, shade(c1, 0.26)], [5, 0.22, 0.2, c2]] as const
      return rings.map(([n, k, w, col], i) => petals(n, r * k, r * w, col, i * 17 + rnd() * 10)).join('') + `<circle r="${f1(r * 0.07)}" fill="${shade(c2, -0.2)}"/>`
    }
    case 'cup': {
      const h = r * 1.15
      return `<path class="petal" d="M0 ${f1(h * 0.5)}C${f1(-r * 0.95)} ${f1(h * 0.35)} ${f1(-r * 0.8)} ${f1(-h * 0.45)} ${f1(-r * 0.15)} ${f1(-h * 0.85)}C${f1(-r * 0.05)} ${f1(-h * 0.2)} ${f1(-r * 0.05)} ${f1(h * 0.1)} 0 ${f1(h * 0.5)}Z" fill="${shade(c1, -0.1)}"/>` +
        `<path class="petal" d="M0 ${f1(h * 0.5)}C${f1(r * 0.95)} ${f1(h * 0.35)} ${f1(r * 0.8)} ${f1(-h * 0.45)} ${f1(r * 0.15)} ${f1(-h * 0.85)}C${f1(r * 0.05)} ${f1(-h * 0.2)} ${f1(r * 0.05)} ${f1(h * 0.1)} 0 ${f1(h * 0.5)}Z" fill="${shade(c1, -0.1)}"/>` +
        `<path class="petal" d="M${f1(-r * 0.6)} ${f1(h * 0.4)}C${f1(-r * 0.75)} ${f1(-h * 0.2)} ${f1(-r * 0.3)} ${f1(-h * 0.8)} 0 ${f1(-h)}C${f1(r * 0.3)} ${f1(-h * 0.8)} ${f1(r * 0.75)} ${f1(-h * 0.2)} ${f1(r * 0.6)} ${f1(h * 0.4)}Q0 ${f1(h * 0.62)} ${f1(-r * 0.6)} ${f1(h * 0.4)}Z" fill="${c1}"/>` +
        `<path d="M0 ${f1(h * 0.48)}C${f1(-r * 0.18)} ${f1(h * 0.1)} ${f1(-r * 0.12)} ${f1(-h * 0.45)} 0 ${f1(-h * 0.9)}" stroke="${shade(c1, 0.3)}" stroke-width="${f1(r * 0.05)}" fill="none" opacity=".6"/>`
    }
    case 'daisy': {
      const n = 14
      return petals(n, r, r * 0.17, c1, 0) + petals(n, r * 0.8, r * 0.14, shade(c1, -0.12), 360 / n / 2) + `<circle r="${f1(r * 0.3)}" fill="${c2}"/><circle r="${f1(r * 0.17)}" fill="${shade(c2, -0.3)}"/>`
    }
    case 'globe': {
      let s = ''
      const N = 34
      for (let i = 0; i < N; i++) {
        const a = i * 2.39996
        const d = Math.sqrt((i + 0.5) / N) * r * 0.92
        const x = Math.cos(a) * d
        const y = Math.sin(a) * d
        const col = rnd() > 0.5 ? c1 : rnd() > 0.5 ? c2 : shade(c1, -0.12)
        s += `<g class="petal" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rnd() * 90)})">` + [0, 90, 180, 270].map((q) => `<ellipse cx="0" cy="${f1(-r * 0.13)}" rx="${f1(r * 0.1)}" ry="${f1(r * 0.14)}" transform="rotate(${q})" fill="${col}"/>`).join('') + `<circle r="${f1(r * 0.04)}" fill="${shade(c2, 0.3)}"/></g>`
      }
      return s
    }
    case 'hellebore': {
      return petals(5, r * 0.95, r * 0.42, shade(c1, -0.06), 10) + petals(5, r * 0.75, r * 0.3, c1, 46) +
        Array.from({ length: 12 }, (_, i) => `<circle cx="${f1(Math.cos(i * 0.52) * r * 0.2)}" cy="${f1(Math.sin(i * 0.52) * r * 0.2)}" r="${f1(r * 0.05)}" fill="${c2}"/>`).join('') + `<circle r="${f1(r * 0.1)}" fill="${shade(c2, 0.35)}"/>`
    }
    case 'pompon': {
      const rings: [number, number, number][] = [[20, 1, 0.16], [16, 0.82, 0.15], [12, 0.62, 0.14], [8, 0.4, 0.12]]
      return rings.map(([n, k, w], i) => petals(n, r * k, r * w, i % 2 ? c1 : shade(c1, -0.14 + i * 0.05), i * 11)).join('') + `<circle r="${f1(r * 0.1)}" fill="${c2}"/>`
    }
    case 'spike': {
      let s = ''
      const L = 16
      for (let i = 0; i < L; i++) {
        const t = i / (L - 1)
        const y = r * 0.5 - t * r * 2.2
        const w = r * (0.34 - t * 0.2)
        const side = i % 2 ? 1 : -1
        s += `<circle class="petal" cx="${f1(side * w * 0.55)}" cy="${f1(y)}" r="${f1(w)}" fill="${i % 3 ? c1 : c2}"/>`
      }
      return s
    }
    case 'berry': {
      let s = `<path d="M0 ${f1(r * 0.8)}Q${f1(r * 0.1)} 0 ${f1(-r * 0.8)} ${f1(-r * 0.6)}M0 ${f1(r * 0.1)}Q${f1(r * 0.5)} ${f1(-r * 0.2)} ${f1(r * 0.8)} ${f1(-r * 0.5)}" stroke="${shade(c2, -0.3)}" stroke-width="${f1(r * 0.07)}" fill="none"/>`
      for (let i = 0; i < 14; i++) {
        const x = (rnd() - 0.5) * r * 1.7
        const y = (rnd() - 0.6) * r * 1.5
        s += `<circle class="petal" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * (0.13 + rnd() * 0.07))}" fill="${c1}"/><circle cx="${f1(x - r * 0.04)}" cy="${f1(y - r * 0.04)}" r="${f1(r * 0.03)}" fill="#fff" opacity=".5"/>`
      }
      return s
    }
    case 'leaf': {
      let s = ''
      for (let i = 0; i < 7; i++) {
        const a = -60 + i * 20
        s += `<path class="petal" d="M0 ${f1(r * 0.4)}C${f1(-r * 0.3)} ${f1(-r * 0.1)} ${f1(-r * 0.2)} ${f1(-r * 0.8)} 0 ${f1(-r * 1.1)}C${f1(r * 0.2)} ${f1(-r * 0.8)} ${f1(r * 0.3)} ${f1(-r * 0.1)} 0 ${f1(r * 0.4)}Z" transform="rotate(${a})" fill="${i % 2 ? c1 : c2}"/>`
      }
      return s
    }
    case 'umbel': {
      let s = ''
      for (let i = 0; i < 38; i++) {
        const a = rnd() * Math.PI * 2
        const d = Math.sqrt(rnd()) * r * 0.95
        const x = Math.cos(a) * d
        const y = Math.sin(a) * d * 0.8
        s += `<circle class="petal" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * (0.07 + rnd() * 0.05))}" fill="${rnd() > 0.7 ? c2 : c1}"/>`
      }
      return s
    }
  }
}

export function flowerHead(f: Flower, r: number, seed = 1): string {
  return head(f.kind, f.teintes[0], f.teintes[1], r, seed)
}

/** Une tige seule, pour le banc de « Composer à la tige » (viewBox 0 0 80 150). */
export function stemIcon(f: Flower, uid: number): string {
  const green = f.kind === 'leaf' ? shade(f.teintes[1], -0.1) : '#5E6F4E'
  return `<svg viewBox="0 0 80 150" aria-hidden="true" focusable="false" class="stem-icon"><path d="M40 146C38 110 42 90 40 58" stroke="${green}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M40 112C26 108 20 96 20 86C32 90 40 98 40 112Z" fill="${green}" opacity=".85"/><g transform="translate(40 46)">${flowerHead(f, f.kind === 'spike' ? 14 : 24, uid)}</g></svg>`
}

interface BouquetOpts {
  seed?: number
  w?: number
  h?: number
  wrap?: string
  /** liste de [id de fleur, nombre de tiges] */
  tiges: [string, number][]
  /** index de la tête à marquer comme nouvelle */
  newest?: string
  bg?: boolean
}

/** Bouquet en papier kraft. Les têtes ont la classe `.bq-head` et data-key pour l'animation. */
export function bouquetSVG(o: BouquetOpts): string {
  const w = o.w ?? 300
  const h = o.h ?? 360
  const rnd = rng((o.seed ?? 3) * 31 + 7)
  const wrap = o.wrap ?? '#C9A27E'
  const heads: { f: Flower; x: number; y: number; r: number; rot: number; key: string; seed: number }[] = []
  const all: Flower[] = []
  for (const [id, n] of o.tiges) for (let i = 0; i < n; i++) all.push(flowerById(id))
  const total = Math.max(all.length, 1)
  const cx = w / 2
  const baseY = h * 0.9
  const domeY = h * 0.38
  const spread = Math.min(w * 0.36, 40 + total * 9)
  // plus les fleurs sont nombreuses, plus l'éventail est large ; les foliages passent derrière
  const order = [...all.keys()].sort((a, b) => (all[a].kind === 'leaf' ? -1 : 0) - (all[b].kind === 'leaf' ? -1 : 0))
  const counters: Record<string, number> = {}
  order.forEach((idx, k) => {
    const f = all[idx]
    const t = total === 1 ? 0.5 : ((k * 0.61803) % 1)
    const ang = (t - 0.5) * 2
    const ring = 0.45 + 0.55 * rnd()
    const x = cx + ang * spread * (0.6 + ring * 0.5)
    const y = domeY - (1 - Math.abs(ang)) * h * 0.1 + (rnd() - 0.4) * h * 0.1 + (f.kind === 'leaf' ? -h * 0.02 : 0)
    const baseR = f.kind === 'globe' ? 38 : f.kind === 'leaf' ? 32 : f.kind === 'spike' ? 20 : f.kind === 'umbel' ? 26 : 26
    const n = (counters[f.id] = (counters[f.id] ?? 0) + 1)
    heads.push({ f, x, y, r: baseR * (0.85 + rnd() * 0.3) * Math.min(1.05, 0.8 + 6 / (total + 8)), rot: ang * 14 + (rnd() - 0.5) * 20, key: `${f.id}-${n}`, seed: Math.floor(rnd() * 1000) })
  })
  const stems = heads.map((hd) => {
    const c1x = cx + (hd.x - cx) * 0.2
    return `<path d="M${f1(cx)} ${f1(baseY)}C${f1(c1x)} ${f1(baseY - h * 0.25)} ${f1(hd.x - (hd.x - cx) * 0.2)} ${f1(hd.y + h * 0.2)} ${f1(hd.x)} ${f1(hd.y)}" stroke="#5E6F4E" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
  }).join('')
  const leaves = heads.filter((_, i) => i % 2 === 0).map((hd, i) => {
    const lx = cx + (hd.x - cx) * 0.55
    const ly = baseY - (baseY - hd.y) * 0.45
    const dir = hd.x < cx ? -1 : 1
    return `<path d="M${f1(lx)} ${f1(ly)}q${f1(dir * 26)} ${f1(-4 - (i % 3) * 5)} ${f1(dir * 38)} ${f1(-26)}q${f1(-dir * 22)} ${f1(2)} ${f1(-dir * 38)} ${f1(26)}z" fill="#6B8F4E" opacity=".85"/>`
  }).join('')
  const headSvg = heads.map((hd) => `<g class="bq-head${o.newest === hd.f.id ? ' is-new' : ''}" data-key="${hd.key}" transform="translate(${f1(hd.x)} ${f1(hd.y)}) rotate(${f1(hd.rot)})"><g class="bq-in">${flowerHead(hd.f, hd.r, hd.seed)}</g></g>`).join('')
  const top = baseY - h * 0.42
  const wrapSvg = `<g><path d="M${f1(cx - w * 0.2)} ${f1(top)}L${f1(cx + w * 0.2)} ${f1(top)}L${f1(cx + w * 0.07)} ${f1(h * 0.975)}L${f1(cx - w * 0.07)} ${f1(h * 0.975)}Z" fill="${wrap}"/><path d="M${f1(cx - w * 0.2)} ${f1(top)}L${f1(cx)} ${f1(top + h * 0.13)}L${f1(cx + w * 0.2)} ${f1(top)}Z" fill="${shade(wrap, 0.18)}"/><path d="M${f1(cx)} ${f1(top + h * 0.13)}L${f1(cx - w * 0.065)} ${f1(h * 0.975)}M${f1(cx)} ${f1(top + h * 0.13)}L${f1(cx + w * 0.065)} ${f1(h * 0.975)}" stroke="${shade(wrap, -0.2)}" stroke-width="1.2" opacity=".6"/><path d="M${f1(cx - w * 0.115)} ${f1(top + h * 0.2)}Q${f1(cx)} ${f1(top + h * 0.25)} ${f1(cx + w * 0.115)} ${f1(top + h * 0.2)}" stroke="#2F2D2A" stroke-width="2.2" fill="none" opacity=".75"/></g>`
  const bg = o.bg === false ? '' : `<rect width="${w}" height="${h}" fill="none"/>`
  return `<svg viewBox="0 0 ${w} ${h}" role="img" class="bq-svg" preserveAspectRatio="xMidYMax meet">${bg}${stems}${leaves}${headSvg}${wrapSvg}</svg>`
}

/** Vase posé sur un rebord, avec une pièce suggérée en fond (galerie « Chez vous ! »). */
export function vaseSVG(fleurs: string[], vase: string, ratio: 'portrait' | 'carre' | 'paysage', seed: number, lieu = ''): string {
  const w = ratio === 'paysage' ? 400 : 300
  const h = ratio === 'portrait' ? 400 : 300
  const rnd = rng(seed * 53 + 5)
  const palettes = [['#E8DFCF', '#D9CDB7', '#C9A27E'], ['#DDE3D6', '#C5D0BF', '#8A9A78'], ['#E4DBE0', '#D3C6CE', '#9B7C8C'], ['#D9DFE8', '#C2CCDC', '#7C8FB5'], ['#EBDCCB', '#DBC4A9', '#B98963']]
  const p = palettes[seed % palettes.length]
  const floorY = h * 0.78
  const vw = vase === 'bouteille' ? 22 : vase === 'verre' ? 30 : vase === 'cruche' ? 52 : vase === 'bocal' ? 46 : 44
  const vh = vase === 'bouteille' ? 96 : vase === 'verre' ? 56 : vase === 'cruche' ? 84 : vase === 'bocal' ? 62 : 74
  const cx = w * (0.4 + rnd() * 0.2)
  const vcol = ['#B9C6C2', '#8F8A7A', '#C98B5E', '#E9E4D6', '#7C8FA0'][seed % 5]
  const vy = floorY - vh
  let vasePath = ''
  if (vase === 'bouteille') vasePath = `<path d="M${cx - vw / 2} ${floorY}V${vy + 36}Q${cx - vw / 2} ${vy + 26} ${cx - 6} ${vy + 18}V${vy}H${cx + 6}V${vy + 18}Q${cx + vw / 2} ${vy + 26} ${cx + vw / 2} ${vy + 36}V${floorY}Z`
  else if (vase === 'verre') vasePath = `<path d="M${cx - vw / 2} ${vy}H${cx + vw / 2}L${cx + vw / 2 - 4} ${floorY}H${cx - vw / 2 + 4}Z`
  else if (vase === 'bocal') vasePath = `<path d="M${cx - vw / 2 + 4} ${vy}H${cx + vw / 2 - 4}Q${cx + vw / 2 + 6} ${vy + 12} ${cx + vw / 2} ${vy + 30}Q${cx + vw / 2} ${floorY} ${cx + vw / 2 - 8} ${floorY}H${cx - vw / 2 + 8}Q${cx - vw / 2} ${floorY} ${cx - vw / 2} ${vy + 30}Q${cx - vw / 2 - 6} ${vy + 12} ${cx - vw / 2 + 4} ${vy}Z`
  else vasePath = `<path d="M${cx - vw * 0.3} ${vy}H${cx + vw * 0.3}Q${cx + vw * 0.6} ${vy + vh * 0.35} ${cx + vw / 2} ${floorY - 6}Q${cx + vw / 2} ${floorY} ${cx + vw / 2 - 8} ${floorY}H${cx - vw / 2 + 8}Q${cx - vw / 2} ${floorY} ${cx - vw / 2} ${floorY - 6}Q${cx - vw * 0.6} ${vy + vh * 0.35} ${cx - vw * 0.3} ${vy}Z`
  const items: string[] = []
  const stems: string[] = []
  const n = Math.min(9, 4 + fleurs.length * 2)
  for (let i = 0; i < n; i++) {
    const f = flowerById(fleurs[i % fleurs.length])
    const ang = ((i / (n - 1)) - 0.5) * 2
    const x = cx + ang * w * 0.2 + (rnd() - 0.5) * 14
    const y = vy - 20 - (1 - Math.abs(ang)) * h * 0.22 - rnd() * h * 0.12
    const r = (f.kind === 'globe' ? 36 : f.kind === 'spike' ? 18 : 24) * (0.85 + rnd() * 0.3)
    stems.push(`<path d="M${cx + ang * 4} ${vy + 8}Q${(cx + x) / 2} ${(vy + y) / 2 + 10} ${x} ${y}" stroke="#5E6F4E" stroke-width="2.4" fill="none"/>`)
    items.push(`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang * 12)})">${flowerHead(f, r, seed + i)}</g>`)
  }
  const window = lieu === 'rebord de fenêtre' ? `<rect x="${w * 0.58}" y="${h * 0.1}" width="${w * 0.32}" height="${h * 0.48}" rx="3" fill="#F8F3E6" opacity=".8"/><path d="M${w * 0.74} ${h * 0.1}V${h * 0.58}M${w * 0.58} ${h * 0.34}H${w * 0.9}" stroke="${p[1]}" stroke-width="2"/>` : ''
  return `<svg viewBox="0 0 ${w} ${h}" role="img" class="vase-svg" preserveAspectRatio="xMidYMid slice"><rect width="${w}" height="${h}" fill="${p[0]}"/><rect y="${floorY}" width="${w}" height="${h - floorY}" fill="${p[2]}" opacity=".55"/><rect y="${floorY}" width="${w}" height="3" fill="${p[1]}"/>${window}${stems.join('')}<path d="${vasePath.replace(/^<path d="/, '')}" fill="${vcol}" opacity=".92"/>${items.join('')}<ellipse cx="${cx}" cy="${floorY + 3}" rx="${vw * 0.7}" ry="3" fill="#2F2D2A" opacity=".18"/></svg>`
}

/** Couronne séchée (page fleurs séchées). */
export function wreathSVG(fleurs: string[], seed: number, base: string): string {
  const rnd = rng(seed * 17 + 3)
  let s = `<circle cx="150" cy="150" r="88" fill="none" stroke="${shade(base, -0.35)}" stroke-width="10" opacity=".55"/>`
  const N = 22
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + rnd() * 0.15
    const f = flowerById(fleurs[i % fleurs.length])
    const x = 150 + Math.cos(a) * 88
    const y = 150 + Math.sin(a) * 88
    const r = (f.kind === 'globe' ? 30 : 20) * (0.8 + rnd() * 0.5)
    s += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1((a * 180) / Math.PI)})" opacity=".96">${flowerHead(f, r, i + seed)}</g>`
  }
  return `<svg viewBox="0 0 300 300" role="img" class="wreath-svg">${s}</svg>`
}

/** Marque de la boutique : une tige et un bouton. */
export function markSVG(): string {
  return `<svg viewBox="0 0 32 40" aria-hidden="true" focusable="false" class="mark"><path d="M16 38C15 28 17 22 16 14" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M16 26C10 25 6 20 6 15C12 17 16 21 16 26Z" fill="currentColor" opacity=".55"/><path d="M16 14C10 12 9 6 16 2C23 6 22 12 16 14Z" fill="var(--saison)"/></svg>`
}

/** Petites scènes pour « La route ». */
export function sceneSVG(id: string, vedette: Flower): string {
  const stem = (x: number, h: number, i: number) => `<path d="M${x} 190q${i % 2 ? 6 : -6} ${-h / 2} 0 ${-h}" stroke="#5E6F4E" stroke-width="3" fill="none"/><g transform="translate(${x} ${190 - h})">${flowerHead(vedette, 22 + (i % 3) * 4, i + 2)}</g>`
  const ground = '<path d="M0 190H320" stroke="#2F2D2A" stroke-width="2" opacity=".35"/>'
  switch (id) {
    case 'ferme':
      return `<svg viewBox="0 0 320 210" class="scene" role="img" aria-label="Un champ de fleurs">${ground}${[30, 75, 120, 165, 210, 255, 295].map((x, i) => stem(x, 70 + ((i * 37) % 60), i)).join('')}<path d="M0 205Q80 180 160 200T320 195V210H0Z" fill="#5E6F4E" opacity=".35"/></svg>`
    case 'route':
      return `<svg viewBox="0 0 320 210" class="scene" role="img" aria-label="Des seaux de fleurs dans un camion"><rect x="30" y="110" width="170" height="70" rx="6" fill="#C9A27E"/><rect x="200" y="130" width="70" height="50" rx="6" fill="#2F2D2A" opacity=".85"/><circle cx="70" cy="184" r="14" fill="#2F2D2A"/><circle cx="235" cy="184" r="14" fill="#2F2D2A"/>${[55, 95, 135, 170].map((x, i) => `<g transform="translate(${x} 112)">${flowerHead(vedette, 16 + (i % 2) * 5, i + 20)}</g>`).join('')}${ground}</svg>`
    case 'boutique':
      return `<svg viewBox="0 0 320 210" class="scene" role="img" aria-label="La façade de la boutique et le clocher de l’église"><rect x="200" y="30" width="60" height="150" fill="#2F2D2A" opacity=".18"/><path d="M200 30L230 -6 260 30Z" fill="#2F2D2A" opacity=".28"/><rect x="40" y="90" width="170" height="92" fill="#EAE3D4" stroke="#2F2D2A" stroke-width="2"/><path d="M34 90H216L204 66H46Z" fill="#5E6F4E"/><rect x="62" y="110" width="52" height="72" fill="#2F2D2A" opacity=".75"/><rect x="132" y="112" width="60" height="44" fill="#F3EEE4" stroke="#2F2D2A" stroke-width="2"/>${[142, 162, 182].map((x, i) => `<g transform="translate(${x} 150)">${flowerHead(vedette, 11, i + 31)}</g>`).join('')}${ground}</svg>`
    default:
      return `<svg viewBox="0 0 320 210" class="scene" role="img" aria-label="Un étal de marché"><path d="M30 80H290L270 40H50Z" fill="#D9572B"/><path d="M30 80H290V92Q260 108 230 92T170 92T110 92T50 92T30 92Z" fill="#F3EEE4" stroke="#2F2D2A" stroke-width="1.5"/><rect x="40" y="120" width="240" height="60" fill="#C9A27E"/>${[75, 125, 175, 225].map((x, i) => `<g transform="translate(${x} 108)">${flowerHead(vedette, 20 + (i % 2) * 4, i + 11)}</g>`).join('')}${ground}</svg>`
  }
}
