from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def resource(request):
    return render(request,'resource/resources.html')

@login_required
def terminal(request):
    return render(request,'resource/terminal.html')
