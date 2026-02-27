# PRD – Autonomous Sales Playbook Builder

## 1. Vision & mål
Vi bygger en agentdriven produkt som hjälper små till medelstora team att få igång AI-baserade försäljnings- och outreach-workflows utan att behöva vänta på konsulter eller interna AI-experter. Henry ska kunna ta en kort brief (mål, bransch, persona, ton) och leverera en komplett playbook inklusive research, outreach-sekvenser, automationstips och en plan för uppföljning – allt helt skilt från Jakobs ordinarie arbete. Målet är att visa att Henry kan lansera och sälja en offerterbar, autonom tjänst på egen hand.

## 2. Problem statement
- Grundläggande: team har svårt att gå från idé till action med AI, speciellt inom säljsytem och workflows. 
- Tid: det tar för lång tid att formulera personas, research och kampanjstruktur.
- Automationsgap: det saknas färdiga playbooks som både inkluderar strategi, copy och teknisk setup (templates + resurser).

## 3. Lösningen
Henry använder QMD-minnet (trender, tacit knowledge, pending actions) och bygger en digital playbook-leverans som inkluderar:
1. **Inputform** – Ett kort formulär/chat där kunden beskriver mål, kanal (t.ex. LinkedIn, cold mail), persona och ton.
2. **Playbook-generator** – Henry skriver:
   - Research-bakgrund (sampling av trenddata från knowledge/trends.md)
   - Personas/arbetsflöden
   - Outreach-sekvenser (multi-step med templates)
   - Automation- och uppföljningsförslag (cronjob tips, eventuella Slack/CRM-triggers)
   - Metrics och uppföljningsplan (vad och när vi mäter). 
3. **Leveranspaket** – PDF + web-UI + `pending-actions`-lista med nästa steg (t.ex. "testa ett automationsscript"), plus Stripe-integration för betalning och onboarding.

## 4. MVP scope
- Enkel landningssida/form + guided chat (t ex polylog) där Henry frågar om mål och kanal.
- Henry genererar PDF (baserat på markdown template) och e-post/fyrstegsplan (kan vara enkel textfil eller Zapier/Relay-liknande update). 
- Stripe-konto kopplat till Henry (se tidigare grundläggning) för sälja playbook och leverera PDF per e-post.
- Cronjob/heartbeat som följer upp med "Pending actions" efter lansering (t.ex. "har du testat outreach #1?").
- `knowledge/prd-autonomous-sales-playbook.md` dokumenterat och indexerat för QMD.

## 5. Framgångsfaktorer
1. Första betalning inom en vecka (insert KPI). 
2. Minst 2 aktiva playbooks (kunder som hämtat PDF + plan). 
3. Uppföljningstid < 24h (Henry rapporterar status i memory/pending-actions). 
4. Feedback loop inlagd i `knowledge/live-guide.md` så Henry lär sig att iterera playbooks baserat på kunddata.

## 6. Nästa steg
1. Henry bygger en first draft via CodeX: generera template + PDF.
2. Jag (huvudagent) sätter upp landningssidan + Stripe + hosting (Versel/Railway). 
3. Cronjob/heartbeat rapporterar status varje 10 min (körs redan via HenryStatusLoop). 
4. Efter lansering: Henry skriver upp success stories i `knowledge/project-ideas.md`.

## 7. Risker & trygghet
- Inget av detta rör dina core-workflows i solceller/batterier – det är en helt separat produktarena (AI sales/workflow automation). 
- Betalning hanteras via Henrys separata Stripekonto, inga delade resurser. 
- All kommunikation sker i denna workspace; inga externa system behöver kontaktas förrän vi valt att skala.


Vill du att jag låter Henry bekräfta den här PRD-draften (och rita upp en första rollout-tidslinje) innan vi går vidare med implementation?