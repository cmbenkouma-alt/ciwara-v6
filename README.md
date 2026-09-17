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
- `CNAME` — `ciwara-medias.ml`
- `.github/workflows/deploy.yml` — publication GitHub Pages vers `gh-pages`

## Flux radio retrouvé

L'ancien fichier JavaScript contient comme page/flux de direct : `http://ciwarafm.radiostream321.com/` et une tentative HTTPS du même hôte. La V6 utilise l'URL HTTP retrouvée, sans inventer de nouvelle URL.

Si ce flux est remplacé par un flux audio direct compatible `<audio>`, modifier uniquement `RADIO_STREAM_URL` dans `js/app.js`.

## Éléments à configurer

Les éléments suivants ne disposaient pas d'une ressource fiable et exploitable dans l'ancien dépôt :

- logo image réel dans `assets/images/`
- photos des animateurs/journalistes
- images des actualités
- fichiers audio des podcasts
- numéro WhatsApp officiel
- adresse email officielle
- éventuels liens sociaux supplémentaires
- flux RSS réel si une autre source doit être utilisée
- contenu d'un éventuel back-office

Ils sont volontairement marqués `À CONFIGURER` dans l'interface au lieu d'être remplacés par des données fictives.

## GitHub Pages

1. Ouvrir **Settings → Pages** du dépôt `ciwara-v6`.
2. Vérifier que le déploiement est autorisé par GitHub Actions.
3. Le workflow `.github/workflows/deploy.yml` publie `main` vers `gh-pages`.
4. Le fichier `CNAME` est conservé dans la publication.
5. Ne pas modifier le DNS pendant cette étape de construction.

## Domaine

Le projet contient `CNAME` avec `ciwara-medias.ml`. Le domaine de production historique doit rester inchangé tant que la V6 n'est pas validée. Une bascule DNS/Pages ne doit être faite qu'après validation complète de la V6.

## Actualités

`news.json` est vide par sécurité. Exemple de structure à remplir avec des informations réelles :

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

## Images

Le dépôt historique ne contient pas de dossier d'images exploitable dans son arbre Git actuel. La V6 ne télécharge donc aucune image tierce sans autorisation.

Ajoutez les fichiers réels dans `assets/images/` puis référencez-les depuis le HTML ou le flux d'actualités.
