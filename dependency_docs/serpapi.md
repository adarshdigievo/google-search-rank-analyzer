================================================
FILE: README.md
================================================

<div align="center">
<h1 align="center">SerpApi Python Library & Package</h1>
  <img src="https://user-images.githubusercontent.com/78694043/233921372-bb57c347-9005-4b59-8f09-993698a87eb6.svg" width="600" alt="serpapi python library logo">

  <a href="https://pypi.org/project/serpapi">![Package](https://badge.fury.io/py/serpapi.svg)</a>
  
  [![serpapi-python](https://github.com/serpapi/serpapi-python/actions/workflows/ci.yml/badge.svg)](https://github.com/serpapi/serpapi-python/actions/workflows/ci.yml)
</div>

This repository is the home of the *soon–to–be* official Python API wrapper for [SerpApi](https://serpapi.com). This `serpapi` module allows you to access search data in your Python application.

[SerpApi](https://serpapi.com) supports Google, Google Maps, Google Shopping, Bing, Baidu, Yandex, Yahoo, eBay, App Stores, and more. Check out the [documentation](https://serpapi.com/search-api) for a full list.


## Installation

To install the `serpapi` package, simply run the following command:

```bash
$ pip install serpapi
```

Please note that this package is separate from the legacy `serpapi` module, which is available on PyPi as `google-search-results`. This package is maintained by SerpApi, and is the recommended way to access the SerpApi service from Python.

## Usage

Let's start by searching for Coffee on Google:

```pycon
>>> import serpapi
>>> s = serpapi.search(q="Coffee", engine="google", location="Austin, Texas", hl="en", gl="us")
```

The `s` variable now contains a `SerpResults` object, which acts just like a standard dictionary, with some convenient functions added on top.

Let's print the first result:

```pycon
>>> s["organic_results"][0]["link"]
'https://en.wikipedia.org/wiki/Coffee'
```

Let's print the title of the first result, but in a more Pythonic way:

```pycon
>>> s["organic_results"][0].get("title")
'Coffee - Wikipedia'
```

The [SerpApi.com API Documentation](https://serpapi.com/search-api) contains a list of all the possible parameters that can be passed to the API.

### Error handling

Unsuccessful requests raise `serpapi.HTTPError` or `serpapi.TimeoutError` exceptions. The returned status code will reflect the sort of error that occurred, please refer to [Status and Error Codes Documentation](https://serpapi.com/api-status-and-error-codes) for more details.

```python
import serpapi

# A default timeout can be set here.
client = serpapi.Client(api_key=os.getenv("API_KEY"), timeout=10)

try:
    results = client.search({
        'engine': 'google',
        'q': 'coffee',
    })
except serpapi.HTTPError as e:
    if e.status_code == 401: # Invalid API key
        print(e.error) # "Invalid API key. Your API key should be here: https://serpapi.com/manage-api-key"
    elif e.status_code == 400: # Missing required parameter
        pass
    elif e.status_code == 429: # Exceeds the hourly throughput limit OR account run out of searches
        pass
except serpapi.TimeoutError as e:
    # Handle timeout
    print(f"The request timed out: {e}")
```

## Documentation

Documentation is [available on Read the Docs](https://serpapi-python.readthedocs.io/en/latest/).

Change history is [available on GitHub](https://github.com/serpapi/serpapi-python/blob/master/HISTORY.md).

## Basic Examples in Python

### Search Bing
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'bing',
    'q': 'coffee'
})
```
- API Documentation: [serpapi.com/bing-search-api](https://serpapi.com/bing-search-api)

### Search Baidu
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'baidu',
    'q': 'coffee',
})
```
- API Documentation: [serpapi.com/baidu-search-api](https://serpapi.com/baidu-search-api)

### Search Yahoo
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'yahoo',
    'p': 'coffee',
})
```
- API Documentation: [serpapi.com/yahoo-search-api](https://serpapi.com/yahoo-search-api)

### Search YouTube
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'youtube',
    'search_query': 'coffee',
})
```
- API Documentation: [serpapi.com/youtube-search-api](https://serpapi.com/youtube-search-api)

### Search Walmart
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'walmart',
    'query': 'coffee',
})
```
- API Documentation: [serpapi.com/walmart-search-api](https://serpapi.com/walmart-search-api)

### Search eBay
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'ebay',
    '_nkw': 'coffee',
})
```
- API Documentation: [serpapi.com/ebay-search-api](https://serpapi.com/ebay-search-api)

### Search Naver
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'naver',
    'query': 'coffee',
})
```
- API Documentation: [serpapi.com/naver-search-api](https://serpapi.com/naver-search-api)

### Search Home Depot
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'home_depot',
    'q': 'table',
})
```
- API Documentation: [serpapi.com/home-depot-search-api](https://serpapi.com/home-depot-search-api)

### Search Apple App Store
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'apple_app_store',
    'term': 'coffee',
})
```
- API Documentation: [serpapi.com/apple-app-store](https://serpapi.com/apple-app-store)

### Search DuckDuckGo
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'duckduckgo',
    'q': 'coffee',
})
```
- API Documentation: [serpapi.com/duckduckgo-search-api](https://serpapi.com/duckduckgo-search-api)

### Search Google
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google',
    'q': 'coffee'
})
```
- API Documentation: [serpapi.com/search-api](https://serpapi.com/search-api)

### Search Google Scholar
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_scholar',
    'q': 'coffee',
})
```
- API Documentation: [serpapi.com/google-scholar-api](https://serpapi.com/google-scholar-api)

### Search Google Autocomplete
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_autocomplete',
    'q': 'coffee',
})
```
- API Documentation: [serpapi.com/google-autocomplete-api](https://serpapi.com/google-autocomplete-api)

### Search Google Product
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_product',
    'q': 'coffee',
    'product_id': '4887235756540435899',
})
```
- API Documentation: [serpapi.com/google-product-api](https://serpapi.com/google-product-api)

### Search Google Reverse Image
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_reverse_image',
    'image_url': 'https://i.imgur.com/5bGzZi7.jpg',
    'max_results': '1',
})
```
- API Documentation: [serpapi.com/google-reverse-image](https://serpapi.com/google-reverse-image)

### Search Google Events
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_events',
    'q': 'coffee',
})
```
- API Documentation: [serpapi.com/google-events-api](https://serpapi.com/google-events-api)

### Search Google Local Services
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_local_services',
    'q': 'electrician',
    'data_cid': '6745062158417646970',
})
```
- API Documentation: [serpapi.com/google-local-services-api](https://serpapi.com/google-local-services-api)

### Search Google Maps
```python
import os
import serpapi


client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_maps',
    'q': 'pizza',
    'll': '@40.7455096,-74.0083012,15.1z',
    'type': 'search',
})
```
- API Documentation: [serpapi.com/google-maps-api](https://serpapi.com/google-maps-api)

### Search Google Jobs
```python
import os
import serpapi


client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_jobs',
    'q': 'coffee',
})
```
- API Documentation: [serpapi.com/google-jobs-api](https://serpapi.com/google-jobs-api)

### Search Google Play
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_play',
    'q': 'kite',
    'store': 'apps',
    'max_results': '2',
})
```
- API Documentation: [serpapi.com/google-play-api](https://serpapi.com/google-play-api)

### Search Google Images
```python
import os
import serpapi

client = serpapi.Client(api_key=os.getenv("API_KEY"))
results = client.search({
    'engine': 'google_images',
    'tbm': 'isch',
    'q': 'coffee',
})
```
- API Documentation: [serpapi.com/images-results](https://serpapi.com/images-results)

## License

MIT License.

## Contributing

Bug reports and pull requests are welcome on GitHub. Once dependencies are installed, you can run the tests with `pytest`.



================================================
FILE: HISTORY.md
================================================
Release History
===============

0.1.6 (2026-02-16)
------------------

- Add support for request timeouts.
- Add status and error codes support - https://serpapi.com/api-status-and-error-codes

0.1.5 (2023-11-01)
------------------

- Python 3.12 support. 

0.1.4 (2023-10-11)
------------------

- Add README documentation for various engines.

0.1.3 (2023-10-06)
------------------

- Replace deprecated serpapi_pagination.next_link with 'next'. 
- Improve documentation: how to use the client directly for pagination searches.

0.1.2 (2023-10-03)
------------------

- Update project status to Production/Stable.

0.1.1 (2023-10-03)
------------------

- Update documentation link to point to Read the Docs.

0.1.0 (2023-10-03)
------------------

- First release on PyPI.



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2018-2023 SerpApi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: MANIFEST.in
================================================
include README.md HISTORY.md LICENSE
recursive-include tests *.py


================================================
FILE: Pipfile
================================================
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
serpapi = {editable = true, path = "."}
pytest = "*"

[dev-packages]
alabaster = "*"
sphinx = "*"
pytest = "*"
black = "*"



================================================
FILE: pylint.rc
================================================
[MAIN]

# Analyse import fallback blocks. This can be used to support both Python 2 and
# 3 compatible code, which means that the block might have code that exists
# only in one or another interpreter, leading to false positives when analysed.
analyse-fallback-blocks=no

# Clear in-memory caches upon conclusion of linting. Useful if running pylint
# in a server-like mode.
clear-cache-post-run=no

# Load and enable all available extensions. Use --list-extensions to see a list
# all available extensions.
#enable-all-extensions=

# In error mode, messages with a category besides ERROR or FATAL are
# suppressed, and no reports are done by default. Error mode is compatible with
# disabling specific errors.
#errors-only=

# Always return a 0 (non-error) status code, even if lint errors are found.
# This is primarily useful in continuous integration scripts.
#exit-zero=

# A comma-separated list of package or module names from where C extensions may
# be loaded. Extensions are loading into the active Python interpreter and may
# run arbitrary code.
extension-pkg-allow-list=

# A comma-separated list of package or module names from where C extensions may
# be loaded. Extensions are loading into the active Python interpreter and may
# run arbitrary code. (This is an alternative name to extension-pkg-allow-list
# for backward compatibility.)
extension-pkg-whitelist=

# Return non-zero exit code if any of these messages/categories are detected,
# even if score is above --fail-under value. Syntax same as enable. Messages
# specified are enabled, while categories only check already-enabled messages.
fail-on=

# Specify a score threshold under which the program will exit with error.
fail-under=10

# Interpret the stdin as a python script, whose filename needs to be passed as
# the module_or_package argument.
#from-stdin=

# Files or directories to be skipped. They should be base names, not paths.
ignore=CVS

# Add files or directories matching the regular expressions patterns to the
# ignore-list. The regex matches against paths and can be in Posix or Windows
# format. Because '\\' represents the directory delimiter on Windows systems,
# it can't be used as an escape character.
ignore-paths=

# Files or directories matching the regular expression patterns are skipped.
# The regex matches against base names, not paths. The default value ignores
# Emacs file locks
ignore-patterns=^\.#

# List of module names for which member attributes should not be checked
# (useful for modules/projects where namespaces are manipulated during runtime
# and thus existing member attributes cannot be deduced by static analysis). It
# supports qualified module names, as well as Unix pattern matching.
ignored-modules=

# Python code to execute, usually for sys.path manipulation such as
# pygtk.require().
#init-hook=

# Use multiple processes to speed up Pylint. Specifying 0 will auto-detect the
# number of processors available to use, and will cap the count on Windows to
# avoid hangs.
jobs=1

# Control the amount of potential inferred values when inferring a single
# object. This can help the performance when dealing with large functions or
# complex, nested conditions.
limit-inference-results=100

# List of plugins (as comma separated values of python module names) to load,
# usually to register additional checkers.
load-plugins=

# Pickle collected data for later comparisons.
persistent=yes

# Minimum Python version to use for version dependent checks. Will default to
# the version used to run pylint.
py-version=3.11

# Discover python modules and packages in the file system subtree.
recursive=no

# Add paths to the list of the source roots. Supports globbing patterns. The
# source root is an absolute path or a path relative to the current working
# directory used to determine a package namespace for modules located under the
# source root.
source-roots=

# When enabled, pylint would attempt to guess common misconfiguration and emit
# user-friendly hints instead of false-positive error messages.
suggestion-mode=yes

# Allow loading of arbitrary C extensions. Extensions are imported into the
# active Python interpreter and may run arbitrary code.
unsafe-load-any-extension=no

# In verbose mode, extra non-checker-related info will be displayed.
#verbose=


[BASIC]

# Naming style matching correct argument names.
argument-naming-style=snake_case

# Regular expression matching correct argument names. Overrides argument-
# naming-style. If left empty, argument names will be checked with the set
# naming style.
#argument-rgx=

# Naming style matching correct attribute names.
attr-naming-style=snake_case

# Regular expression matching correct attribute names. Overrides attr-naming-
# style. If left empty, attribute names will be checked with the set naming
# style.
#attr-rgx=

# Bad variable names which should always be refused, separated by a comma.
bad-names=foo,
          bar,
          baz,
          toto,
          tutu,
          tata
          victor
          kenneth
          bart

# Bad variable names regexes, separated by a comma. If names match any regex,
# they will always be refused
bad-names-rgxs=

# Naming style matching correct class attribute names.
class-attribute-naming-style=any

# Regular expression matching correct class attribute names. Overrides class-
# attribute-naming-style. If left empty, class attribute names will be checked
# with the set naming style.
#class-attribute-rgx=

# Naming style matching correct class constant names.
class-const-naming-style=UPPER_CASE

# Regular expression matching correct class constant names. Overrides class-
# const-naming-style. If left empty, class constant names will be checked with
# the set naming style.
#class-const-rgx=

# Naming style matching correct class names.
class-naming-style=PascalCase

# Regular expression matching correct class names. Overrides class-naming-
# style. If left empty, class names will be checked with the set naming style.
#class-rgx=

# Naming style matching correct constant names.
const-naming-style=UPPER_CASE

# Regular expression matching correct constant names. Overrides const-naming-
# style. If left empty, constant names will be checked with the set naming
# style.
#const-rgx=

# Minimum line length for functions/classes that require docstrings, shorter
# ones are exempt.
docstring-min-length=-1

# Naming style matching correct function names.
function-naming-style=snake_case

# Regular expression matching correct function names. Overrides function-
# naming-style. If left empty, function names will be checked with the set
# naming style.
#function-rgx=

# Good variable names which should always be accepted, separated by a comma.
good-names=i,
           j,
           k,
           ex,
           Run,
           _

# Good variable names regexes, separated by a comma. If names match any regex,
# they will always be accepted
good-names-rgxs=

# Include a hint for the correct naming format with invalid-name.
include-naming-hint=no

# Naming style matching correct inline iteration names.
inlinevar-naming-style=any

# Regular expression matching correct inline iteration names. Overrides
# inlinevar-naming-style. If left empty, inline iteration names will be checked
# with the set naming style.
#inlinevar-rgx=

# Naming style matching correct method names.
method-naming-style=snake_case

# Regular expression matching correct method names. Overrides method-naming-
# style. If left empty, method names will be checked with the set naming style.
#method-rgx=

# Naming style matching correct module names.
module-naming-style=snake_case

# Regular expression matching correct module names. Overrides module-naming-
# style. If left empty, module names will be checked with the set naming style.
#module-rgx=

# Colon-delimited sets of names that determine each other's naming style when
# the name regexes allow several styles.
name-group=

# Regular expression which should only match function or class names that do
# not require a docstring.
no-docstring-rgx=^_

# List of decorators that produce properties, such as abc.abstractproperty. Add
# to this list to register other decorators that produce valid properties.
# These decorators are taken in consideration only for invalid-name.
property-classes=abc.abstractproperty

# Regular expression matching correct type alias names. If left empty, type
# alias names will be checked with the set naming style.
#typealias-rgx=

# Regular expression matching correct type variable names. If left empty, type
# variable names will be checked with the set naming style.
#typevar-rgx=

# Naming style matching correct variable names.
variable-naming-style=snake_case

# Regular expression matching correct variable names. Overrides variable-
# naming-style. If left empty, variable names will be checked with the set
# naming style.
#variable-rgx=


[CLASSES]

# Warn about protected attribute access inside special methods
check-protected-access-in-special-methods=no

# List of method names used to declare (i.e. assign) instance attributes.
defining-attr-methods=__init__,
                      __new__,
                      setUp,
                      asyncSetUp,
                      __post_init__

# List of member names, which should be excluded from the protected access
# warning.
exclude-protected=_asdict,_fields,_replace,_source,_make,os._exit

# List of valid names for the first argument in a class method.
valid-classmethod-first-arg=cls

# List of valid names for the first argument in a metaclass class method.
valid-metaclass-classmethod-first-arg=mcs


[DESIGN]

# List of regular expressions of class ancestor names to ignore when counting
# public methods (see R0903)
exclude-too-few-public-methods=

# List of qualified class names to ignore when counting class parents (see
# R0901)
ignored-parents=

# Maximum number of arguments for function / method.
max-args=5

# Maximum number of attributes for a class (see R0902).
max-attributes=7

# Maximum number of boolean expressions in an if statement (see R0916).
max-bool-expr=5

# Maximum number of branch for function / method body.
max-branches=12

# Maximum number of locals for function / method body.
max-locals=15

# Maximum number of parents for a class (see R0901).
max-parents=7

# Maximum number of public methods for a class (see R0904).
max-public-methods=20

# Maximum number of return / yield for function / method body.
max-returns=6

# Maximum number of statements in function / method body.
max-statements=50

# Minimum number of public methods for a class (see R0903).
min-public-methods=2


[EXCEPTIONS]

# Exceptions that will emit a warning when caught.
overgeneral-exceptions=builtins.BaseException,builtins.Exception


[FORMAT]

# Expected format of line ending, e.g. empty (any line ending), LF or CRLF.
expected-line-ending-format=

# Regexp for a line that is allowed to be longer than the limit.
ignore-long-lines=^\s*(# )?<?https?://\S+>?$

# Number of spaces of indent required inside a hanging or continued line.
indent-after-paren=4

# String used as indentation unit. This is usually "    " (4 spaces) or "\t" (1
# tab).
indent-string='    '

# Maximum number of characters on a single line.
max-line-length=100

# Maximum number of lines in a module.
max-module-lines=1000

# Allow the body of a class to be on the same line as the declaration if body
# contains single statement.
single-line-class-stmt=no

# Allow the body of an if to be on the same line as the test if there is no
# else.
single-line-if-stmt=no


[IMPORTS]

# List of modules that can be imported at any level, not just the top level
# one.
allow-any-import-level=

# Allow explicit reexports by alias from a package __init__.
allow-reexport-from-package=no

# Allow wildcard imports from modules that define __all__.
allow-wildcard-with-all=no

# Deprecated modules which should not be used, separated by a comma.
deprecated-modules=

# Output a graph (.gv or any supported image format) of external dependencies
# to the given file (report RP0402 must not be disabled).
ext-import-graph=

# Output a graph (.gv or any supported image format) of all (i.e. internal and
# external) dependencies to the given file (report RP0402 must not be
# disabled).
import-graph=

# Output a graph (.gv or any supported image format) of internal dependencies
# to the given file (report RP0402 must not be disabled).
int-import-graph=

# Force import order to recognize a module as part of the standard
# compatibility libraries.
known-standard-library=

# Force import order to recognize a module as part of a third party library.
known-third-party=enchant

# Couples of modules and preferred modules, separated by a comma.
preferred-modules=


[LOGGING]

# The type of string formatting that logging methods do. `old` means using %
# formatting, `new` is for `{}` formatting.
logging-format-style=old

# Logging modules to check that the string format arguments are in logging
# function parameter format.
logging-modules=logging


[MESSAGES CONTROL]

# Only show warnings with the listed confidence levels. Leave empty to show
# all. Valid levels: HIGH, CONTROL_FLOW, INFERENCE, INFERENCE_FAILURE,
# UNDEFINED.
confidence=HIGH,
           CONTROL_FLOW,
           INFERENCE,
           INFERENCE_FAILURE,
           UNDEFINED

# Disable the message, report, category or checker with the given id(s). You
# can either give multiple identifiers separated by comma (,) or put this
# option multiple times (only on the command line, not in the configuration
# file where it should appear only once). You can also use "--disable=all" to
# disable everything first and then re-enable specific checks. For example, if
# you want to run only the similarities checker, you can use "--disable=all
# --enable=similarities". If you want to run only the classes checker, but have
# no Warning level messages displayed, use "--disable=all --enable=classes
# --disable=W".
disable=raw-checker-failed,
        bad-inline-option,
        locally-disabled,
        file-ignored,
        suppressed-message,
        useless-suppression,
        deprecated-pragma,
        use-symbolic-message-instead
        unnecessary-pass
        invalid-name


# Enable the message, report, category or checker with the given id(s). You can
# either give multiple identifier separated by comma (,) or put this option
# multiple time (only on the command line, not in the configuration file where
# it should appear only once). See also the "--disable" option for examples.
enable=c-extension-no-member


[METHOD_ARGS]

# List of qualified names (i.e., library.method) which require a timeout
# parameter e.g. 'requests.api.get,requests.api.post'
timeout-methods=requests.api.delete,requests.api.get,requests.api.head,requests.api.options,requests.api.patch,requests.api.post,requests.api.put,requests.api.request


[MISCELLANEOUS]

# List of note tags to take in consideration, separated by a comma.
notes=FIXME,
      XXX,
      TODO

# Regular expression of note tags to take in consideration.
notes-rgx=


[REFACTORING]

# Maximum number of nested blocks for function / method body
max-nested-blocks=5

# Complete name of functions that never returns. When checking for
# inconsistent-return-statements if a never returning function is called then
# it will be considered as an explicit return statement and no message will be
# printed.
never-returning-functions=sys.exit,argparse.parse_error


[REPORTS]

# Python expression which should return a score less than or equal to 10. You
# have access to the variables 'fatal', 'error', 'warning', 'refactor',
# 'convention', and 'info' which contain the number of messages in each
# category, as well as 'statement' which is the total number of statements
# analyzed. This score is used by the global evaluation report (RP0004).
evaluation=max(0, 0 if fatal else 10.0 - ((float(5 * error + warning + refactor + convention) / statement) * 10))

# Template used to display messages. This is a python new-style format string
# used to format the message information. See doc for all details.
msg-template=

# Set the output format. Available formats are text, parseable, colorized, json
# and msvs (visual studio). You can also give a reporter class, e.g.
# mypackage.mymodule.MyReporterClass.
#output-format=

# Tells whether to display a full report or only the messages.
reports=no

# Activate the evaluation score.
score=yes


[SIMILARITIES]

# Comments are removed from the similarity computation
ignore-comments=yes

# Docstrings are removed from the similarity computation
ignore-docstrings=yes

# Imports are removed from the similarity computation
ignore-imports=yes

# Signatures are removed from the similarity computation
ignore-signatures=yes

# Minimum lines number of a similarity.
min-similarity-lines=4


[SPELLING]

# Limits count of emitted suggestions for spelling mistakes.
max-spelling-suggestions=4

# Spelling dictionary name. No available dictionaries : You need to install
# both the python package and the system dependency for enchant to work..
spelling-dict=

# List of comma separated words that should be considered directives if they
# appear at the beginning of a comment and should not be checked.
spelling-ignore-comment-directives=fmt: on,fmt: off,noqa:,noqa,nosec,isort:skip,mypy:

# List of comma separated words that should not be checked.
spelling-ignore-words=

# A path to a file that contains the private dictionary; one word per line.
spelling-private-dict-file=

# Tells whether to store unknown words to the private dictionary (see the
# --spelling-private-dict-file option) instead of raising a message.
spelling-store-unknown-words=no


[STRING]

# This flag controls whether inconsistent-quotes generates a warning when the
# character used as a quote delimiter is used inconsistently within a module.
check-quote-consistency=no

# This flag controls whether the implicit-str-concat should generate a warning
# on implicit string concatenation in sequences defined over several lines.
check-str-concat-over-line-jumps=no


[TYPECHECK]

# List of decorators that produce context managers, such as
# contextlib.contextmanager. Add to this list to register other decorators that
# produce valid context managers.
contextmanager-decorators=contextlib.contextmanager

# List of members which are set dynamically and missed by pylint inference
# system, and so shouldn't trigger E1101 when accessed. Python regular
# expressions are accepted.
generated-members=

# Tells whether to warn about missing members when the owner of the attribute
# is inferred to be None.
ignore-none=yes

# This flag controls whether pylint should warn about no-member and similar
# checks whenever an opaque object is returned when inferring. The inference
# can return multiple potential results while evaluating a Python object, but
# some branches might not be evaluated, which results in partial inference. In
# that case, it might be useful to still emit no-member and other checks for
# the rest of the inferred objects.
ignore-on-opaque-inference=yes

# List of symbolic message names to ignore for Mixin members.
ignored-checks-for-mixins=no-member,
                          not-async-context-manager,
                          not-context-manager,
                          attribute-defined-outside-init

# List of class names for which member attributes should not be checked (useful
# for classes with dynamically set attributes). This supports the use of
# qualified names.
ignored-classes=optparse.Values,thread._local,_thread._local,argparse.Namespace

# Show a hint with possible names when a member name was not found. The aspect
# of finding the hint is based on edit distance.
missing-member-hint=yes

# The minimum edit distance a name should have in order to be considered a
# similar match for a missing member name.
missing-member-hint-distance=1

# The total number of similar names that should be taken in consideration when
# showing a hint for a missing member.
missing-member-max-choices=1

# Regex pattern to define which classes are considered mixins.
mixin-class-rgx=.*[Mm]ixin

# List of decorators that change the signature of a decorated function.
signature-mutators=


[VARIABLES]

# List of additional names supposed to be defined in builtins. Remember that
# you should avoid defining new builtins when possible.
additional-builtins=

# Tells whether unused global variables should be treated as a violation.
allow-global-unused-variables=yes

# List of names allowed to shadow builtins
allowed-redefined-builtins=

# List of strings which can identify a callback function by name. A callback
# name must start or end with one of those strings.
callbacks=cb_,
          _cb

# A regular expression matching the name of dummy variables (i.e. expected to
# not be used).
dummy-variables-rgx=_+$|(_[a-zA-Z0-9_]*[a-zA-Z0-9]+?$)|dummy|^ignored_|^unused_

# Argument names that match this expression will be ignored.
ignored-argument-names=_.*|^ignored_|^unused_

# Tells whether we should check for unused import in __init__ files.
init-import=no

# List of qualified module names which can have objects that can redefine
# builtins.
redefining-builtins-modules=six.moves,past.builtins,future.builtins,builtins,io



================================================
FILE: pyproject.toml
================================================
[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.build_meta:__legacy__"


================================================
FILE: setup.py
================================================
#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Note: To use the 'upload' functionality of this file, you must:
#   $ pipenv install twine --dev

import io
import os
import sys
from shutil import rmtree

from setuptools import find_packages, setup, Command

# Package meta-data.
NAME = "serpapi"
DESCRIPTION = "The official Python client for SerpApi.com."
URL = "https://github.com/serpapi/serpapi-python"
EMAIL = "kenneth@serpapi.com"
AUTHOR = "SerpApi.com"
REQUIRES_PYTHON = ">=3.6.0"
VERSION = None

# What packages are required for this module to be executed?
REQUIRED = ["requests"]

# What packages are optional?
EXTRAS = {"color": ["pygments"], "test": ["pytest"]}

here = os.path.abspath(os.path.dirname(__file__))

# Import the README and use it as the long-description.
# Note: this will only work if 'README.md' is present in your MANIFEST.in file!
try:
    with io.open(os.path.join(here, "README.md"), encoding="utf-8") as f:
        long_description = "\n" + f.read()
except FileNotFoundError:
    long_description = DESCRIPTION

# Load the package's __version__.py module as a dictionary.
about = {}
if not VERSION:
    project_slug = NAME.lower().replace("-", "_").replace(" ", "_")
    with open(os.path.join(here, project_slug, "__version__.py")) as f:
        exec(f.read(), about)
else:
    about["__version__"] = VERSION


class TestCommand(Command):
    """Support setup.py test."""

    description = "Test the package."
    user_options = []

    @staticmethod
    def status(s):
        """Prints things in bold."""
        print("\033[1m{0}\033[0m".format(s))

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        os.system("{0} -m pytest".format(sys.executable))
        sys.exit()

class UploadCommand(Command):
    """Support setup.py upload."""

    description = "Build and publish the package."
    user_options = []

    @staticmethod
    def status(s):
        """Prints things in bold."""
        print("\033[1m{0}\033[0m".format(s))

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        try:
            self.status("Removing previous builds…")
            rmtree(os.path.join(here, "dist"))
        except OSError:
            pass

        self.status("Building Source and Wheel (universal) distribution…")
        os.system("{0} setup.py sdist bdist_wheel --universal".format(sys.executable))

        self.status("Uploading the package to PyPI via Twine…")
        os.system("twine upload dist/*")

        self.status("Pushing git tags…")
        os.system("git tag v{0}".format(about["__version__"]))
        os.system("git push --tags")

        sys.exit()


# Where the magic happens:
setup(
    name=NAME,
    version=about["__version__"],
    description=DESCRIPTION,
    long_description=long_description,
    long_description_content_type="text/markdown",
    author=AUTHOR,
    author_email=EMAIL,
    python_requires=REQUIRES_PYTHON,
    url=URL,
    packages=find_packages(exclude=["tests", "*.tests", "*.tests.*", "tests.*"]),
    # If your package is a single module, use this instead of 'packages':
    # py_modules=['mypackage'],
    # entry_points={
    #     'console_scripts': ['mycli=mymodule:cli'],
    # },
    install_requires=REQUIRED,
    extras_require=EXTRAS,
    include_package_data=True,
    license="MIT",
    project_urls={"Documentation": "https://serpapi-python.readthedocs.io/en/latest/"},
    keywords="scrape,serp,api,serpapi,scraping,json,search,localized,rank,google,bing,baidu,yandex,yahoo,ebay,scale,datamining,training,machine,ml,youtube,naver,walmart,apple,store,app,serpapi",
    classifiers=[
        # Trove classifiers
        # Full list: https://pypi.python.org/pypi?%3Aaction=list_classifiers
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Natural Language :: English",
        "Topic :: Utilities",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: Indexing/Search",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Programming Language :: Python :: Implementation :: CPython",
    ],
    # $ setup.py publish support.
    cmdclass={
        "upload": UploadCommand,
        "test": TestCommand
    },
)



================================================
FILE: .readthedocs.yaml
================================================
# .readthedocs.yaml
# Read the Docs configuration file
# See https://docs.readthedocs.io/en/stable/config-file/v2.html for details

# Required
version: 2

# Set the OS, Python version and other tools you might need
build:
  os: ubuntu-22.04
  tools:
    python: "3.11"
    # You can also specify other tool versions:
    # nodejs: "19"
    # rust: "1.64"
    # golang: "1.19"

# Build documentation in the "docs/" directory with Sphinx
sphinx:
  configuration: docs/conf.py

# Optionally build your docs in additional formats such as PDF and ePub
formats:
  - pdf
  - epub

# Optional but recommended, declare the Python requirements required
# to build your documentation
# See https://docs.readthedocs.io/en/stable/guides/reproducible-builds.html
python:
  install:
    - requirements: docs/requirements.txt



================================================
FILE: docs/conf.py
================================================
# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys

sys.path.insert(0, os.path.abspath("../.."))

import serpapi

# -- Project information -----------------------------------------------------

project = "serpapi-python"
copyright = "2023 SerpApi, LLC"
author = "SerpApi, LLC"

# The full version, including alpha/beta/rc tags
release = serpapi.__version__


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ["sphinx.ext.githubpages", "sphinx.ext.autodoc"]

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "alabaster"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]


# -- Extension configuration -------------------------------------------------
html_theme_options = {
    "logo": "serpapi-python.png",
    "logo_name": "serapi-python",
}

html_sidebars = {
    "**": [
        "about.html",
    ]
}



================================================
FILE: docs/index.rst
================================================
.. serpapi-python documentation master file, created by
   sphinx-quickstart on Sun Apr  3 21:09:40 2022.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

**serpapi-python**
==================

an official Python client library for `SerpApi <https://serpapi.com>`_.

--------------

Installation
------------

To install ``serpapi-python``, simply use `pip`::

    $ pip install serpapi


Please note that Python 3.6+ is required.


Usage
-----

Usage of this module is fairly straight-forward. In general, this module attempts to be as close to the actual API as possible, while still being Pythonic.

For example, the API endpoint ``https://serpapi.com/search.json`` is represented by the method ``serpapi.search()``.

.. code-block:: python

   >>> import serpapi
   >>> s = serpapi.search(q="Coffee", engine="google", location="Austin, Texas", hl="en", gl="us")
   >>> s["organic_results"][0]["link"]
   'https://en.wikipedia.org/wiki/Coffee'

Any parameters that you pass to ``search()`` will be passed to the API. This includes the ``api_key`` parameter, which is required for all requests.

.. _using-api-client-directly:

Using the API Client directly
^^^^^^^^^

To make this less repetitive, and gain the benefit of connection pooling, let's start using the API Client directly::

   >>> client = serpapi.Client(api_key="secret_api_key")
   >>> s = client.search(q="Coffee", engine="google", location="Austin, Texas", hl="en", gl="us")

The ``api_key`` parameter is now automatically passed to all requests made by the client.


Concise Tutorial
----------------

Let's start by searching for ``Coffee`` on Google::

   >>> import serpapi
   >>> s = serpapi.search(q="Coffee", engine="google", location="Austin, Texas", hl="en", gl="us")

The ``s`` variable now contains a :class:`SerpResults <serpapi.SerpResults>` object, which acts just like a standard dictionary, with some convenient functions added on top.

Let's print the first result::

   >>> print(s["organic_results"][0]["link"])
   https://en.wikipedia.org/wiki/Coffee

Let's print the title of the first result, but in a more Pythonic way::

   >>> print(s["organic_results"][0].get("title"))
   Coffee - Wikipedia

The `SerpApi.com API Documentation <https://serpapi.com/search-api>`_ contains a list of all the possible parameters that can be passed to the API.


API Reference
-------------

.. _api-reference:

This part of the documentation covers all the interfaces of :class:`serpapi` Python module.

.. module:: serpapi
   :platform: Unix, Windows
   :synopsis: SerpApi Python Library

.. autofunction:: serpapi.search
.. autofunction:: serpapi.search_archive
.. autofunction:: serpapi.locations
.. autofunction:: serpapi.account



Results from SerpApi.com
------------------------

When a successful search has been executed, the method returns
a :class:`SerpResults <serpapi.SerpResults>` object, which acts just like a standard dictionary,
with some convenient functions added on top.


.. code-block:: python

   >>> s = serpapi.search(q="Coffee", engine="google", location="Austin, Texas", hl="en", gl="us")
   >>> type(s)
   <class 'serpapi.models.SerpResults'>

   >>> s["organic_results"][0]["link"]
   'https://en.wikipedia.org/wiki/Coffee'

   >>> s["search_metadata"]
   {'id': '64c148d35119a60ab1e00cc9', 'status': 'Success', 'json_endpoint': 'https://serpapi.com/searches/a15e1b92727f292c/64c148d35119a60ab1e00cc9.json', 'created_at': '2023-07-26 16:24:51 UTC', 'processed_at': '2023-07-26 16:24:51 UTC', 'google_url': 'https://www.google.com/search?q=Coffee&oq=Coffee&uule=w+CAIQICIdQXVzdGluLFRYLFRleGFzLFVuaXRlZCBTdGF0ZXM&hl=en&gl=us&sourceid=chrome&ie=UTF-8', 'raw_html_file': 'https://serpapi.com/searches/a15e1b92727f292c/64c148d35119a60ab1e00cc9.html', 'total_time_taken': 1.55}

Optionally, if you want exactly a dictionary of the entire response, you can use the ``as_dict()`` method::

   >>> type(s.as_dict())
   <class 'dict'>

You can get the next page of results::

   >>> type(s.next_page())
   <class 'serpapi.models.SerpResults'>

To iterate over all pages of results, it's recommended to :ref:`use the API Client directly <using-api-client-directly>`::

   >>> client = serpapi.Client(api_key="secret_api_key")
   >>> search = client.search(q="Coffee", engine="google", location="Austin, Texas", hl="en", gl="us")
   >>> for page in search.yield_pages():
   ...     print(page["search_metadata"]["page_number"])
   1
   2
   3
   4
   5
   6
   7
   8
   9
   10


Here's documentation of the class itself and its methods:

.. autoclass:: serpapi.SerpResults

   .. automethod:: SerpResults.next_page
   .. automethod:: SerpResults.yield_pages
   .. autoproperty:: SerpResults.next_page_url


API Client
----------

The primary interface to `serpapi-python` is through the :class:`serpapi.Client` class.
The primary benefit of using this class is to benefit from Requests' HTTP Connection Pooling.
This class also alleviates the need to pass an ``api_key```  along with every search made to the platform.

.. autoclass:: serpapi.Client

   .. automethod:: Client.search
   .. automethod:: Client.search_archive
   .. automethod:: Client.account
   .. automethod:: Client.locations



Exceptions
----------

.. autoexception:: serpapi.SerpApiError
   :members:

.. autoexception:: serpapi.SearchIDNotProvided
   :members:

.. autoexception:: serpapi.HTTPError
   :members:

.. autoexception:: serpapi.HTTPConnectionError
   :members:





Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`



================================================
FILE: docs/Makefile
================================================
# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = .
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)



================================================
FILE: docs/requirements.txt
================================================
alabaster==0.7.13
astroid==2.15.5
Babel==2.12.1
bleach==6.0.0
certifi==2023.5.7
charset-normalizer==3.2.0
coverage==7.2.7
dill==0.3.6
docutils==0.20.1
idna==3.4
imagesize==1.4.1
importlib-metadata==6.7.0
iniconfig==2.0.0
isort==5.12.0
jaraco.classes==3.2.3
Jinja2==3.1.2
keyring==24.2.0
lazy-object-proxy==1.9.0
markdown-it-py==3.0.0
MarkupSafe==2.1.3
mccabe==0.7.0
mdurl==0.1.2
more-itertools==9.1.0
packaging==23.1
pkginfo==1.9.6
platformdirs==3.8.0
pluggy==1.2.0
pycodestyle==2.10.0
Pygments==2.15.1
pylint==2.17.4
pytest==7.4.0
pytest-cov==4.1.0
readme-renderer==40.0
requests==2.31.0
requests-toolbelt==1.0.0
rfc3986==2.0.0
rich==13.4.2
six==1.16.0
snowballstemmer==2.2.0
Sphinx==7.0.1
sphinxcontrib-applehelp==1.0.4
sphinxcontrib-devhelp==1.0.2
sphinxcontrib-htmlhelp==2.0.1
sphinxcontrib-jsmath==1.0.1
sphinxcontrib-qthelp==1.0.3
sphinxcontrib-serializinghtml==1.1.5
tomlkit==0.11.8
twine==4.0.2
urllib3==2.0.3
webencodings==0.5.1
wrapt==1.15.0
zipp==3.15.0
-e .



================================================
FILE: serpapi/__init__.py
================================================
from .__version__ import __version__

from .core import *
from .exceptions import *



================================================
FILE: serpapi/__version__.py
================================================
__version__ = "0.1.6"



================================================
FILE: serpapi/core.py
================================================
from .http import HTTPClient
from .exceptions import SearchIDNotProvided
from .models import SerpResults


class Client(HTTPClient):
    """A class that handles API requests to SerpApi in a user–friendly manner.

    :param api_key: The API Key to use for SerpApi.com.

    Please provide ``api_key`` when instantiating this class. We recommend storing this in an environment variable, like so:

        .. code-block:: bash

            $ export SERPAPI_KEY=YOUR_API_KEY

        .. code-block:: python

            import os
            import serpapi

            serpapi = serpapi.Client(api_key=os.environ["SERPAPI_KEY"])

    """

    DASHBOARD_URL = "https://serpapi.com/dashboard"

    def __init__(self, *, api_key=None, timeout=None):
        super().__init__(api_key=api_key, timeout=timeout)

    def __repr__(self):
        return "<SerpApi Client>"

    def search(self, params: dict = None, **kwargs):
        """Fetch a page of results from SerpApi. Returns a :class:`SerpResults <serpapi.client.SerpResults>` object, or unicode text (*e.g.* if ``'output': 'html'`` was passed).

        The following three calls are equivalent:

        .. code-block:: python

            >>> s = serpapi.search(q="Coffee", location="Austin, Texas, United States")

        .. code-block:: python

            >>> params = {"q": "Coffee", "location": "Austin, Texas, United States"}
            >>> s = serpapi.search(**params)

        .. code-block:: python

            >>> params = {"q": "Coffee", "location": "Austin, Texas, United States"}
            >>> s = serpapi.search(params)


        :param q: typically, this is the parameter for the search engine query.
        :param engine: the search engine to use. Defaults to ``google``.
        :param output: the output format desired (``html`` or ``json``). Defaults to ``json``.
        :param api_key: the API Key to use for SerpApi.com.
        :param **: any additional parameters to pass to the API.


        **Learn more**: https://serpapi.com/search-api
        """
        if params is None:
            params = {}

        # These are arguments that should be passed to the underlying requests.request call.
        request_kwargs = {}
        for key in ["timeout", "proxies", "verify", "stream", "cert"]:
            if key in kwargs:
                request_kwargs[key] = kwargs.pop(key)

        if kwargs:
            params.update(kwargs)

        r = self.request("GET", "/search", params=params, **request_kwargs)

        return SerpResults.from_http_response(r, client=self)

    def search_archive(self, params: dict = None, **kwargs):
        """Get a result from the SerpApi Search Archive API.

        :param search_id: the Search ID of the search to retrieve from the archive.
        :param api_key: the API Key to use for SerpApi.com.
        :param output: the output format desired (``html`` or ``json``). Defaults to ``json``.
        :param **: any additional parameters to pass to the API.

        **Learn more**: https://serpapi.com/search-archive-api
        """
        if params is None:
            params = {}

        # These are arguments that should be passed to the underlying requests.request call.
        request_kwargs = {}
        for key in ["timeout", "proxies", "verify", "stream", "cert"]:
            if key in kwargs:
                request_kwargs[key] = kwargs.pop(key)

        if kwargs:
            params.update(kwargs)

        try:
            search_id = params["search_id"]
        except KeyError:
            raise SearchIDNotProvided(
                f"Please provide 'search_id', found here: { self.DASHBOARD_URL }"
            )

        r = self.request("GET", f"/searches/{ search_id }", params=params, **request_kwargs)
        return SerpResults.from_http_response(r, client=self)

    def locations(self, params: dict = None, **kwargs):
        """Get a list of supported Google locations.


        :param q: restricts your search to locations that contain the supplied string.
        :param limit: limits the number of locations returned.
        :param **: any additional parameters to pass to the API.

        **Learn more**: https://serpapi.com/locations-api
        """
        if params is None:
            params = {}

        # These are arguments that should be passed to the underlying requests.request call.
        request_kwargs = {}
        for key in ["timeout", "proxies", "verify", "stream", "cert"]:
            if key in kwargs:
                request_kwargs[key] = kwargs.pop(key)

        if kwargs:
            params.update(kwargs)

        r = self.request(
            "GET",
            "/locations.json",
            params=params,
            assert_200=True,
            **request_kwargs,
        )
        return r.json()

    def account(self, params: dict = None, **kwargs):
        """Get SerpApi account information.

        :param api_key: the API Key to use for SerpApi.com.
        :param **: any additional parameters to pass to the API.

        **Learn more**: https://serpapi.com/account-api
        """

        if params is None:
            params = {}

        # These are arguments that should be passed to the underlying requests.request call.
        request_kwargs = {}
        for key in ["timeout", "proxies", "verify", "stream", "cert"]:
            if key in kwargs:
                request_kwargs[key] = kwargs.pop(key)

        if kwargs:
            params.update(kwargs)

        r = self.request("GET", "/account.json", params=params, assert_200=True, **request_kwargs)
        return r.json()


# An un-authenticated client instance.
_client = Client()
search = _client.search
search_archive = _client.search_archive
locations = _client.locations
account = _client.account



================================================
FILE: serpapi/exceptions.py
================================================
import requests


class SerpApiError(Exception):
    """Base class for exceptions in this module."""

    pass


class APIKeyNotProvided(ValueError, SerpApiError):
    """API key is not provided."""

    pass


class SearchIDNotProvided(ValueError, SerpApiError):
    """Search ID is not provided."""

    pass


class HTTPError(requests.exceptions.HTTPError, SerpApiError):
    """HTTP Error."""

    def __init__(self, original_exception):
        if (isinstance(original_exception, requests.exceptions.HTTPError)):
            http_error_exception: requests.exceptions.HTTPError = original_exception

            self.status_code = http_error_exception.response.status_code
            try:
                self.error = http_error_exception.response.json().get("error", None)
            except requests.exceptions.JSONDecodeError:
                self.error = None
        else:
            self.status_code = -1
            self.error = None
                
        super().__init__(*original_exception.args, response=getattr(original_exception, 'response', None), request=getattr(original_exception, 'request', None))



class HTTPConnectionError(HTTPError, requests.exceptions.ConnectionError, SerpApiError):
    """Connection Error."""

    pass


class TimeoutError(requests.exceptions.Timeout, SerpApiError):
    """Timeout Error."""

    pass



================================================
FILE: serpapi/http.py
================================================
import requests

from .exceptions import (
    HTTPError,
    HTTPConnectionError,
    TimeoutError,
)
from .__version__ import __version__


class HTTPClient:
    """This class handles outgoing HTTP requests to SerpApi.com."""

    BASE_DOMAIN = "https://serpapi.com"
    USER_AGENT = f"serpapi-python, v{__version__}"

    def __init__(self, *, api_key=None, timeout=None):
        # Used to authenticate requests.
        # TODO: do we want to support the environment variable? Seems like a security risk.
        self.api_key = api_key
        self.timeout = timeout
        self.session = requests.Session()

    def request(self, method, path, params, *, assert_200=True, **kwargs):
        # Inject the API Key into the params.
        if "api_key" not in params:
            params["api_key"] = self.api_key

        # Build the URL, as needed.
        if not path.startswith("http"):
            url = self.BASE_DOMAIN + path
        else:
            url = path

        # Make the HTTP request.
        try:
            headers = {"User-Agent": self.USER_AGENT}

            # Use the default timeout if one was provided to the client.
            if self.timeout and "timeout" not in kwargs:
                kwargs["timeout"] = self.timeout

            r = self.session.request(
                method=method, url=url, params=params, headers=headers, **kwargs
            )

        except requests.exceptions.ConnectionError as e:
            raise HTTPConnectionError(e)
        except requests.exceptions.Timeout as e:
            raise TimeoutError(e)

        # Raise an exception if the status code is not 200.
        if assert_200:
            try:
                raise_for_status(r)
            except requests.exceptions.HTTPError as e:
                raise HTTPError(e)

        return r


def raise_for_status(r):
    """Raise an exception if the status code is not 200."""
    # TODO: put custom behavior in here for various status codes.

    try:
        r.raise_for_status()
    except requests.exceptions.HTTPError as e:
        raise HTTPError(e)



================================================
FILE: serpapi/models.py
================================================
import json

from pprint import pformat
from collections import UserDict

from .textui import prettify_json
from .exceptions import HTTPError


class SerpResults(UserDict):
    """A dictionary-like object that represents the results of a SerpApi request.

    .. code-block:: python

        >>> search = serpapi.search(q="Coffee", location="Austin, Texas, United States")

        >>> print(search["search_metadata"].keys())
        dict_keys(['id', 'status', 'json_endpoint', 'created_at', 'processed_at', 'google_url', 'raw_html_file', 'total_time_taken'])

    An instance of this class is returned if the response is a valid JSON object.
    It can be used like a dictionary, but also has some additional methods.
    """

    def __init__(self, data, *, client):
        super().__init__(data)
        self.client = client

    def __getstate__(self):
        return self.data

    def __setstate__(self, state):
        self.data = state

    def __repr__(self):
        """The visual representation of the data, which is pretty printed, for
        ease of use.
        """

        return prettify_json(json.dumps(self.data, indent=4))

    def as_dict(self):
        """Returns the data as a standard Python dictionary.
        This can be useful when using ``json.dumps(search), for example."""

        return self.data.copy()

    @property
    def next_page_url(self):
        """The URL of the next page of results, if any."""

        serpapi_pagination = self.data.get("serpapi_pagination")

        if serpapi_pagination:
            return serpapi_pagination.get("next")

    def next_page(self):
        """Return the next page of results, if any."""

        if self.next_page_url:
            # Include support for the API key, as it is not included in the next page URL.
            params = {"api_key": self.client.api_key}

            r = self.client.request("GET", path=self.next_page_url, params=params)
            return SerpResults.from_http_response(r, client=self.client)

    def yield_pages(self, max_pages=1_000):
        """A generator that ``yield`` s the next ``n`` pages of search results, if any.

        :param max_pages: limit the number of pages yielded to ``n``.
        """

        current_page_count = 0
              
        current_page = self
        while current_page and current_page_count < max_pages:
            yield current_page
            current_page_count += 1
            if current_page.next_page_url:
                current_page = current_page.next_page()
            else:
                break
            

    @classmethod
    def from_http_response(cls, r, *, client=None):
        """Construct a SerpResults object from an HTTP response.

        :param assert_200: if ``True`` (default), raise an exception if the status code is not 200.
        :param client: the Client instance which was used to send this request.

        An instance of this class is returned if the response is a valid JSON object.
        Otherwise, the raw text (as a properly decoded unicode string) is returned.
        """

        try:
            cls = cls(r.json(), client=client)

            return cls
        except ValueError:
            # If the response is not JSON, return the raw text.
            return r.text



================================================
FILE: serpapi/textui.py
================================================
try:
    import pygments
    from pygments import highlight, lexers, formatters
except ImportError:
    pygments = None


def prettify_json(s):
    if pygments:
        return highlight(
            s,
            lexers.JsonLexer(),
            formatters.TerminalFormatter(),
        )
    else:
        return s



================================================
FILE: serpapi/utils.py
================================================
import os


def api_key_from_environment():
    return os.getenv("SERP_API_KEY")



================================================
FILE: tests/__init__.py
================================================
[Empty file]


================================================
FILE: tests/conftest.py
================================================
import os

import pytest

import serpapi

os.environ["CI"] = "1"


@pytest.fixture
def api_key():
    return os.environ["API_KEY"]


@pytest.fixture
def client(api_key):
    return serpapi.Client(api_key=api_key)


@pytest.fixture
def invalid_key_client(api_key):
    return serpapi.Client(api_key="bunk-key")


@pytest.fixture
def coffee_params():
    return {"q": "Coffee"}


@pytest.fixture
def coffee_search(client, coffee_params):
    return client.search(**coffee_params)


@pytest.fixture
def coffee_search_html(client, coffee_params):
    params = coffee_params.copy()
    params["output"] = "html"

    return client.search(**params)



================================================
FILE: tests/example_search_apple_app_store_test.py
================================================
# Example: apple_app_store search engine
import pytest
import os
import serpapi

def test_search_apple_app_store(client):
  data = client.search({
      'engine': 'apple_app_store',
      'term': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_baidu_test.py
================================================
# Example: baidu search engine
import pytest
import os
import serpapi


def test_search_baidu(client):
  data = client.search({
      'engine': 'baidu',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_bing_test.py
================================================
# Example: bing search engine
import pytest
import os
import serpapi

def test_search_bing(client):
  data = client.search({
      'engine': 'bing',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_duckduckgo_test.py
================================================
# Example: duckduckgo search engine
import pytest
import os
import serpapi

def test_search_duckduckgo(client):
  data = client.search({
      'engine': 'duckduckgo',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_ebay_test.py
================================================
# Example: ebay search engine
import pytest
import os
import serpapi

def test_search_ebay(client):
  data = client.search({
      'engine': 'ebay',
      '_nkw': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_google_autocomplete_test.py
================================================
# Example: google_autocomplete search engine
import pytest
import os
import serpapi

def test_search_google_autocomplete(client):
  data = client.search({
      'engine': 'google_autocomplete',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['suggestions']



================================================
FILE: tests/example_search_google_events_test.py
================================================
# Example: google_events search engine
import pytest
import os
import serpapi

def test_search_google_events(client):
  data = client.search({
      'engine': 'google_events',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['events_results']



================================================
FILE: tests/example_search_google_images_test.py
================================================
# Example: google_images search engine
import pytest
import os
import serpapi

def test_search_google_images(client):
  data = client.search({
      'engine': 'google_images',
      'engine': 'google_images',
      'tbm': 'isch',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['images_results']



================================================
FILE: tests/example_search_google_jobs_test.py
================================================
# Example: google_jobs search engine
import pytest
import os
import serpapi

def test_search_google_jobs(client):
  data = client.search({
      'engine': 'google_jobs',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['jobs_results']



================================================
FILE: tests/example_search_google_local_services_test.py
================================================
# Example: google_local_services search engine
import pytest
import os
import serpapi

def test_search_google_local_services(client):

  data = client.search({
      'engine': 'google_local_services',
      'q': 'electrician',
      'data_cid': '6745062158417646970',
  })
  assert data.get('error') is None
  assert data['local_ads']



================================================
FILE: tests/example_search_google_maps_test.py
================================================
# Example: google_maps search engine
import pytest
import os
import serpapi

def test_search_google_maps(client):
  data = client.search({
      'engine': 'google_maps',
      'q': 'pizza',
      'll': '@40.7455096,-74.0083012,15.1z',
      'type': 'search',
  })
  assert data.get('error') is None
  assert data['local_results']



================================================
FILE: tests/example_search_google_play_test.py
================================================
# Example: google_play search engine
import pytest
import os
import serpapi

def test_search_google_play(client):
  data = client.search({
      'engine': 'google_play',
      'q': 'kite',
      'store': 'apps',
      'max_results': '2',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_google_scholar_test.py
================================================
# Example: google_scholar search engine
import pytest
import os
import serpapi

def test_search_google_scholar(client):

  data = client.search({
      'engine': 'google_scholar',
      'q': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_google_test.py
================================================
# Example: google search engine
import pytest
import os
import serpapi

def test_search_google(client):

  data = client.search({
      'engine': 'google',
      'q': 'coffee',
      'engine': 'google',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_home_depot_test.py
================================================
# Example: home_depot search engine
import pytest
import os
import serpapi

def test_search_home_depot(client):

  data = client.search({
      'engine': 'home_depot',
      'q': 'table',
  })
  assert data.get('error') is None
  assert data['products']



================================================
FILE: tests/example_search_naver_test.py
================================================
# Example: naver search engine
import pytest
import os
import serpapi

def test_search_naver(client):
  data = client.search({
      'engine': 'naver',
      'query': 'coffee',
  })
  assert data.get('error') is None
  assert data['ads_results']



================================================
FILE: tests/example_search_walmart_test.py
================================================
# Example: walmart search engine
import pytest
import os
import serpapi

def test_search_walmart(client):
  data = client.search({
      'engine': 'walmart',
      'query': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']




================================================
FILE: tests/example_search_yahoo_test.py
================================================
# Example: yahoo search engine
import pytest
import os
import serpapi

def test_search_yahoo(client):
  data = client.search({
      'engine': 'yahoo',
      'p': 'coffee',
  })
  assert data.get('error') is None
  assert data['organic_results']



================================================
FILE: tests/example_search_youtube_test.py
================================================
# Example: youtube search engine
import pytest
import os
import serpapi

def test_search_youtube(client):

  data = client.search({
      'engine': 'youtube',
      'search_query': 'coffee',
  })
  assert data.get('error') is None
  assert data['video_results']



================================================
FILE: tests/test_exceptions.py
================================================
from unittest.mock import Mock
import requests
import serpapi


def test_http_error():
    """Ensure that an HTTPError has the correct status code and error."""
    mock_response = Mock()
    mock_response.status_code = 401
    mock_response.json.return_value = { "error": "Invalid API key" }
    
    requests_error = requests.exceptions.HTTPError(response=mock_response, request=Mock())
    http_error = serpapi.HTTPError(requests_error)
        
    assert http_error.status_code == 401
    assert http_error.error == "Invalid API key"
    assert http_error.response == mock_response



================================================
FILE: tests/test_integration.py
================================================
import pytest

import serpapi


def test_basic_import():
    """Test that basic import works as intended."""
    import serpapi


def test_entrypoints(client):
    """Test that pure references to the publicly accessible API surface introduces no errors."""

    for api in [client, serpapi]:
        assert api.account
        assert api.search
        assert api.search_archive
        assert api.locations


def test_account_without_credentials():
    """Ensure that an HTTPError is raised when account is accessed without API Credentials."""
    with pytest.raises(serpapi.HTTPError):
        serpapi.account()


def test_account_with_bad_credentials(invalid_key_client):
    """Ensure that an HTTPError is raised when account is accessed with invalid API Credentials."""
    with pytest.raises(serpapi.HTTPError) as exc_info:
        invalid_key_client.account()
        
    assert exc_info.value.response.status_code == 401


def test_account_with_credentials(client):
    """Ensure that account appears to be returning valid data if the API Key is correct."""
    account = client.account()
    assert account
    assert account.keys()
    assert isinstance(account, dict)


def test_search_with_missing_params(client):
    with pytest.raises(serpapi.HTTPError) as exc_info:
        client.search({ "q": "" })
        
    assert exc_info.value.status_code == 400
    assert "Missing query `q` parameter" in exc_info.value.error


def test_coffee_search(coffee_search):
    assert isinstance(coffee_search, serpapi.SerpResults)
    assert hasattr(coffee_search, "__getitem__")


def test_coffee_search_as_dict(coffee_search):
    d = coffee_search.as_dict()
    assert isinstance(d, dict)


def test_coffee_search_html(coffee_search_html):
    assert isinstance(coffee_search_html, str)
    assert not hasattr(coffee_search_html, "next_page_url")


def test_coffee_search_n_pages(coffee_search):
    page_count = 0
    max_pages = 3

    for page in coffee_search.yield_pages(max_pages=max_pages):
        if page_count == 0:
            assert 'start' not in page['search_parameters'], "The 'start' parameter should not be in the first page"
        
        page_count += 1

    assert page_count == max_pages


def test_coffee_search_next_page(coffee_search):
    next_page = coffee_search.next_page()

    assert isinstance(next_page, serpapi.SerpResults)
    assert coffee_search["search_metadata"]["id"] != next_page["search_metadata"]["id"]


def test_search_function_signature(coffee_params, client):
    s = client.search(coffee_params)
    assert s["search_metadata"]["id"]

    s = client.search(**coffee_params)
    assert s["search_metadata"]["id"]

    s = client.search(q='coffee')
    assert s["search_metadata"]["id"]



================================================
FILE: tests/test_timeout.py
================================================
import pytest
import requests
from serpapi import Client

def test_client_timeout_setting():
    """Test that timeout can be set on the client and is passed to the request."""
    client = Client(api_key="test_key", timeout=10)
    assert client.timeout == 10

def test_request_timeout_override(monkeypatch):
    """Test that timeout can be overridden in the search method."""
    client = Client(api_key="test_key", timeout=10)
    
    def mock_request(method, url, params, headers, timeout, **kwargs):
        assert timeout == 5
        # Return a mock response object
        mock_response = requests.Response()
        mock_response.status_code = 200
        mock_response._content = b'{"search_metadata": {"id": "123"}}'
        return mock_response

    monkeypatch.setattr(client.session, "request", mock_request)
    
    client.search(q="coffee", timeout=5)

def test_request_default_timeout(monkeypatch):
    """Test that the client's default timeout is used if none is provided in search."""
    client = Client(api_key="test_key", timeout=10)
    
    def mock_request(method, url, params, headers, timeout, **kwargs):
        assert timeout == 10
        mock_response = requests.Response()
        mock_response.status_code = 200
        mock_response._content = b'{"search_metadata": {"id": "123"}}'
        return mock_response

    monkeypatch.setattr(client.session, "request", mock_request)
    
    client.search(q="coffee")



================================================
FILE: .github/workflows/ci.yml
================================================
# This workflow will install Python dependencies, run tests and lint with a variety of Python versions
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-python-with-github-actions

name: serpapi-python

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10", "3.11", "3.12", "3.13"]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v5
      with:
        python-version: ${{ matrix.python-version }}


    - name: Install dependencies
      run: pip install -e .[test]

    - name: Test with pytest
      run: |
        if [ "${{ matrix.python-version }}" == "3.11" ]; then
          pytest
        else
          pytest -k "not example"
        fi
      env:
        API_KEY: ${{secrets.API_KEY}}


