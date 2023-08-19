from django import forms


class newFolderForm(forms.Form):
    foldername = forms.CharField(max_length=100)
    directory = forms.CharField(max_length=2000,required=False)

class uploadfileform(forms.Form):
    file = forms.FileField()
    directory = forms.CharField(max_length=2000,required=False)
    
class deletefileform(forms.Form):
    file = forms.CharField(max_length=100)
    directory = forms.CharField(max_length=2000,required=False)


class renamefileform(forms.Form):
    name = forms.CharField(max_length=100)
    file = forms.CharField(max_length=100)
    directory = forms.CharField(max_length=2000,required=False)