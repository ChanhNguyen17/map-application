from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token


class UserLogin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            is_staff = user.is_staff
            return Response({'token': token.key, 'user_id': user.id, 'is_staff': is_staff}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserRegistration(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.create_user(username, password=password)
            user.save()
            # Authenticate and log in the newly registered user
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                token, _ = Token.objects.get_or_create(user=user)
                is_staff = user.is_staff
                return Response({'token': token.key, 'user_id': user.id, 'is_staff': is_staff}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
