# Reposzukiwacz - Repo Hunt
App designed for a technical interview simulation at CodersLab.

# uwagi/problemy:

1. Odpowiednie wyświetlanie elementów przy paginacji - tak, zeby
kolejne strony rozpoczynaly odpowiednim elementem - obliczenie początku i końca wyświetlanych elementów na danej stronie. 

2. Wyświetlanie odpowiedniej ilości wyników po przejściu przez kolejne strony pginacji. 

3. Sortowanie kolumny owner.login - osobna logika sortowania tej kolumny.

4. Utrzymywanie wyszukiwania przy zmianie route'a - Home 'resetował' się i wymazywał ostatnie wyszukiwanie. Podobnie z Favourites - dodałam pobieranie i zapisywanie stanu wyszukiwania i ulubionych z/w localStorage.

5. Prosty cache? Pobieranie danych zapisanych w localStorage w przypadku ponownego wyszukiwania hasła, tak zeby nie odpytywać ponownie API? Na ile powinna być zapisana "sesja" z localStorage, tak zeby uzytkownik miał dostęp do najnowszych danych?