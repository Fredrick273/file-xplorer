from django.shortcuts import render

# Create your views here.
def resource(request):
    return render(request,'resource/resources.html')

def terminal(request):
    return render(request,'resource/terminal.html')
