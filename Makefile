# NOTE: There are two root files which are the entrypoints to compilation for
# both JavaScript and CSS. Those files are:
#
#   src/js/app.{js,wisp,jsx}
#   src/style/style.scss

# Tools
SHELL := /bin/bash
JSX ?= jsx

# Variables
NODE_ENV ?= production

# Paths
DIST ?= _dist
BUILD ?= _build
DEV ?= _dev
JSX_FILES := $(shell find ./src/js -name '*.jsx')
WISP_FILES := $(shell find ./src/js -name '*.wisp')
WISP_MACRO_FILES := $(shell find ./src/wisp-macros -name '*.wisp')
SCSS_FILES := $(shell find ./src/style -name '*.scss')
ASSET_FILES := $(shell find ./src/assets)

# Default target
default: all


# Files

# files for target wisp
$(BUILD)/js/%.js: src/js/%.wisp
	@echo "Compiling wisp: $^."
	@cat $(WISP_MACRO_FILES) $^ | wisp > $@

# files for target jsx
$(BUILD)/js/%.js: src/js/%.jsx
	@echo "Compiling JSX: $^."
	@cat $^ | jsx > $@

$(BUILD)/server/%.js: src/server/%.js
	@echo "Copying server js: $^."
	@cp $^ $@

$(BUILD)/js/app.js: src/js/app.js
	@cp $^ $@

# files for target js
# TODO: debug?
$(DIST)/static/app.js: jsx wisp $(BUILD)/js/app.js $(wildcard $(BUILD)/js/*.js)
	@echo "Running browserify."
	@browserify $(BUILD)/js/app.js > $(BUILD)/bundle.js
	@echo "Running envify."
	@NODE_ENV="$(NODE_ENV)" envify $(BUILD)/bundle.js > $@

# files for target scss
# NOTE: only the root file is compiled, the rest are included by sass itself
$(DIST)/static/style.css: $(SCSS_FILES)
	@echo "Compiling SCSS."
	@sass src/style/style.scss $(DIST)/static/style.css

$(DIST)/static/assets/%: src/assets/%
	@echo "Copying asset: $^"
	@cp $^ $@


# Targets

all: html js css assets

jsx: $(patsubst ./src/js/%.jsx,./$(BUILD)/js/%.js,$(JSX_FILES))
wisp: $(patsubst ./src/js/%.wisp,./$(BUILD)/js/%.js,$(WISP_FILES))
assets: $(patsubst ./src/assets/%,./$(DIST)/static/assets/%,$(ASSET_FILES))
js: $(DIST)/static/app.js $(BUILD)/server/server.js
css: $(DIST)/static/style.css


# Commands

server: all server-only
server-only:
	@echo "Running server."
	@DIST=$(DIST) BUILD=$(BUILD) node $(BUILD)/server/server.js

dev:
	@echo "Watching for filesystem changes, while running server."
	@DIST="$(DEV)/dist" BUILD="$(DEV)/build" make file-structure
	@DIST="$(DEV)/dist" BUILD="$(DEV)/build" watchr .watchr

clean:
	@echo "Cleaning project."
	@rm -rf $(DIST)/*
	@rm -rf $(BUILD)/*
	@rm -rf $(DEV)/*
	@make file-structure

file-structure: 
	@echo "Creating file structure."
	@mkdir -p $(DEV)
	@mkdir -p $(DIST)/static/assets
	@mkdir -p $(BUILD)/js
	@mkdir -p $(BUILD)/server


.PHONY: default clean file-structure all server dev deps concat html jsx wisp js server-only assets
