from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from rest_framework import viewsets
#from rest_framework.pagination import PageNumberPagination
from .models import Book, Author, Translator, BookStatus, Genre, Editor 
from .serializers import BookSerializer, AuthorSerializer, TranslatorSerializer, BookStatusSerializer, GenreSerializer, EditorSerializer 

class BookViewSet(viewsets.ModelViewSet):
	"""
	API endpoint for books
	"""
	queryset = Book.objects.all().order_by('title')
	serializer_class = BookSerializer


class AuthorViewSet(viewsets.ModelViewSet):
	"""
	API endpoint for Authors
	"""
	queryset = Author.objects.all().order_by('last_name')
	serializer_class = AuthorSerializer

class TranslatorViewSet(viewsets.ModelViewSet):
	"""
	API endpoint for Translators
	"""
	queryset = Translator.objects.all().order_by('last_name')
	serializer_class = TranslatorSerializer

class GenreViewSet(viewsets.ModelViewSet):
	"""
	API endpoint for Genres
	"""
	queryset = Genre.objects.all()
	serializer_class = GenreSerializer
#	pagination_class = PaginationResults 

#class PaginationResults(PageNumberPagination):
#	pape_size = 50
#	page_size_query_param = 'page_size'
#	max_page_size = 100

class EditorViewSet(viewsets.ModelViewSet):
	"""
	API endpoint for Editors

	"""
	queryset = Editor.objects.all()
	serializer_class = EditorSerializer


class BookStatusViewSet(viewsets.ModelViewSet):
	"""
	API endpoint for a Book's Status
	"""
	queryset = BookStatus.objects.all()
	serializer_class = BookStatusSerializer

class HomePageView(TemplateView):
	template_name = 'LibraryShelves/home.html'

class AboutPageView(TemplateView):
	template_name = 'LibraryShelves/about.html'

class BrowsePageView(TemplateView):
	template_name = 'LibraryShelves/browse.html'

class TitlePageView(TemplateView):
	template_name = 'LibraryShelves/title.html'

class ResourcePageView(TemplateView):
	template_name = 'LibraryShelves/resources.html'





