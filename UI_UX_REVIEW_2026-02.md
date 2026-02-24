# UI/UX Review – aktueller Stand (Feb 2026)

## Kurzfazit
Die App ist bereits solide strukturiert (klarer Fokus-/Work-/Settings-Aufbau, gute Filterlogik, Lokalisierung in DE/EN). Für den nächsten Qualitäts-Sprung lohnt sich vor allem Feinschliff bei **Discoverability**, **Mobile-Bedienung** und **rückgängig machbaren Aktionen**.

## Konkrete Verbesserungsvorschläge

1. **Undo statt nur Confirm beim Löschen**
   - Aktuell schützt ein `confirm`-Dialog vor Fehlklicks.
   - UX-stärker wäre: Task sofort ausblenden + Toast „Task gelöscht · Rückgängig“ (z. B. 5–8 Sekunden).
   - Vorteil: schnellerer Flow, weniger Modal-Interruptions, bessere mobile Bedienbarkeit.

2. **Sichtbare Labels für Advanced-Filter statt nur Placeholder**
   - `@context`, `+project`, `key:value` sind für neue Nutzer nicht sofort verständlich.
   - Empfehlung: kleine sichtbare Labels oberhalb/links der Inputs (oder segmented field-group mit Prefix-Badges).
   - Placeholder kann als Beispiel bleiben, sollte aber nicht die primäre Erklärung sein.

3. **Filter-Status prominenter machen (bei aktivem Filterzustand)**
   - Active-Filter-Chips sind vorhanden, aber leicht zu übersehen.
   - Empfehlung: Bei aktiven Filtern den Bereich farblich hervorheben + „X Filter aktiv“ + klaren CTA „Alle zurücksetzen“.
   - Zusätzlich optional: kleine Ergebniszahl „N Treffer“ direkt oberhalb der Liste.

4. **Task-Aktionsmenü auf Touch vergrößern**
   - Das `⋯`-Summary wirkt visuell recht klein.
   - Empfehlung: Mindest-Touch-Target 44x44 px (Padding/Line-Height erhöhen), damit mobile Trefferquote steigt.

5. **Leerer Zustand („Empty State“) für Aufgabenliste verbessern**
   - Wenn keine Tasks/Treffer vorliegen, sollte ein dedizierter Hinweis erscheinen:
     - „Noch keine Aufgaben – starte mit einer Aufgabe im todo.txt-Format“
     - oder bei Filtern: „Keine Treffer. Filter zurücksetzen?“
   - Das reduziert Verwirrung bei erstmaliger Nutzung.

6. **Settings-Panel: kognitive Last reduzieren**
   - Die Gruppierung ist gut; zusätzlich könnte eine „Basic/Advanced“-Stufe helfen.
   - Vorschlag: Standardmäßig nur Kernoptionen zeigen (Timer + Verhalten), restliche Gruppen einklappbar.

7. **Mikrointeraktionen für Timer-Zustandswechsel**
   - Beim Phasenwechsel (Pomodoro ↔ Pause) kurze visuelle Rückmeldung (Badge/Farbakzent) einblenden.
   - Optional zusätzlich haptischer/akustischer Hinweis, falls erlaubt.

## Priorisierung (Impact x Aufwand)
- **Quick Wins (hoch / niedrig):** 2, 3, 4, 5
- **Nächster Step (hoch / mittel):** 1 (Undo-Flow)
- **Späterer Feinschliff:** 6, 7

## Vorschlag für die nächste Umsetzungsaufgabe
> „Implementiere zuerst Quick Wins 2/3/5 in einem UI-Pass, danach separaten Pass für Undo-Delete inkl. i18n und Regression-Checks.“
