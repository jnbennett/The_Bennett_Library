from django.db import models
from django.urls import reverse
import PIL
import uuid

class Translator(models.Model):
	first_name = models.CharField(max_length=25, blank=True)
	last_name = models.CharField(max_length=25, blank=True)
	middle_name = models.CharField(max_length=25, blank=True)
	published_name = models.CharField(max_length=25, blank=True)

	def __str__(self):
		if self.middle_name == '':
			return f'{self.last_name}, {self.first_name}'
		else:
			return f'{self.last_name}, {self.first_name} {self.middle_name}'

class Editor(models.Model):
	first_name = models.CharField(max_length=25, blank=True)
	last_name = models.CharField(max_length=25, blank=True)
	middle_name = models.CharField(max_length=25, blank=True)
	published_name = models.CharField(max_length=25, blank=True)
	def __str__(self):
		if self.middle_name == '':
			return f'{self.last_name}, {self.first_name}'
		else:
			return f'{self.last_name}, {self.first_name} {self.middle_name}'

class Author(models.Model):
	first_name = models.CharField(max_length=25, blank=True)
	last_name = models.CharField(max_length=25, blank=True)
	middle_name = models.CharField(max_length=25, blank=True)
	initials = models.CharField(max_length=10, blank=True)
	published_name =  models.CharField(max_length=50, blank=True)
	date_of_birth = models.DateField(null=True, blank=True)
	date_of_death = models.DateField('Died', null = True, blank=True)

	class Meta:
		ordering = ['last_name', 'first_name']

	'''def get_absolute_url(self):
		"""Returns url to particular author instance"""
		return reverse('author-detail', args=[str(self.id)])
	'''
		

	def __str__(self):
		if self.initials != '':
			return f'{self.last_name}, {self.initials}'
		if self.middle_name != '':
			return f'{self.last_name}, {self.first_name} {self.middle_name}'
		if self.first_name != '' and self.last_name != '':
			return f'{self.last_name}, {self.first_name}'
		if self.first_name != '':
			return f'{self.first_name}'
		else:
			return 'anonymous'

class Genre(models.Model):
	category = models.CharField(max_length=20)

	def __str__(self):
		return self.category

class Book(models.Model):
	"""Model representing a book in general, not a specific copy of a book"""
	title = models.CharField(max_length=200)
	subtitle = models.CharField(max_length=200, blank=True)
	author = models.ForeignKey(Author, related_name='book', on_delete=models.CASCADE, blank=True, null=True)
	summary = models.TextField(max_length=1000, help_text='Enter a brief description', blank=True)
	isbn = models.CharField('ISBN', max_length=13)
	pages = models.CharField('Pages', max_length=10, blank=True)
	translator = models.ManyToManyField(Translator, related_name='book', blank=True)
	language = models.CharField(max_length=25)
	genre = models.ManyToManyField(Genre, related_name='book')
	editor = models.ManyToManyField(Editor, related_name='book', blank=True)
	cover = models.FileField(upload_to='book_covers/', blank=True)
	publisher = models.CharField(max_length=50)
	pub_year =  models.CharField(max_length=10)

	FORMAT_CHOICES = (
			('PB', 'Paperback'),
			('HC', 'Hardcover'),
		)

	book_format = models.CharField(max_length=2, choices = FORMAT_CHOICES, default='PB', blank=True)

	LOAN_STATUS = (
		('m', 'Maintenance'),
		('o', 'On loan'),
		('a', 'Available'),
		('r', 'Reserved'),
	)

	status = models.CharField(
		max_length=1,
		choices=LOAN_STATUS,
		blank=True,
		default='m',
		help_text='Book availability',
	)

	def __str__(self):
		return self.title
'''
	def get_absolute_url(self):
		"""Returns the url to access a detail record of book"""
		return reverse('book-detail', args=[str(self.id)])
'''

class BookStatus(models.Model):
	"""Model representing a particular copy of a book"""
	id = models.UUIDField(primary_key=True, default=uuid.uuid4)
	book = models.ForeignKey('Book', on_delete=models.SET_NULL, null=True)
	imprint = models.CharField(max_length=200) #specific release of book
	due_back = models.DateField(null=True, blank=True)

	LOAN_STATUS = (
		('m', 'Maintenance'),
		('o', 'On loan'),
		('a', 'Available'),
		('r', 'Reserved'),
	)

	status = models.CharField(
		max_length=1,
		choices=LOAN_STATUS,
		blank=True,
		default='m',
		help_text='Book availability',
	)

	class Meta:
		ordering = ['due_back']

	def __str__(self):
		return f'{self.id} ({self.book.title})'





