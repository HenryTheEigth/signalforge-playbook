# Henry's Knowledge Repository

Det här är vår QMD‑drivna kunskapsbank. Den indexeras av QMD varje fem minuter och innehåller både:

1. **Memory-filer** (`memory/YYYY-MM-DD.md`, `MEMORY.md`) – daglig logg + långtidsminne.
2. **Knowledge-mappen** (den här) – strukturerad dokumentation där Henry själv blir bättre på att referera till viktiga fakta, preferenser och produktidéer.

QMD kör hybrid sökning (BM25 + vektorer + reranking) och jag har redan lagt till den här mappen i `memory.qmd.paths`. Det betyder att allt du skriver här blir sökbart av `memory_search` och `memory_get` med `backend: "qmd"`.

> **Vad Henry gör med det här:** han kan:
> - Söka igenom hela kunskapsbanken och svara på frågor med referenser (källa visas som `Source: path#line`).
> - Hålla koll på projekt, preferenser och säkerhetsregler.
> - Skriva rapporter till dig baserat på faktauppdateringar här.

För att hålla det livat:

- För varje ny process (produkt, jobb, idé) lägg till ett avsnitt här.
- Uppdatera tacit knowledge-filen med lessons/heuristics så Henry kan referera.
- Skriv ner idéer, metrics och ansvar i `knowledge/project-ideas.md`.

Den här filen kan också uppdateras av Henry själv när han tar nya steg. Be honom gärna beskriva en idé i det här formatet så den blir en permanent del av vår memory stack.
