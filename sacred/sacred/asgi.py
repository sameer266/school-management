"""
ASGI config for sacred project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sacred.settings')

django_asgi_app = get_asgi_application()

from chat.routing import websocket_urlpatterns
from channels.routing import ProtocolTypeRouter, URLRouter



application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket":URLRouter(websocket_urlpatterns)
        
    
})