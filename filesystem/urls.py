from django.urls import path
from . import views
from resource.views import resource


urlpatterns = [
    path("folder/",views.explorer,name="home"),
    path("folder/<path:dir>/",views.explorer,name="explorer"),

    path('newfolder/',views.newfolder,name="newfolder"),
    path('editfile/<path:dir>/',views.editfile,name="editfile"),
    path('uploadfile/',views.uploadfile,name="uploadfile"),
    path('delete/',views.deletefile,name="delete"),
    path('rename/',views.renameitem,name='rename'),
    path('filepreview/<path:dir>/',views.filepreview,name='filepreview'),
    path('',resource,name="resource")
    
]