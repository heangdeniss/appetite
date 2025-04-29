from django.urls import path
from FastFood import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('Menu/', views.foodmenu, name='foodmenu'),
    path('Menu/burger/', views.burger, name='burger'),
    path('Menu/pizza/', views.pizza, name='pizza'),
    path('Menu/burrito/', views.burrito, name='burrito'),
    path('Menu/drink/', views.drink, name='drink'),
    path('Menu/icecream/', views.icecream, name='icecream'),
    path('Menu/wine/', views.wine, name='wine'),
    path('order/', views.order, name='order'),
    path('submit_order/', views.submit_order, name='submit_order'),
    path('contact/', views.contact, name='contact'),
    
]