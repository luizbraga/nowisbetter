from .base import *  # noqa


WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds/',
        'STATS_FILE': str(
            BASE_DIR.parent.joinpath('webpack/webpack-stats.prod.json'))
    }
}


# Use Whitenoise to serve static files
# ------------------------------------
# https://whitenoise.readthedocs.io/

MIDDLEWARE = DJANGO_SECURITY_MIDDLEWARE + ['whitenoise.middleware.WhiteNoiseMiddleware'] + DJANGO_MIDDLEWARE  # noqa

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Use Gunicorn as WSGI HTTP server
# ------------------------------------------------------------------------------
# http://gunicorn.org/

INSTALLED_APPS += ('gunicorn', )
