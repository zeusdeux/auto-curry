# folders
SRC = .
TEST = ./test
BUILD = ./build
BIN = ./node_modules/.bin

# files
MAIN = $(SRC)/index.js

all: jshint test $(BUILD)/auto-curry.min.js

jshint:
	jshint $(MAIN) $(TEST)/*.js

test:
	@mocha

$(BUILD)/auto-curry.min.js: $(MAIN)
	$(BIN)/browserify -s autoCurry -e $(MAIN) | $(BIN)/uglifyjs \
	-o $@ \
	-c -m \
	--stats

clean:
	$(RM) $(BUILD)/*

.PHONY: all clean test jshint
