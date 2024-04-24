from django.contrib import admin
from django.urls import path
from .views import (
    UserRegistrationView, 
    UserLoginView, 
    UserListView, 
    PostCreationView, 
    PostView, 
    TokenCheckView, 
    SearchView, 
    UserPostView
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", UserLoginView.as_view()),
    path("register/", UserRegistrationView.as_view()),
    path("user/", UserListView.as_view(), name="userlist"),
    path("user/<int:pk>/", UserListView.as_view()),
    path("create_post/", PostCreationView.as_view()),
    path("post/", PostView.as_view()),
    path("user_post/<int:pk>", UserPostView.as_view()),
    path("token_check/", TokenCheckView.as_view()),
    path("search/", SearchView.as_view())
]
