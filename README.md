# Reposzukiwacz - Repo Hunt
App designed for a technical interview simulation at CodersLab.

# uwagi/problemy:

1. Odpowiednie wyświetlanie elementów przy paginacji - tak, zeby
kolejne strony rozpoczynaly odpowiednim elementem - obliczenie początku i końca wyświetlanych elementów na danej stronie. 

2. Wyświetlanie odpowiedniej ilości wyników po przejściu przez kolejne strony paginacji. 

3. Sortowanie kolumny owner.login - osobna logika sortowania tej kolumny.

4. Utrzymywanie wyszukiwania przy zmianie route'a - Home 'resetował' się i wymazywał ostatnie wyszukiwanie. Podobnie z Favourites - dodałam pobieranie i zapisywanie stanu wyszukiwania i ulubionych z/w localStorage.

4.1 Podobny problem przy utrzymaniu stanu button'a po dodaniu do ulubionych, dane zapisane i pobierane z localStorage i na tej podstawie utrzymywany stan button'a.

5. Prosty cache - pobieranie danych zapisanych w localStorage w przypadku ponownego wyszukiwania hasła, tak zeby nie odpytywać ponownie API? Na ile powinna być zapisana "sesja" z localStorage, tak zeby uzytkownik miał dostęp do najnowszych danych? Co jeśli nie odswiezy strony przez dluzszy czas i dane będą pobierane tylko z localStorage w przypadku powielonych queries?

5.1 Zerowanie cache'a - localStorage.removeItem dla kazdego klucza nie zadziałało, komponent unmount przy zmianie route'a - znalazłam beforeunload (?) czy eventlistiners tutaj będą okej czy juz za bardzo skomplikowalam?