from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the request user is the owner of the marker or an admin user
        return obj.user == request.user or request.user.is_staff
