from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):
    """is product owner or admin"""

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and request.user.is_authenticated and
            (obj.owner == request.user or request.user.is_staff)
        )


class IsOwnerFromSubModelOrAdmin(BasePermission):
    """is product owner from sub model or admin """
    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and request.user.is_authenticated and
            (obj.product.owner == request.user or request.user.is_staff)
        )
