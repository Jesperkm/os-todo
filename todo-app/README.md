# Os To-do – opsætning

## 1. Læg appen online (gratis, ca. 2 min)
Upload mappen til én af disse (træk-og-slip virker):
- **Netlify Drop**: https://app.netlify.com/drop
- eller GitHub Pages / Vercel / Cloudflare Pages

Du får et https-link. Appen **skal** ligge på https, for at notifikationer og "tilføj til hjemmeskærm" virker.

## 2. Installér på begge iPhones
Safari → åbn linket → Del-knappen → **Føj til hjemmeskærm**. Åbn appen derfra (kræver iOS 16.4+ for notifikationer).

## 3. Synkronisering (så I ser hinandens opgaver)
Uden dette virker appen, men kun lokalt på hver telefon.

1. Opret gratis projekt på https://supabase.com
2. SQL Editor → kør:

```sql
create table todos (
  id uuid primary key,
  room text not null,
  title text not null,
  who text not null,
  due date,
  done boolean not null default false,
  deleted boolean not null default false,
  updated timestamptz not null default now()
);
create index on todos (room);
alter table todos enable row level security;
create policy "open" on todos for all using (true) with check (true);
```

3. Project Settings → API: kopiér **Project URL** og **anon public key**.
4. I appen: ⚙️ → *Synkronisering* → indsæt URL, key og en lang, fælles kode (samme på begge telefoner). Kun jer der kender koden, kan se jeres opgaver, så vælg ikke noget gætteligt.

## 4. Notifikationer
⚙️ → slå Notifikationer til, vælg hvor mange dage før, og hvornår på dagen. Tryk "Tillad".

**Vigtigt:** Denne version viser påmindelser, når appen er åben eller kører i baggrunden. iOS lukker web-apps ned efter et stykke tid, så en lukket app får ikke sendt noget. For helt pålidelig push (også når appen er lukket) kræver det en lille server (fx Supabase Edge Function + cron + Web Push). Service workeren er allerede forberedt til det.

 
