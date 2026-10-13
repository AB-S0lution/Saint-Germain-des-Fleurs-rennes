import { bootPage } from '../core/boot'
import { pageHead, ctaBand, monthBar, sampleNote, photoBand } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { stats, SITE } from '../data/site'
import { flowers } from '../data/flowers'
import { plants } from '../data/plants'
import { stemIcon } from '../core/art'
import { euro } from '../core/dom'
import { MOIS } from '../data/months'

const reelles = flowers.filter((f) => f.citee)

bootPage('ferme', ({ month }) => `
${pageHead({ kicker: SITE.ferme.lieu, titre: 'La Ferme aux Mille Fleurs.', lede: 'Entre le moulin de Craca et Port-Lazo, cinq hectares cultivés en plein champ, un seul tunnel, aucune serre chauffée.' })}
<section class="section wrap">
  <div class="grid g-4 stats">
    ${stats.map((s) => `<div class="stat" data-reveal><p class="stat-v display">${s.valeur}</p><p class="stat-l">${s.etiquette}</p><p class="stat-d">${s.detail}</p></div>`).join('')}
  </div>
</section>
<section class="section section--tint">
  <div class="wrap">
    <div class="section-head"><h2 class="h2" data-split>Ce que la ferme cultive</h2><p class="lede">Ces sept fleurs sont citées dans la presse comme venant de la ferme. Leur calendrier ci-dessous est celui de la région : les cases pleines sont les mois de saison.</p></div>
    <ul class="farm-list">
      ${reelles.map((f, i) => `<li class="farm-item" data-reveal><div class="farm-ico">${stemIcon(f, i + 3)}</div><div><h3 class="h3">${f.nom}</h3><p>${f.note}</p>${monthBar(f.mois, month)}<p class="hint">${f.mois.length > 1 ? `De ${MOIS[f.mois[0] - 1]} à ${MOIS[f.mois[f.mois.length - 1] - 1]}` : ''}. Vase : ${f.vase}.</p></div></li>`).join('')}
    </ul>
  </div>
</section>
<section class="section wrap">
  ${photoBand(['champ-fleurs', 'dahlias-jardin', 'champ-marguerites', 'coquelicots', 'champ-melange', 'dahlia-rose'].map(photoBySlug), 'ph-mosaic')}
</section>
<section class="section wrap prose">
  <h2 class="h2" data-split>Sans intrant chimique</h2>
  <p data-reveal>Selon actu.fr, la ferme travaille « sans aucun intrant chimique », sans serre chauffée, avec un seul tunnel. Elle produit aussi du feuillage, des plantes en pot et des plants de légumes. Les fleurs sont donc de saison, et elles ne sont pas toujours parfaites : c’est le prix d’un champ vivant.</p>
  <p data-reveal>Jean-Michel Leven, horticulteur, y est décrit comme « producteur d’hortensias et autres fleurs non loin du moulin de Craca ».</p>
</section>
<section class="section section--tint">
  <div class="wrap">
    <div class="section-head"><h2 class="h2" data-split>Plantes et plants de la ferme</h2><p class="lede">La ferme produit aussi des plantes en pot, des plants de légumes et du feuillage. Leur présence en boutique est à confirmer.</p></div>
    ${sampleNote('Liste et prix d’exemple. Aucune disponibilité réelle n’est annoncée.')}
    <div class="grid g-3">
      ${plants.map((p) => `<article class="plant" data-reveal><p class="plant-type">${p.type}</p><h3 class="h3">${p.nom}</h3><p>${p.desc}</p><p class="hint">${p.entretien}</p><p class="price">${euro(p.prix)} <small>indicatif</small></p></article>`).join('')}
    </div>
  </div>
</section>
${ctaBand()}
`)
