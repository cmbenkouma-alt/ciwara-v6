# CIWARA MÉDIAS V6

Nouvelle version statique, premium et responsive de CIWARA MÉDIAS / Radio Ciwara 105.5 FM.

## Dépôt cible

`cmbenkouma-alt/ciwara-v6` — branche `main`.

Le dépôt historique `cmbenkouma-alt/Ciwaramedias` n'est pas utilisé pour cette version et n'est pas modifié par ce projet.

## Architecture

- `index.html` — accueil V6
- `programme.html` — programmes
- `css/style.css` — design responsive
- `js/app.js` — lecteur, menu, horloge et actualités
- `assets/images/` — images réelles à ajouter
- `assets/icons/` — favicon
- `assets/audio/` — podcasts/replays à ajouter
- `news.json` — données d'actualités statiques
- `.github/workflows/deploy.yml` — publication GitHub Pages vers `gh-pages`

## Flux radio V6

La V6 utilise le flux audio fourni pour le projet : `https://stream.zeno.fm/empfvkwmxkyuv`.

La constante `RADIO_STREAM_URL` se trouve dans `js/app.js`. Le navigateur doit autoriser la lecture du flux pour que le lecteur démarre.

## Prévisualisation GitHub Pages

La V6 est préparée pour une prévisualisation indépendante du site de production.

1. Ouvrir **Settings → Pages** du dépôt `ciwara-v6`.
2. Choisir **Deploy from a branch**.
3. Sélectionner la branche **`gh-pages`** et le dossier **`/ (root)`**.
4. Enregistrer.
5. Prévisualiser sur : `https://cmbenkouma-alt.github.io/ciwara-v6/`

Le workflow publie automatiquement `main` vers `gh-pages` à chaque push sur `main`.

### Domaine de production

Aucun `CNAME` n'est publié pendant la phase de prévisualisation. C'est volontaire : `ciwara-medias.ml` reste attaché à l'ancien site tant que la V6 n'est pas validée.

Ne modifier **aucun DNS** et ne configurer **aucun domaine personnalisé** pour la V6 à ce stade.

## Éléments à configurer

Les éléments suivants restent volontairement identifiés `À CONFIGURER` tant qu'une donnée officielle n'est pas disponible :

- logo image réel dans `assets/images/`
- photos des animateurs/journalistes
- images des actualités
- fichiers audio des podcasts
- numéro WhatsApp officiel
- adresse email officielle
- éventuels liens sociaux supplémentaires
- flux RSS réel si une autre source doit être utilisée
- contenu d'un éventuel back-office

Aucune donnée fictive n'est utilisée pour compléter ces éléments.

## Actualités

`news.json` est vide par sécurité. Il peut être rempli avec des informations réelles selon cette structure :

```json
{
  "items": [
    {
      "source": "Nom réel de la source",
      "title": "Titre réel",
      "description": "Résumé réel",
      "url": "https://exemple.tld/article"
    }
  ]
}
```

## Images et médias

Ajoutez uniquement les fichiers dont vous disposez ou dont vous avez l'autorisation d'utilisation dans `assets/images/` et `assets/audio/`.

Le dépôt V6 ne modifie aucun fichier du site historique.
