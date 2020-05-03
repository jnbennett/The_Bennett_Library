from django.contrib.auth.models import User, Group 
from rest_framework import serializers 
from LibraryShelves.models import Book, Translator, Author, BookStatus, Genre, Editor


class GenreSerializer(serializers.ModelSerializer):
	book = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='LibraryShelves:book-detail')

	class Meta:
		model = Genre
		fields = ("category", 'book')

class EditorSerializer(serializers.ModelSerializer):
	#book = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='LibraryShelves:book-detail')

	class Meta:
		model = Editor
		fields = ('pk', 'first_name', 'middle_name', 'last_name', 'published_name')

class AuthorSerializer(serializers.ModelSerializer):
	book = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='LibraryShelves:book-detail')

	class Meta:
		model = Author 
		fields = ('pk', 'first_name', 'last_name', 'middle_name', 'initials', 'published_name', 'date_of_birth', 'date_of_death', 'book')
	
class TranslatorSerializer(serializers.ModelSerializer):
	# book = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='LibraryShelves:book-detail')
	
	class Meta:
		model = Translator 
		fields = ('pk', 'first_name', 'middle_name', 'last_name', 'published_name')

class BookSerializer(serializers.ModelSerializer):
	author = serializers.PrimaryKeyRelatedField(read_only=True)
	translator = TranslatorSerializer(read_only=True, many=True)
	genre = GenreSerializer(read_only=True, many=True)
	editor = EditorSerializer(read_only=True, many=True)
	
	def to_representation(self, instance):
		ret = super().to_representation(instance)
		ret['book_format'] = instance.get_book_format_display()
		return ret

	
	#author = serializers.HyperlinkedRelatedField(read_only=True, view_name='LibraryShelves:author-detail')
	#translator = serializers.HyperlinkedRelatedField(read_only=True, view_name='LibraryShelves:translator-detail')
	#editor = serializers.HyperlinkedRelatedField(read_only=True, view_name='LibraryShelves:editor-detail')
	#genre = serializers.HyperlinkedRelatedField(read_only=True, view_name='LibraryShelves:genre-detail')

	class Meta:
		model = Book 
		fields = ('pk', 'title', 'subtitle', 'author', 'summary', 'isbn', 'translator', 'genre', 
				'language', 'editor', 'publisher', 'pub_year', 'cover', 'pages', 'book_format', 'status')
		

class BookStatusSerializer(serializers.ModelSerializer):
	book = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='LibraryShelves:book-detail')

	class Meta:
		model = BookStatus
		fields = ('id', 'book','imprint', 'due_back', 'status')


