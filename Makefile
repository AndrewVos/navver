includes = $(wildcard *.json) $(wildcard *.js) $(wildcard *.png)
extension.zip: ${includes}
	standard
	rm extension.zip || :
	zip -r extension.zip *.json *.js *.png
