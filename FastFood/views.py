from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def foodmenu(request):
    return render(request, 'foodmenu.html')

def burger(request):
    return render(request, 'burger.html')

def pizza(request):
    return render(request, 'pizza.html')

def burrito(request):
    return render(request, 'burrito.html')

def drink(request):
    return render(request, 'drink.html')

def icecream(request):
    return render(request, 'icecream.html')

def wine(request):
    return render(request, 'wine.html')

def order(request):
    return render(request, 'order.html')


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Order  

@csrf_exempt
def submit_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Extract customer and order details
            customer_name = data.get("name")
            customer_email = data.get("email")
            customer_phone = data.get("phone")
            customer_location = data.get("location")
            order_details = data.get("orderDetails")
            total_price = data.get("totalPrice")

            if not all([customer_name, customer_email, customer_phone, customer_location]):
                return JsonResponse({"success": False, "message": "Incomplete customer details."}, status=400)

            if not order_details:
                return JsonResponse({"success": False, "message": "No items selected."}, status=400)

            # Save order to the database
            Order.objects.create(
                customer_name=customer_name,
                customer_email=customer_email,
                customer_phone=customer_phone,
                customer_location=customer_location,
                order_details=json.dumps(order_details),
                total_price=total_price,
            )

            return JsonResponse({"success": True, "message": "Order submitted successfully."})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)
    return JsonResponse({"success": False, "message": "Invalid request method."}, status=400)

# contact send to  database

from django.http import JsonResponse
from django.shortcuts import render
from .models import ContactMessage
import json

def contact(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            phone = data.get("phone")
            message = data.get("message")

            # Save the message to the database
            ContactMessage.objects.create(
                name=name,
                email=email,
                phone=phone,
                message=message
            )

            return JsonResponse({"success": True, "message": "Message saved successfully!"})
        except Exception as e:
            return JsonResponse({"success": False, "message": f"Error: {str(e)}"})

    return render(request, 'contact.html')

