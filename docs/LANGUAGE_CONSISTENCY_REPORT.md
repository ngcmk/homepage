# 🌐 Language Consistency Report - NGC Homepage

**Datum**: Februar 3, 2026  
**Status**: ⚠️ **ISSUES DETECTED** - Zahteva hitnu akciju

---

## 📋 Pregled problema

Analiza je pokazala **neusaglašenost u jezicima** (English, Македonski, Srpski) u sljedećim dijelovima:

---

## 🔴 KRITIČNI PROBLEMI

### 1. **Nedostaju ključevi u `mk.ts` (Makedonski)**

#### Problem: Nedostaje `footer` objekt
- `en.ts` ima kompletnu `footer` sekcion
- `mk.ts` **NEMA** `footer` sekcion
- `sr.ts` ima `footer` sekcion (samo u en.fixed.ts je polno)

**Šta nedostaje u mk.ts:**
```typescript
footer: {
  description: "Transform your ideas into exceptional digital experiences..."
  copyright: "© {year} NGC. All rights reserved."
  sections: { services, company }
  links: { services, company, legal }
}
```

**Status**: ❌ **HITNO** - Footer se ne može prikazati na makedonskom

---

### 2. **Nedostaju ključevi u `en.ts` (Engleski)**

#### Problem: Nema `project.initialize` strukture
- `sr.ts` ima detaljnu `project.initialize` strukturu (20+ ključeva)
- `mk.ts` ima `project.initialize` sa većinom ključeva
- `en.ts` ima samo `project.thankYou`, ali **NEMA**:
  - `project.initialize.title`
  - `project.initialize.subtitle`
  - `project.initialize.steps`
  - `project.initialize.fields`
  - `project.initialize.placeholders`
  - Sve ostale inicijalizacijske forme

**Status**: ❌ **KRITIČNO** - Initialize project forma će biti sa engleskim tekstom umjesto iz translacija

---

### 3. **Nedostaju ključevi u `sr.ts` (Srpski)**

#### Problem: Strukturna razlika
- `sr.ts` ima `contactExtra` sekcion (novija verzija)
- `en.ts` i `mk.ts` **NEMAJU** `contactExtra` - ima samo `contact.hub`
- Duplikat koda između `contact.hub` i `contactExtra.hub`

**Status**: ⚠️ **UPOZORENJE** - Redundanta struktura

---

## 🟡 SREDNJE VAŽNI PROBLEMI

### 4. **Netačne vrijednosti u telefonima**

**en.ts (linija 107)**:
```typescript
value: "+389 78 209046"  // NEDOSTAJE razmak
```

**sr.ts (linija 105)**:
```typescript
value: "+389 70 294 386"  // Različit broj od en.ts
```

**mk.ts (linija 177)**:
```typescript
value: "+389 70 294 386"  // Ista kao sr.ts, drugačija od en.ts
```

**Status**: ⚠️ **NEUSAGLAŠENO** - CTO telefonski broj se razlikuje

---

### 5. **Nedosledni HR razgovori**

**en.ts**: 
```typescript
hours: { label: "Business Hours", value: "Mon-Fri: 9AM - 6PM CET" }
```

**mk.ts**:
```typescript
hours: { label: "Работно време", value: "Пон-Пет: 9-18 часот" }
```

**sr.ts**:
```typescript
hours: { label: "Radno vreme", value: "Pon-Pet: 9-18h" }
```

**Status**: 🟡 **MINOR** - Formatiranje je drugačito ali semantika je ista

---

### 6. **CTO imena se razlikuju**

**en.ts**: 
```typescript
"Dimitar, CTO & Co-founder"
```

**mk.ts**:
```typescript
"Димитар, технички директор и соосновач"
```

**sr.ts**:
```typescript
"Dimitrije, tehnički direktor i suosnivač"
```

**Status**: 🟡 **UPOZORENJE** - Ime je drugačije u srpskom (Dimitrije vs Dimitar)

---

## 🔵 SITNI PROBLEMI (Formatiranje)

### 7. **Lokacija imena**

Sve tri datoteke imaju `location.value: "Skopje/Skoplje, Macedonia/Makedonija"` ali sa malim razlikama:
- `en.ts`: "Skopje, Macedonia"
- `mk.ts`: "Скопје, Македонија"  
- `sr.ts`: "Skoplje, Makedonija"

**Status**: ✓ Logično u redu

---

### 8. **Hardcoded tekst koji nije lokalizovan**

**Datoteke sa TODO komentarima:**
- `app/components/Testimonials.tsx` - "TODO: Replace or remove testimonial"
- `app/components/Portfolio.tsx` - "TODO: Replace portfolio with tech stack"

**Status**: 🟡 Trebalo bi lokalizirati ili ukloniti

---

## 📊 SUMMARY TABLE

| Problem | en.ts | mk.ts | sr.ts | Prioritet |
|---------|-------|-------|-------|-----------|
| footer objekt | ✅ | ❌ MISSING | ✅ | KRITIČNO |
| project.initialize | ❌ PARTIAL | ✅ | ✅ | KRITIČNO |
| contactExtra | ❌ | ❌ | ✅ | VISOKO |
| CTO telefon | +389 78 209046 | +389 70 294 386 | +389 70 294 386 | SREDNJE |
| CTO ime | Dimitar | Димитар | Dimitrije | SREDNJE |
| Business hours format | 9AM-6PM | 9-18ч | 9-18h | NISKO |

---

## ✅ TO-DO LIST ZA POPRAVKU

### Prioritet 1 (HITNO):
- [ ] Dodaj `footer` sekcion u `mk.ts` sa svim ključevima iz `en.ts`
- [ ] Dodaj `project.initialize` kompletnu strukturu u `en.ts`
- [ ] Ukloni `contactExtra` iz `sr.ts` ili dodaj u `en.ts` i `mk.ts`

### Prioritet 2 (VAŽNO):
- [ ] Standardizuj CTO telefone na svim jezicima (koji je točan broj?)
- [ ] Standardizuj CTO imena (Dimitar, Dimitrije ili Dimitar?)

### Prioritet 3 (PREPORUKA):
- [ ] Ujednači format vremena (12h vs 24h)
- [ ] Lokalizuj TODO tekstove ili ih ukloni

---

## 🔍 Kako provjeriti

```bash
# Pokreni grep za nedostajuće ključeve
grep -n "footer:" app/translations/*.ts
grep -n "project.initialize:" app/translations/*.ts
grep -n "contactExtra:" app/translations/*.ts
```

---

## 📝 Napomene

1. **en.ts** ima import koji ne bi trebalo biti:
   ```typescript
   import ThankYou from "../thank-you/page";
   ```
   Ovo se koristi u datoteci ali nije dio strukture.

2. **sr.ts** ima više linija nego en.ts i mk.ts - trebalo bi sinhronizirati strukturu

3. Postoji `en.fixed.ts` datoteka koja se ne koristi - trebalo bi je obrisati ili koristiti

---

**Objavio**: AI Assistant  
**Prioritet**: 🔴 **HITNO POTREBNA AKCIJA**
