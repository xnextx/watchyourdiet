[PL]
# Strona dodawania posiłków

### Ważne
- [ ] Przetestować kasowanie modelu python
- [ ] Dodając posiłek z pozycji admina, nie dowiązuje posiłku z pozycji produktu
- [ ] Mimo tego, że jest wiele pustych pól na produkty, dodają się nowe JS
- [ ] Jeżeli dodam produkt o danej wielkości, to do niego się robią dowiazania, czyli jeden produkt może mieć tylko jedna wielkość, tak nie może być, muszę zrobić oddzielną tabelę, tylko do wielkości produktów, i tam będą się dowiązywały wielkości poszczególnych jakoś.


- [ ] Skrócić czas wyświetlania alertów.
- [ ] Dodać alerty pozytywne i negatywne.
- [ ] Dodać możliwość dodawania napojów, może przycisk ze szklaneczką i wtedy wyskakuje nieco inny input
- [ ] Dodać pole auto uzupełniania.
    - [ ] Jeżeli dodaje posiłek, backend ma sprawdzać nazwy produktów i posiłków i jeżeli takie występują, to dowiązywać do nic.
    - [ ] Front ma sobie pobierać te nazwy filtrując albo cuś i wyświetlać w podpowiedziach
    - [ ] Do działania frontu jest gotowiec auto uzupełniania w dokumentacji materialize

- [x] Przetestować aktualny JS.
- [x] TO JEST KURCZE PROBLEM: 
    - Przeszukując całą bezę aby sprawdzić, czy czasem nie został żaden posiłek będzie słabe.
    - Z drugiej strony, nie tworzenie takich dowiązań, tylko dodawanie nowych, skończy się tym, że klient dostanie 40.000 batonów i będzie musiał mu front to parsować, żeby w podpowiedzi wyświetlić tylko jeden
    - Z trzeciej strony myślałem o jakiejś wspólnej tabeli, ale zawsze to będzie się wiązało z przetwarzaniem ogromnych ilości danych.
    - Muszę ustalić co jest szybsze, czy przetwarzanie w bazie, czy wypuszczanie z backendu jakiś przefiltrowanych danych i na froncie parsowanie, zakładam, że przeszukiwanie bazy jest szybsze, pytanie tylko, czy przy 20.000 elementów będzie to w miarę płynne, czy nie.
- [x] Rozbudować kasowanie posiłków z pozycji admina, aby podczas kasowania posiłku, patrzyło na produkty i sprawdzało, czy te produkty są jeszcze gdzieś dowiązane, jak nie to mają się kasować.

### Na później
- [ ] Zmienić kolorki na stronie, aby to jakoś wyglądało.
- [ ] Dodać po lewej stronie menu z logowaniem, loginem itp, a po prawej będą karty dań.
- [ ] Dodać coś, aby można było wyświetlać w 2 językach informacje.

### Potestować sobie
- [ ] Serwisy wrzucić do oddzielnego pliczku używając modułów ES6