from django.urls import path
from . import views


urlpatterns = [
    path("folder/",views.explorer,name="home"),
    path("folder/<path:dir>/",views.explorer,name="explorer"),

    path('newfolder/',views.newfolder,name="newfolder"),
    path('editfile/<path:dir>',views.editfile,name="editfile"),
    path('uploadfile/',views.uploadfile,name="uploadfile"),
    path('delete/',views.deletefile,name="delete"),
    path('rename/',views.renameitem,name='rename'),
    
]