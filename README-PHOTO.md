# 📸 Guide pour Ajouter Votre Photo

## 🎯 Comment Ajouter Votre Photo dans le Portfolio

### 1. **Préparer Votre Photo**
- **Format recommandé** : JPG, PNG ou WebP
- **Taille recommandée** : 400x400 pixels minimum (carré)
- **Qualité** : Haute qualité pour un rendu professionnel
- **Style** : Photo professionnelle avec un bon éclairage

### 2. **Placer Votre Photo**
1. **Copiez votre photo** dans le dossier `portfolio/public/`
2. **Renommez-la** en `votre-photo.jpg` (ou .png/.webp)
3. **Ou modifiez le code** pour utiliser votre nom de fichier

### 3. **Modifier le Code (Optionnel)**
Si vous voulez utiliser un nom de fichier différent, modifiez cette ligne dans `src/app/page.tsx` :

```tsx
<img
  src="/votre-photo.jpg" // ← Changez ceci par votre nom de fichier
  alt="Leslie OUINSOU - Développeuse Full Stack"
  className="w-full h-full object-cover object-center"
  // ... reste du code
/>
```

### 4. **Exemples de Noms de Fichiers Valides**
- `/photo.jpg`
- `/profile.png`
- `/leslie-ouinsou.webp`
- `/moi.jpg`

### 5. **Fonctionnalités Incluses**
✅ **Bordure décorative** avec gradient bleu #0077FF  
✅ **Forme circulaire** parfaite  
✅ **Responsive** sur tous les écrans  
✅ **Fallback** avec emoji si la photo ne charge pas  
✅ **Éléments décoratifs** flottants animés  
✅ **Indicateur de statut** vert animé  
✅ **Optimisation** avec `object-cover`  

### 6. **Structure des Dossiers**
```
portfolio/
├── public/
│   └── votre-photo.jpg ← Placez votre photo ici
├── src/
│   └── app/
│       └── page.tsx ← Code modifié ici
└── ...
```

### 7. **Test**
1. **Ajoutez votre photo** dans `public/`
2. **Lancez le serveur** : `npm run dev`
3. **Vérifiez** que votre photo s'affiche correctement
4. **Testez la responsivité** sur différents écrans

### 8. **Personnalisation Avancée**
Vous pouvez aussi modifier :
- **Taille** : Changez les classes `w-64 h-64` etc.
- **Bordure** : Modifiez les couleurs du gradient
- **Forme** : Changez `rounded-full` pour d'autres formes
- **Animations** : Ajustez les délais des éléments décoratifs

---

## 🚀 Prêt à Ajouter Votre Photo ?

1. **Placez votre photo** dans `portfolio/public/`
2. **Renommez-la** en `votre-photo.jpg` ou modifiez le code
3. **Testez** avec `npm run dev`
4. **Profitez** de votre portfolio personnalisé !

---

*💡 Conseil : Utilisez une photo professionnelle avec un fond neutre pour un rendu optimal !* 