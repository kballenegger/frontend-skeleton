# Tools
JSX ?= jsx

# Paths
DIST ?= dist
BUILD ?= build
JSX_FILES := $(shell find ./src -name *.jsx)
WISP_FILES := $(shell find ./src -name *.jsx)


# Files
wisp: $(WISP_FILES)
	@cat $^ | wisp > $(BUILD)/js/wisp.js

jsx: $(JSX_FILES)
	@cat $^ | jsx > $(BUILD)/js/jsx.js

# Commands
all: wisp jsx concat

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
