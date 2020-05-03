from django.contrib import admin
from .models import Book, Author, Translator, Genre, BookStatus, Editor
# Register your models here.

admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Genre)
admin.site.register(Translator)
admin.site.register(BookStatus)
admin.site.register(Editor)