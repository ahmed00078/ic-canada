from django.urls import path
from .views import (
    CategoryDetail, CategoryListCreate , DataListCreateAPIView, DataRetrieveUpdateDestroyAPIView, TableListCreateView,TableDetailView,FieldListCreateView,FieldDetailView
)

urlpatterns = [
    path('categories/', CategoryListCreate.as_view()),
    path('categories/<int:pk>/', CategoryDetail.as_view()),
    path('tables/', TableListCreateView.as_view()),
    path('tables/<int:pk>', TableDetailView.as_view()),
    path('fields/', FieldListCreateView.as_view()),
    path('fields/<int:pk>/', FieldDetailView.as_view()),
    path('data/', DataListCreateAPIView.as_view()),
    path('data/<int:pk>/', DataRetrieveUpdateDestroyAPIView.as_view()),
 
]