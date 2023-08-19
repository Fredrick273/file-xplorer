from django.shortcuts import render,HttpResponse,redirect,resolve_url
import os
from django.conf import settings
from .forms import newFolderForm,uploadfileform,deletefileform
from django.urls import reverse


# Create your views here.
def explorer(request,dir=""):
    if os.path.exists(os.path.join(settings.EXTERNAL_DIR,dir)):
        path_folders = dir.split("/")
        if os.path.isfile(os.path.join(settings.EXTERNAL_DIR,dir)):
            filedir = os.path.join(settings.EXTERNAL_DIR,dir)
            try:
                with open(filedir,"r") as f:
                    content = ""
                    for l in f:
                        content += l
                    
                root = "/".join(path_folders[:-1])
                
                path = os.path.join(settings.EXTERNAL_DIR,root)
                folders = [folder for folder in os.listdir(path) if os.path.isdir(os.path.join(path,folder))]
                files = [file for file in os.listdir(path) if os.path.isfile(os.path.join(path,file))]

                if len(path_folders)>1:
                    folder_name = path_folders[-2]
                else:
                    folder_name = "root"

                return render(request,'filesystem/editfile.html',context={"content":content,"dirs":folders,"files":files,"folder":folder_name,"addr":dir})
                
            except:
                
                return HttpResponse(filedir)
                

        else:
            path = os.path.join(settings.EXTERNAL_DIR,dir)
            content = os.listdir(path)
            folders = [folder for folder in os.listdir(path) if os.path.isdir(os.path.join(path,folder))]
            files = [file for file in os.listdir(path) if os.path.isfile(os.path.join(path,file))]

            # staticPath = settings.STATICFILES_DIRS[0]
            # formats = [x.split(".")[0] for x in os.listdir(staticPath) if os.path.isfile(os.path.join(staticPath,x))]

            return render(request,'filesystem/file.html',context={"dirs":folders,"files":files,"addr":dir,"form":newFolderForm,"uploadfileform":uploadfileform,"deletefileform":deletefileform})
    else:
        
        content = "Invalid dir"
    return HttpResponse(str(content))


def newfolder(request):
    if request.method == "POST":
        
        form = newFolderForm(request.POST)
        if form.is_valid():
            exisistingdir = form.cleaned_data["directory"]
            name = form.cleaned_data["foldername"]

            directory_path = os.path.join(settings.EXTERNAL_DIR, exisistingdir)

            if os.path.exists(directory_path):
                
                if "." not in name and name not in os.listdir(directory_path):
                    
                    os.mkdir(os.path.join(directory_path, name))
                    if exisistingdir:
                        explorer_url = reverse('explorer', kwargs={'dir': exisistingdir})
                        return redirect(explorer_url)
                else:
                    if exisistingdir:
                        explorer_url = reverse('explorer', kwargs={'dir': exisistingdir})
                        return redirect(explorer_url)

    return redirect((resolve_url("home")))


def editfile(request,dir):
    if request.method == "POST":
        content = request.POST.get("content")
        file_path = os.path.join(settings.EXTERNAL_DIR,dir)
        if os.path.exists(file_path):
            with open(file_path, "wb") as f:
                content = content.encode('utf-8')  # Encode content as bytes
                f.write(content)
    if dir:          
        explorer_url = reverse('explorer', kwargs={'dir': dir})
        return redirect(explorer_url)
    return redirect((resolve_url("home")))
    

def uploadfile(request):
    if request.method == 'POST':
        form = uploadfileform(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = form.cleaned_data['file']
            directory = form.cleaned_data['directory']
            path = os.path.join(settings.EXTERNAL_DIR,directory)
            destination = os.path.join(path, uploaded_file.name)
            with open(destination, 'wb') as destination_file:
                for chunk in uploaded_file.chunks():
                    destination_file.write(chunk)

    if directory:
        explorer_url = reverse('explorer', kwargs={'dir': directory})
        return redirect(explorer_url)
    return redirect((resolve_url("home")))



def deletefile(request):
    if request.method == "POST":
        form = deletefileform(request.POST)
        if form.is_valid():
            file_name = form.cleaned_data["file"]
            directory = form.cleaned_data["directory"]
            path = os.path.join(settings.EXTERNAL_DIR,directory,file_name)
            if os.path.exists(path):
                if os.path.isdir(path):
                    os.rmdir(path)
                else:
                    os.remove(path)
            
            
    if directory:
        explorer_url = reverse('explorer', kwargs={'dir': directory})
        return redirect(explorer_url)
    return redirect((resolve_url("home")))
