# Tools
SHELL := /bin/bash
JSX ?= jsx

# Paths
DIST ?= dist
BUILD ?= build
JSX_FILES := $(shell find ./src -name *.jsx)
WISP_FILES := $(shell find ./src -name *.wisp)
DEPS_FILES := $(shell find ./vendor -name *.js)

# Default target
default: all


# Files

# files for target wisp
$(BUILD)/js/wisp.js: $(WISP_FILES)
	@echo "Compiling wisp."
	@cat $^ | wisp > $@

# alternatively:
#@echo -n '' > $@
#@for f in $^ ; do \
#cat $$f | wisp --source-uri $$f >> $@ ;\
#done

# files for target jsx
$(BUILD)/js/jsx.js: $(JSX_FILES)
	@echo "Compiling JSX."
	@cat $^ | jsx > $@

# files for target deps
$(DIST)/static/deps.js: $(DEPS_FILES)
	@echo "Packaging dependencies."
	@cat $^ > $@

# file for target html
$(DIST)/index.html: src/index.html
	@echo "Copying index.html."
	@cat $^ > $@

# files for target js
$(DIST)/static/app.js: $(BUILD)/js/jsx.js $(BUILD)/js/wisp.js
	@echo "Concatenating JS code."
	@cat $^ > $@


# Targets

all: html deps js

html: $(DIST)/index.html
deps: $(DIST)/static/deps.js

jsx: $(BUILD)/js/jsx.js 
js: $(DIST)/static/app.js
wisp: $(BUILD)/js/wisp.js 


# Commands

server:
	@echo "Running server."
	@cd dist && python -m SimpleHTTPServer; cd ..

dev:
	@echo "Watching for filesystem changes, while running server."
	@watchr .watchr

clean:
	@echo "Cleaning project."
	@rm -rf $(DIST)/*
	@rm -rf $(BUILD)/*
	@make file-structure

file-structure: 
	@echo "Creating file structure."
	@mkdir -p $(DIST)/static
	@mkdir -p $(BUILD)/js


# I don't understand this. TODO: read up on this.
#.PHONY: default clean file-structure all server dev deps concat html jsx wisp
