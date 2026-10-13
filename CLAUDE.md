# Saint Germain des Fleurs, Rennes (démo)

- **Concept**: « De Plouézec à Saint-Germain », le voyage d'une tige. Hero: une tige qui pousse au défilement. Signature: « Composer à la tige » (que les fleurs du mois), puis « La route » (défilement horizontal épinglé).
- **Palette**: Lin #F3EEE4, Granit #2F2D2A, Kraft #C9A27E, Ellébore #5E6F4E, Hortensia #6C7FB0, Renoncule #D9572B (texte #B0421C), Dahlia #7A2E3A, Pivoine #D88A9A. `--saison` (+ `--saison-ink`, `--saison-btn`) suit le mois via `html[data-saison]`. Polices: Fraunces / Instrument Sans / IBM Plex Mono (étiquettes).
- **Source de vérité**: `PLAN.md`. Ne rien inventer: pas de SIREN, prix réels, zone de livraison, avis nommés. Mariage/deuil/abonnements/ateliers = « sur demande ». Jean-Michel Leven (fondateur) et Marie Leven (récit 2020 seulement) sont les seuls noms. Jamais de tiret cadratin dans le texte visible.
- **Lancer**: `npm run dev`; **vérifier**: `npm run typecheck && npm run build`, puis `npm run preview` (base `/Saint-Germain-des-Fleurs-rennes/`).
- **Une page = un HTML racine + un module `src/pages/<id>.ts`** (appelle `bootPage`). Ajouter une page: créer les deux, l'entrée de `src/core/pages.ts` et celle de `vite.config.ts`.
- **Particularités**: rendu côté client (innerHTML dans `#app`); transitions de page = voile « pétale » maison (clip-path), pas les View Transitions inter-documents (le DOM est construit en JS). `typo()` (src/core/dom.ts) met les espaces insécables: passer tout HTML par `setHTML`/`typo`. Mois forcé possible via `?mois=1..12` ou le sélecteur de la page Saisons.
- **Données**: `src/data/*.ts`; `site.ts`, `hours`, `press`, `stats` = réel; le reste = exemple (en-tête de fichier).
- **Mouvement**: classe `js-motion` (script inline) active les états initiaux; reduced-motion = statique. Pas de `transition: all`.
- **Git**: ne jamais committer ni pousser sans demande.
