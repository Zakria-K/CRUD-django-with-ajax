from django.urls import path
# from api.views import servieces_views,services_details, servicesApiView,serviceDetail, genericAPIView
from api.views import genericAPIView

urlpatterns = [
    # path('services/',  servieces_views),
    # path('detail/<int:pk>/', services_details)
    # path('services/',  servicesApiView.as_view()),
    # path('detail/<int:id>/', serviceDetail.as_view()),
    path('generic/services/',  genericAPIView.as_view()),
    path('generic/services/<int:id>/', genericAPIView.as_view()),

]
