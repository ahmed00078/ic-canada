from django.urls import path

from .views import FrameElementView, FrameView,  WebSiteView

urlpatterns = [

    
    path('frame/byid/<str:key>/', FrameView.getById, name='frame'),
    path('frame/create', FrameView.create, name='frame'),
    path('frame/', FrameView.getAll, name='frame'),
    path('frame/update/<str:frame_id>', FrameView.update, name='frame'),
    path('frame/bywebsite/<str:key>', FrameView.getByWebSite, name='frame'),
    path('frame/delete/<str:frame_id>', FrameView.delete, name='frame'),
     
     
    path('website/byid/<str:key>/', WebSiteView.getById, name='website'),
    path('website/create', WebSiteView.create, name='website'),
    path('website/', WebSiteView.getAll, name='website'),
    path('website/update/<str:website_id>', WebSiteView.update, name='website'),
    path('website/delete/<str:website_id>', WebSiteView.delete, name='website'),
    
    
     
 
    path('element/create', FrameElementView.create, name='element'),
    path('element/', FrameElementView.getAll, name='element'),
    path('element/update/<str:frame_id>', FrameElementView.update, name='element'),
    path('element/byframe/<str:key>', FrameElementView.getByFrame, name='element'),
    path('element/delete/<str:frameElement_id>', FrameElementView.delete, name='element'),
     
     
     
]