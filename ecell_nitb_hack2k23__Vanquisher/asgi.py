"""
ASGI config for ecell_nitb_hack2k23__Vanquisher project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecell_nitb_hack2k23__Vanquisher.settings')

application = get_asgi_application()
