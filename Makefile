includes = $(wildcard *.json) $(wildcard *.js) $(wildcard *.png)
extension.zip: ${includes}
	convert logo.png -resize 128x128 logo-128.png
	standard
	rm extension.zip || :
	zip -r extension.zip *.json *.js *.png
