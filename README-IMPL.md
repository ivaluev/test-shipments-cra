there are multitude of possible project file structures as well as state managenet solutions

for this example I used a simple modifieble url state - although I can easyly rewrite (use) into immutable redux one - the result will still be the same

My goal was to be as simple and short as possible mainaining reasonable minimum number of files for suacha a small project as well as keeping size of thouse component files to no more then 200 lines to bolster maintainablility

advantigaes of the usrl state are obviosu - you can pass around links of specific queries to colleagues and clients to get presize picture of needed data

you can tracj states of the queries (sortings searches) via back button (back and forth) - which I personaly like

another point of interest is the enture layout is done manually - no bootstrap or other libs (which significantly save time though)
