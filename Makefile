BIN=./node_modules/.bin

build:
	@NODE_ENV=production $(BIN)/browserify \
		-t [ babelify --presets [es2015 react transform-class-properties] ] \
		-t ./lib/sass-transform \
		--extension=jsx \
		main.jsx\
		-o public/bundle.js

dist:
	@NODE_ENV=production $(BIN)/browserify \
		-t [ babelify --presets [es2015 react transform-class-properties] ] \
		-t ./lib/sass-transform \
		main.jsx|\
		$(BIN)/uglifyjs -cm > public/bundle.js

start: server watch

watch:
	@$(BIN)/watchify main.jsx \
		-t [ babelify --presets [es2015 react] --plugins [transform-class-properties] ] \
		--extension=jsx \
		-t ./lib/sass-transform \
		-o public/bundle.js -dv

server:
	@node server.js