# Executables
MOCHA_EXEC  = ./node_modules/.bin/mocha
JSLINT_EXEC = ./node_modules/jslint/bin/jslint.js

# Variables
MOCHA_REPORTER = spec

test: jslint test-u test-i

jslint:
	# Files
	$(JSLINT_EXEC) \
    'index.js' \
    'configuration.js' \
    'seed.js' \
    'routes.js' \
    'package.json'

	# Folders
	find \
    'bootstrap' \
    'infrastructure' \
    'services' \
    'test' \
	-name "*.js" -print0 | xargs -0 $(JSLINT_EXEC)

test-u:
	@NODE_ENV=test $(MOCHA_EXEC) \
	--reporter $(MOCHA_REPORTER) \
	--ui tdd \
	test/unit/**/*.t.js

test-i:
	@NODE_ENV=test $(MOCHA_EXEC) \
	--reporter $(MOCHA_REPORTER) \
	--ui tdd \
	test/integration/**/*.t.js

.PHONY: test jslint test-u test-i
