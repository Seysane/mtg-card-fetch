 Hey, I'm just building my MTG card shop with cards that I own.

 I just exported scanned cards from the Manabox app and put the data into a MySQL table there.

 So my script should upload card names, pictures, prices.

 My name and price are updated very well, but I have some issues with the Scryfall API.
 Fetching card pictures does not work very well;
 sometimes it loads like 50% of the cards, and sometimes it doesn't load at all.

 I should work on a sorting system for those cards using the set serial numbers for categories from different sets
 or maybe I should fetch cards by providing more data to the script for the API?



 In my Visual Studio terminal, I can only see:

 Failed to fetch image for card name "Secure the Scene"
 Failed to fetch image for card name "Fetid Imp"
 Failed to fetch image for card name "Radiant Fountain"
 Failed to fetch image for card name "Silumgar Scavenger"
 Failed to fetch image for card name "Valorous Steed"
 Failed to fetch image for card name "Roaming Ghostlight"
 Failed to fetch image for card name "Diabolic Edict"

 So there is a problem not only in my script but in my SQL too.
 Now in Workbench, I have only one database running on port 3308
 same for the script, but there is a problem because my phpMyAdmin panel is connected 
 to the non-existing database I have deleted.
 Even after changing ports, the issue is the same. 
 The non-existing database still shows up on the phpMyAdmin panel.
 I am thinking about reinstalling both MySQL Workbench and XAMPP.
