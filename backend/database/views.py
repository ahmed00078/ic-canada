from django.shortcuts import get_object_or_404
from rest_framework import generics,status
from .models import  Category,  Table, Field, Data
from .serializers import  CategorySerializer,TableSerializer, FieldSerializer,DataSerializer
from rest_framework.response import Response
import logging
from rest_framework.views import APIView
from rest_framework import viewsets

logger = logging.getLogger(__name__)

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.prefetch_related('tables')

class TableListCreateView(generics.ListCreateAPIView):
    serializer_class = TableSerializer

    def get_queryset(self):
        queryset = Table.objects.all()
        category_id = self.request.query_params.get('categoryId')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset

class TableDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    
class FieldListCreateView(generics.ListCreateAPIView):  
    serializer_class = FieldSerializer

    def get_queryset(self):

        queryset = Field.objects.all()
        table_id = self.request.query_params.get('tableId', None)
        if table_id is not None:
            queryset = queryset.filter(table__id=table_id)
        return queryset
    
class FieldDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer
     
class DataListCreateAPIView(generics.ListCreateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        table_id = self.request.query_params.get('tableId')
        
        if table_id:
            queryset = queryset.filter(table_id=table_id)
        return queryset
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        logger.debug(f"Request data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class DataRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    
    def put(self, request, *args, **kwargs):
        partial = True  # Always allow partial updates in PUT
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            logger.error("Serializer errors: %s", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_update(serializer)
        return Response(serializer.data)
