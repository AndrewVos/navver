includes = $(wildcard *.json) $(wildcard *.js) $(wildcard *.png)
extension.zip: ${includes}
	standard
	rm extension.zip || :
	zip -r extension.zip *.json *.js *.png

logo-128.png: logo.png
	convert logo.png -resize 128x128 logo-128.png
