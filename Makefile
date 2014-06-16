# Tools
JSX ?= jsx

# Paths
DIST ?= dist
BUILD ?= build
#JSX_FILES := $(shell find . -name *.jsx)


# Commands
all: wisp jsx concat

wisp: src/*.wisp
	@cat $^ | wisp > $(BUILD)/js/wisp.js

jsx: src/*.jsx
	@cat $^ | jsx > $(BUILD)/js/jsx.js

concat: build/js/*.js
	@cat $^ > $(DIST)/script.js

deps: vendor/*.js
	@cat $^ > $(DIST)/static/deps.js

watch:
	@watchr make

clean:
	@rm -f $(DIST)/*

file-structure: 
	@mkdir -p $(DIST)/static
	@mkdir -p $(BUILD)/js


# I don't understand this. TODO: read up on this.
.PHONY: clean file-structure all
