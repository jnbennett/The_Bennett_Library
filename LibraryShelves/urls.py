from django.urls import path, include 
from rest_framework import routers 
from django.urls import reverse_lazy
from django.views.generic import TemplateView
from . import views

app_name = 'LibraryShelves'

router = routers.DefaultRouter()
router.register(r'book', views.BookViewSet, basename='book')
router.register(r'author', views.AuthorViewSet, basename='author')
router.register(r'translator', views.TranslatorViewSet, basename='translator')
router.register(r'genre', views.GenreViewSet, basename='genre')
router.register(r'editor', views.EditorViewSet, basename='editor')
router.register(r'bookstatus', views.BookStatusViewSet, basename='bookstatus')

urlpatterns = [
	path('', views.HomePageView.as_view(), name='home'),
	path('about/', views.AboutPageView.as_view(), name='about'),
	path('browse/', views.BrowsePageView.as_view(), name='browse'),
	path('title/', views.TitlePageView.as_view(), name='title'),
	path('resources/', views.ResourcePageView.as_view(), name='resources'),
	path('api/', include(router.urls)),
]