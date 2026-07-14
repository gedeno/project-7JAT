from rest_framework.test import APITestCase
from django.urls import reverse

from apps.accounts.models import User
from apps.jobs.models import Job


class JobViewTests(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')
		self.url = '/jobs/job/'
		self.payload = {
			'title': 'Developer',
			'description': 'Build things',
			'company': 'ACME',
			'salary': '100k',
			'Employment_type': 'Full-time',
			'job_type': 'Remote',
			'location': 'Remote',
			'deadline': '2026-12-31'
		}

	def test_create_job_unauthenticated(self):
		response = self.client.post(self.url, self.payload, format='json')
		self.assertEqual(response.status_code, 401)

	def test_create_job_authenticated(self):
		self.client.force_authenticate(user=self.user)
		response = self.client.post(self.url, self.payload, format='json')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data, {'work': 'done'})
		self.assertEqual(Job.objects.count(), 1)
		job = Job.objects.first()
		self.assertEqual(job.poster, self.user)
		self.assertEqual(job.title, self.payload['title'])
