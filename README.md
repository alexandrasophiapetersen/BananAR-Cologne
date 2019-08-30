Phuong Linh Nguyen (7315394) Edylyn Blanco Garcia (5878918) Joel Jung (5596815) Alexandra Petersen (7306775)
    													
Dokumentation: Interaktive Streetart App - BananAR Cologne
													
	
	
Konzept:
Das Kursthema Augmented City lud dazu ein, sich mit der optischen Entwicklung Kölns und unserer Neugier über 
Streetart zu befassen. Streetart, welche wir im Alltag im Vorbeigehen betrachten, jedoch nie mit der selben 
Aufmerksamkeit wie Kunstwerke in einem Museum. Hinzu kommt, dass dem Betrachter eines Murals durch vage
Zusammensetzungen aus Suchbegriffen im Internet zusätzliche Informationen gegeben werden können. 
	
Die interaktive Streetart App "BananAR Cologne" vereint das Prinzip eines virtuellen Museums und Geocaching.
Dem Benutzer stehen eine begrenzte Auswahl an Murals in Ehrenfeld zur Verfügung, welche unabhängig von der Tageszeit
und der Reihenfolge suchen kann Anschließend ist es über die App möglich Informationen zu den Werken in einem 
AR-Overlayzu erhalten. 
	
Mit Hilfe der Standortlokalisierung sieht der Benutzer, wo er sich derzeit befindet (Bild 1). Die nächstgelegenen
Murals sind auf der Karte anhand von Icons zu sehen (Bild 2). Durch diese Icons wird nicht vorweggenommen, wie das
Mural aussieht. 
Der Benutzer soll das Wandbild selbst entdecken und einen QR-Code finden, welcher eingescannt werden kann (Bild 3).
Die App greift auf die Kamera des Smartphones zu (Bild 4). Nach erfolgreichem Scan erscheint ein Overlay, 
welches darauf hindeutet, dass eine "Banane" gefunden wurde und eine Sammelfunktion existiert (Bild 5). Die
Betrachtung des Murals durch die Kamera wird mit Informationen zum Werk und gegebenenfalls Verlinkungen zu einer
offiziellen Website/dem Instagram Profil des Künstlers erweitert (Bild 6). Zudem ist es möglich eine Detailseite 
aufzurufen (Bild 7). 
	
Die Idee, eine Liste mit allen gesammelten Murals und deren Detailseiten anzuzeigen, wurde versucht umzusetzen. Dieser 
Versuch ist gescheitert (Bild 8). Weiteres dazu in dem Abschnitt zu der technischen Umsetzung.
	
	
Design: 
Das Hauptthema des Designs ist ebenfalls die Streetart Kunst. So wird in den Toolbars eines Schriftart verwendet,
welche in Graffiti Design die Überschriften der einzelnen Seiten anzeigt. Zudem wurde das Design von dem Künstler
Thomas Baumgärtel inspiriert. Der sogenannte "Bananensprayer" ist in Köln seit ca. 30 Jahren bekannt und verschönert
die Kölner Innenstadt mit seinen Bananen-Murals (https://www.volksbanane.de/). Die Bananen wurden vielfältig in die 
App eingebaut. Sie fungieren als Sammelobjekte, bestimmen die Farben der App in grau und gelb, sowie die Icons und 
Marker der Detailliste und Map. Auch der QR-Code ist in schwarz und gelb gehalten, enthält zudem eine Banane in der 
Mitte. 
	
Daten: 
Alle Daten wurden vor Ort in Ehrenfeld gesammelt und gegen Endes des Projektes nochmals abgeblichen und erneuert,
da zwei der Locations zwischenzeitlich überstrichen oder von Neubauten verdeckt wurden. GPS Daten wurden vor Ort 
ausgelesen und Zusatzinformationen im Internet recherchiert. Zusatzinfornationen sind die Straße,der Titel, 
Informationstext und ein Vorschaubild des Murals, sowie der Name und die Website/das Instagram des Künstlers. 
	
Eine JSON Datei wurde erstellt, um die Informationen einzulesen. Der Aufbau der JSON wurde nach den Bedingungen
des Projektes angepasst. Zudem wurde jedes Mural mit einer ID/ einem QR-Code und einer Variable des Typs Boolean 
versehen. 
	
Die QR Codes mit korrespondierender ID als Textinahlt wurden mit dem Online-Tool Tool https://www.qrcode-monkey.com/ 
erstellt und stilistisch an das Design der App angepasst. Anschließend wurden diese ausgedruckt und vor Ort in Form 
von Stickern angebracht. 
	
Technische Umsetzung: 
Die technische Umsetzung der App lief größtenteils erfolgreich. Viele Komponenten konnten 
umgesetzt werden. Eine jedoch nicht.  Gearbeitet wurde mit dem Framework Ionic und Angular Typescript, sowie Cordova
und Capacitor. Gearbeitet wurde damit vorher nicht. Alle technischen Skills wurden im Laufe des Semesters selbst erarbeitet.
	
Die App selbst baut sich wie folgt auf: Startseite ist "tab1.page.html". Die HTML Seite enthält neben Toolbar und 
Weiterleitung zu der Liste der Details, die Komponente "google-map". In dieser Komponente wird die Map geladen und 
gerendert, sowie die Marker ausgegeben. Die Map selbst wird dank des Google API Keys von Google zur Verfügung 
gestellt. Die Startseite enthält zudem die Funktion "setLocation()". So kann der User seinen Standort und die ihm zur 
Verfügung stehenden Murals in der Nähe sehen. Je nach Standort des Users wird die Map auf einen bestimmten Bereich 
zentriert. An dieser Stelle ist wichtig zu erwähnen, dass die App ursprünglich mit dem Capacitor gebaut werden sollte. 
Daher ist der Code dementsprechend anders geschrieben, als zb. der Code des QR-Scanners. 
	
Durch Klicken auf das Icon der Banane im Tabmenü am unteren Bildschirmrand gelangt der User zu der Seite 
"tab2.page.html". Dort eingebaut ist die Komponente "qrscan". Diese Komponente ermöglicht die Scan-Funktion der App.
Dort wird zunächst erläutert, wie das Scannen eines QR-Codes funktioniert und wie der QR-Code aussieht. Durch das 
Klicken auf den Button "Scan" wird der User auf die Seite ar.page.html weitergeleitet. Der Barcode Scanner ist ein 
Plugin von Cordova. Dieses Plugin wird ausgelöst, sobald die Seite geladen wurde. Nach erfolgreicher Erlaubnis öffnet 
sich die Kamera und es ist möglich einen QR-Code zu scannen. Sollte ein unbekannter QR-Code gescannt werden, so wird
eine Fehlermeldung angezeigt. Bei erfolgreichem Scan wird das Plugin Camera Preview gestartet. Dieses Plugin entstammt 
ebenfalls dem Cordova Framework. Da dieses Plugin nicht mit dem Capacitor funktioniert, muss der Build mit Cordova 
durchgeführt werden. Es gab zunächst Probleme mit der Implementierung der Camera Preview. Diese konnten jedoch dank 
des Forums Stackoverflow gelöst werden 
(https://stackoverflow.com/questions/57383758/ionic-4-cordova-camera-preview-is-hiding-html-elements-even-though-toback-is).
	
Über den Content der Camera Preview wird zunächst das Modal "modal-page.html" gelegt. Dieses Modal zeigt an, dass der 
Nutzer eine Banane gefunden hat und schließt sich erst dann wieder, wenn der Einsammeln-Button betätigt wurde. 
Anschließend sind die Overlays in der Camera Preview zu sehen. Diese Overlays sind HTML-Elemente und mit Daten aus der
JSON Datei gefüllt. Für weitere Informationen kann der User über den Button auf die zugehörige Detailseite des Murals 
"ar-details.page.html gelangen.
	
Nun zu der Komponente die nicht erfolgreich implementiert werden konnte: die Einsammelfunktion der Bananen und somit
die Freischaltfunktion der Detailseiten in der Liste "details.page.html". Die Liste ist von der Startseite aus 
zugänglich und sollte ursprünglich nur die Detailseiten der bereits gescannten QR-Codes der jeweiligen Murals anzeigen 
(json-detail.page.html). Es wurde versucht eine Variable des Tyos Boolean in der JSON Datei von false zu true zu 
setzen. So sollten nur die Detailseiten angezeigt werden, wo der boolean gleich true ist. Dies ist uns leider nicht 
gelungen. Der Versuch ist in der Datei ar-page.ts dokumentiert bzw. auskommentiert. Es wurde sich zudem erneut an das 
Forum Stackoverflow gewandt. Eine detaillierte Antwort ist vorhanden 
(https://stackoverflow.com/questions/57536895/ionic-4-change-boolean-in-data-json-to-true-after-scanning-a-qr-code). 
Diese konnte jedoch nicht implementiert werden, da es zeitlich nicht möglich war, die komplette App umzuschreiben. 
	
	
	




