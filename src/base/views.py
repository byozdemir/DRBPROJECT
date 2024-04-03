from django.shortcuts import render
from base import settings
def index(request,path=""):
    if settings.DEBUG:
        return render(request,"frontend_dev/index.html")
    else:
        return render(request,"frontend/index.html")