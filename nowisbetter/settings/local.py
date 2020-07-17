from .base import *  # noqa


WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds-dev/',
        'STATS_FILE': str(
            BASE_DIR.parent.joinpath('webpack/webpack-stats.dev.json'))
    }
}
