from django.shortcuts import render
from rest_framework import viewsets
from .models import Blog
from .serializers import BlogSerializer
from .models import Comment
from .serializers import CommentSerializer
from rest_framework import permissions # Already imported, good!


# Create your views here.
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # <-- ADD THIS LINE

    # Optional: If you want to automatically set the author of the blog to the logged-in user
    def perform_create(self, serializer):
        # Ensure the user is authenticated before saving
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user) # Assuming your Blog model has a 'user' ForeignKey
        else:
            # This case should ideally be caught by permission_classes,
            # but it's a good safeguard or for custom error messages.
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Authentication required to create a blog post.")


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.none() # Add this line ✅
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Already there, good!

    def get_queryset(self):
        blog_id = self.request.query_params.get('blog')
        if blog_id:
            return Comment.objects.filter(blog_id=blog_id).order_by('-id')
        return Comment.objects.all().order_by('-id')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)