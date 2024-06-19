

from rest_framework import serializers

from .models import Frame, FrameElement, WebSite


class FrameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Frame
        fields = '__all__'
class WebSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebSite
        fields = '__all__'
class FrameElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrameElement
        fields = '__all__'