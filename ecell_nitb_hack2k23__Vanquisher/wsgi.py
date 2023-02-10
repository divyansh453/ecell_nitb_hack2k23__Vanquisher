"""
WSGI config for ecell_nitb_hack2k23__Vanquisher project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecell_nitb_hack2k23__Vanquisher.settings')

application = get_wsgi_application()
