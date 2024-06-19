import json

from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404, render
from flask import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Frame, FrameElement, WebSite
from django.views.decorators.csrf import csrf_exempt
from .serializers import FrameElementSerializer, FrameSerializer,  WebSiteSerializer
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

           
class FrameView(): 
    @csrf_exempt
    def getByWebSite(request, key):
        frames = get_list_or_404(Frame, webSiteId=key)
    
        # Serialize the data
        data = [{
            'title': frame.title,
            'content': frame.content,
            'route': frame.route,
            'event': frame.event,
            'webSiteId': frame.webSiteId,
            'key': frame.key
        } for frame in frames]

        return JsonResponse(data, safe=False)  
           
        
        
    @csrf_exempt
    def getById(request, key):
        frame = get_object_or_404(Frame, pk=key)
       
        return JsonResponse({
            'title':frame.title,
            'content':frame.content,
            'route':frame.route,
            'event':frame.event,
            'webSiteId':frame.webSiteId,
            'key':frame.key
           
        })
    
    @csrf_exempt
    def create( request):
        if request.method == 'POST':
            data = json.loads(request.body)
            print(data)
            serializer = FrameSerializer(data=data)
           
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            else :
                print(serializer.errors)
            return JsonResponse(serializer.errors, status=400)  
        
        
        
    @csrf_exempt
    def getAll(request):
        frame = Frame.objects.all()
        
        serializer = FrameSerializer(frame, many=True)
        return JsonResponse(serializer.data, safe=False)
    @csrf_exempt
    def update( request, frame_id):
        if request.method == 'PUT':
            try:
                frame = Frame.objects.get(pk=frame_id)
                data = json.loads(request.body)
                serializer = FrameSerializer(frame, data=data, partial=True)  # partial=True allows for partial updates
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse({'message': True}, status=200)
                else:
                    return JsonResponse(serializer.errors, status=400)
            except Frame.DoesNotExist:
                return JsonResponse({'error': 'Frame not found'}, status=404)
            
    @csrf_exempt
    def delete(request, frame_id):
        if request.method == 'DELETE':
            frame = get_object_or_404(Frame, pk=frame_id)
            frame.delete()
            return JsonResponse({'message': True}, status=204)
        
   
   
   
   
class WebSiteView(): 
    @csrf_exempt
    def getById(request, key):
        website = get_object_or_404(WebSite, pk=key)
       
        return JsonResponse({
            'title':website.title,
           
            
           
        })
    @csrf_exempt
    def create( request):
        if request.method == 'POST':
            data = json.loads(request.body)
            print(data)
            serializer = WebSiteSerializer(data=data)
           
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            else :
                print(serializer.errors)
            return JsonResponse(serializer.errors, status=400)  
    @csrf_exempt
    def getAll(request):
        website = WebSite.objects.all()
        
        serializer = WebSiteSerializer(website, many=True)
        return JsonResponse(serializer.data, safe=False)
    @csrf_exempt
    def update( request, website_id):
        if request.method == 'PUT':
            try:
                website = WebSite.objects.get(pk= website_id)
                data = json.loads(request.body)
                serializer = WebSiteSerializer(website, data=data, partial=True)  # partial=True allows for partial updates
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse({'message': True}, status=200)
                else:
                    return JsonResponse(serializer.errors, status=400)
            except WebSite.DoesNotExist:
                return JsonResponse({'error': 'website not found'}, status=404)
    @csrf_exempt
    def delete(request, website_id):
        if request.method == 'DELETE':
            website = get_object_or_404(WebSite, pk=website_id)
            website.delete()
            return JsonResponse({'message': True}, status=204)
        
  
   
class FrameElementView(): 
    @csrf_exempt
    def getByFrame(request, key):
        elements = get_list_or_404(FrameElement, frameId=key)
    
        # Serialize the data
        data = [{
            'id':element.id,
            'type': element.type,
            'frameId': element.frameId,
            'key': element.key
        } for element in elements]

        return JsonResponse(data, safe=False)  
    @csrf_exempt
    def create( request):
        if request.method == 'POST':
            data = json.loads(request.body)
            print(data)
            serializer = FrameElementSerializer(data=data)
           
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            else :
                print(serializer.errors)
            return JsonResponse(serializer.errors, status=400)  
    @csrf_exempt
    def getAll(request):
        frameElement = FrameElement.objects.all()
        
        serializer = FrameElementSerializer(frameElement, many=True)
        return JsonResponse(serializer.data, safe=False)
    @csrf_exempt
    def update( request, frameElement_id):
        if request.method == 'PUT':
            try:
                frameElement = FrameElement.objects.get(pk= frameElement_id)
                data = json.loads(request.body)
                serializer = FrameElementSerializer(frameElement, data=data, partial=True)  # partial=True allows for partial updates
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse({'message': True}, status=200)
                else:
                    return JsonResponse(serializer.errors, status=400)
            except FrameElement.DoesNotExist:
                return JsonResponse({'error': 'frameelemnt not found'}, status=404)
    @csrf_exempt
    def delete(request,  frameElement_id):
        if request.method == 'DELETE':
            frameElement = get_object_or_404(FrameElement, pk= frameElement_id)
            frameElement.delete()
            return JsonResponse({'message': True}, status=204)
        
   