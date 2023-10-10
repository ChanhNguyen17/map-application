from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class MarkerAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.marker_data = {'lat': 123.456, 'lng': 789.123, 'label': 'Test Marker'}

    def test_create_marker(self):
        response = self.client.post(reverse('marker-list'), self.marker_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_markers(self):
        response = self.client.get(reverse('marker-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_marker(self):
        marker = self.client.post(reverse('marker-list'), self.marker_data, format='json')
        response = self.client.get(reverse('marker-detail', args=[marker.data['id']]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_marker(self):
        marker = self.client.post(reverse('marker-list'), self.marker_data, format='json')
        updated_data = {'lat': 987.654, 'lng': 321.123, 'label': 'Updated Marker'}
        response = self.client.patch(reverse('marker-detail', args=[marker.data['id']]), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_marker(self):
        marker = self.client.post(reverse('marker-list'), self.marker_data, format='json')
        response = self.client.delete(reverse('marker-detail', args=[marker.data['id']]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
