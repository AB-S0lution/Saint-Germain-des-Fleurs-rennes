# Saint Germain des Fleurs, Rennes (maquette de démonstration)

Site vitrine statique, **non officiel**, pour le fleuriste *Saint Germain des Fleurs* (4 place Saint-Germain, Rennes), boutique de ville de la Ferme aux Mille Fleurs de Plouézec. Les faits viennent de sources publiques (voir `PLAN.md`) ; le catalogue, les prix, le journal, la galerie et les témoignages sont des **données d'exemple**.

Concept : **« De Plouézec à Saint-Germain »**, le voyage d'une tige. La page d'accueil fait pousser une tige au défilement, le catalogue et l'accent de couleur suivent le mois courant, et « Composer à la tige » ne propose que les fleurs du mois.

## Pages (16, un HTML + un module par page)

Accueil, Notre histoire, La ferme, La route (défilement horizontal épinglé), Fleurs de saison (roue des mois), Bouquets et créations (catalogue filtrable), Composer votre bouquet (constructeur → mail/téléphone), Fleurs séchées et couronnes, Occasions, Les marchés, Journal, Galerie « Chez vous ! », FAQ, Contact et commande, Mentions légales, Confidentialité, plus `404.html`.

## Pile technique

Vite + TypeScript + Tailwind v4 (jetons et reset), multi-pages. Bibliothèques réellement utilisées :

- **gsap** (ScrollTrigger, SplitText) : tige qui pousse, route épinglée, roue des mois, titres masqués, révélations.
- **lenis** : défilement lissé, synchronisé avec ScrollTrigger.
- Polices locales via `@fontsource` : Fraunces (variable), Instrument Sans, IBM Plex Mono.

Toute l'imagerie est du SVG original généré dans `src/core/art.ts`. Aucune photo, aucun logo de la boutique.

## Commandes

```bash
npm install
npm run dev          # développement
npm run typecheck    # tsc --noEmit
npm run build        # typecheck + build vers dist/
npm run preview      # sert dist/ sous /Saint-Germain-des-Fleurs-rennes/
```

## Structure

- `*.html` à la racine : une coquille par page (titre, méta, JSON-LD sur l'accueil et le contact).
- `src/pages/*.ts` : un module par page (appelle `bootPage`).
- `src/core/` : gabarit (`layout.ts`), mouvement (`motion.ts`), saison (`season.ts`), art SVG (`art.ts`), composants (`ui.ts`).
- `src/data/*.ts` : données typées. `site.ts` = faits réels ; les autres = exemples (indiqué en en-tête).

## Mouvement et accessibilité

Mouvement `transform` / `opacity` / `clip-path` uniquement. Avec `prefers-reduced-motion` : pas de Lenis, pas d'épinglage, la tige est affichée épanouie, la route devient une liste verticale, le composeur fonctionne sans physique. Contrastes pensés pour ≥ 4,5:1, focus visible, mode sombre automatique.

## Ce qui n'est pas vérifié (voir PLAN.md §12)

SIREN et forme juridique, prix, zone de livraison, avis clients réels, logo et couleurs de la marque, services mariage/deuil/abonnements/ateliers (affichés « sur demande »), dimanche et jours de marché (« à confirmer »).

## Déploiement

GitHub Pages via `.github/workflows/deploy.yml` (Settings → Pages → Source = GitHub Actions). Base : `/Saint-Germain-des-Fleurs-rennes/`.
