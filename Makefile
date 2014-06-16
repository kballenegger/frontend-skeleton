# Tools
JSX ?= jsx

# Paths
DIST ?= dist
BUILD ?= build
JSX_FILES := $(shell find ./src -name *.jsx)
WISP_FILES := $(shell find ./src -name *.jsx)


# Files
#wisp: $(WISP_FILES)
	#@cat $^ | wisp > $(BUILD)/js/wisp.js

jsx: $(JSX_FILES)
	@echo "Compiling JSX."
	@cat $^ | jsx > $(BUILD)/js/jsx.js

dist/static/index.html: src/index.html
	@echo "Copying index.html."
	@cp src/index.html dist/static/index.html

# Commands
all: html concat

html: dist/static/index.html

concat: jsx 
	@echo "Concatenating JS code."
	@cat $^ > $(DIST)/script.js

deps: vendor/*.js
	@echo "Packaging dependencies."
	@cat $^ > $(DIST)/static/deps.js

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
.PHONY: clean file-structure all server dev deps concat html jsx wisp
