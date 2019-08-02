# Bánkuti Péter Ádám - Tappointment teszt feladat

https://tappy-test.firebaseapp.com/

## Amit használtam

* Ionic4 - Angular8
* Firebase - auth, store, host

## Setup
(Szerintem csak ennyi fog kelleni.)
 
```
npm i

ionic serve

ng test

ionic build --prod
```

## Részfeladatok

- [x] A weblapon egy e­mail cím / jelszó megadásával lehessen regisztrálni
    * Firebase authentication.
    * Emlékszik a bejelentkezett felhasználóra.

- [x] A weblap főoldalán megjelennek a kategóriák. A kategóriát kiválasztva listázódnak a tételek.
    * Az étlap tartalma a data.ts fájlban található. 
    * Ez lett feltöltve a firestore NoSQL adatbaázisba az "Adataim" nevű oldalon lévő gombbal.
    * Maga az alkalmazás a firestoreból tölti le az étlapot. (szóval nem a data.ts fájl használja)
    * Csak autentikáció után feltölthető. Bárki letöltheti. Lsd: firestore.rules fájl.

- [x] Ételek esetén leírás is van. Külön meg vannak jelölve a csípős, illetve vegetáriánus ételek.
    * Név melleti ikonok jelölik.

- [x] A kosarat és a megrendelést csak bejelentkezés után lehessen kezelni.
    * AuthGuard - Az oldalak csak bejelentkezés után elérhetőek.


- [x] Ételek és italok tetszőleges számban helyezhetőek a kosárba.
    * Bejelentkezés után megjelenik a kártya szélén a + gomb.

- [x] A felső korlát konfigurálható legyen.
    * A felső korlát alapértelmezetten 20e, ha ezt megütjök akkor felugrik egy értesítés.
    * Az 'Adataim' nevű oldalon lehet állítani

- [x] Legyen elrejtve egy bug a rendszerben...
    * Az addToCart(id) függvény errort add ki ha ez megtörténik. Lsd: devtools console.

- [x] A kosár termék berakása funkcióra készüljenek unit tesztek.
    * A tesztek a cart.service.spec.ts-ben találhatóak.
    * Tesztek futtatása: `ng test`

- [x] A kosár tartalma bármikor megtekinthető. 
    * Bejelentketés után megjelenik a 'kosár' oldal linkje az oldal menüben.
    * Ha van valami a kosárban akkor megjelenik a szám az előbb említett link mellett.
    * Továbbá a menü oldalon látható lesz a kosár FAB.

- [x] Látszódnak a felvett tételek, illetve látható az összár. 

- [x] Bármely tétel kivehető a kosárból.


- [x] A rendelést törölhetjük, illetve leadhatjuk.
    * A törlés a 'Rendelések' oldalon. 
    * Az összes rendelés látható de csak a sajátodat törölheted.
    * Feladás a 'kosár' oldalon.

- [x] Meg kell adnunk a nevünket, címünket, illetve telefonszámunkat, majd elküldhetjük a rendelést. 
- [x] A rendelést mentsük az adatbázisba. 
    * Csak autentikáció után letölthető és feltölthető.

- [x] A rendelés leadása után a kosár üres legyen.
    * Továbbá autentikációnál is ürül.

- [x] cross­site scripting elleni védelmek
    * DomSanitizer használata a form inputoknál.

- [x] megfelelő jelszó policy
    * min 6 karakter validator szerintem most elég

- [ ] konfiguráció, stb (???)

- [ ] Adatbázis kapcsolathoz ORM­et használj.
    * Nincs tapasztalatom ezzel, Firebase-t használtam. :grimacing:
    * SQL helyett NoSQL adatbázis.

- [x] A megoldást verziókezelőn keresztül kérjük leadni.