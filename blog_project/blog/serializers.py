# serializers.py
from rest_framework import serializers
from .models import Blog
from .models import Comment
# from django.contrib.auth.models import User # Not strictly needed here if only Blog/Comment models are used

class BlogSerializer(serializers.ModelSerializer):
    # This line tells the serializer to include the 'username' of the associated user
    # when serializing (sending data OUT), but it doesn't expect it for deserialization (receiving data IN).
    user = serializers.ReadOnlyField(source='user.username') # <--- ADD THIS LINE

    class Meta:
        model = Blog
        # Instead of '__all__', explicitly list fields and mark 'user' as read_only.
        # OR, keep '__all__' but add read_only_fields.
        fields = ['id', 'title', 'content', 'created_at', 'user'] # <--- ENSURE 'user' IS IN FIELDS
        read_only_fields = ['user'] # <--- ADD THIS LINE: This is the key!

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'blog', 'user', 'content', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']