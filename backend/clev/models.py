from django.db import models

# Create your models here.
class Frame(models.Model):
    key = models.TextField()  
    title = models.TextField()  
    content = models.TextField(blank=True) 
    route =  models.TextField(blank=True)  
    event =  models.TextField(blank=True) 
    webSiteId= models.IntegerField()
class WebSite(models.Model):
    title = models.TextField() 
class FrameElement(models.Model):
    key= models.TextField() 
    type= models.TextField() 
    frameId= models.IntegerField()
 
    
    