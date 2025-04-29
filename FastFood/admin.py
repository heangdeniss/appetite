# Register your models here.
from django.utils.timezone import localtime
from django.utils.html import format_html
from django.contrib import admin
from .models import Order
import json

class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'customer_name', 
        'customer_email', 
        'customer_phone', 
        'total_price', 
        'formatted_order_details', 
        'customer_location',  # Added customer location here
        'submitted_at_local'
    )
    
    def formatted_order_details(self, obj):
        try:
            order_details = json.loads(obj.order_details)
            html = "<ul>"
            for item in order_details:
                html += f"<li>{item['quantity']}x {item['name']} - ${item['price']} each (Total: ${item['total']})</li>"
            html += "</ul>"
            return format_html(html)
        except Exception:
            return "Invalid order details format"
    
    formatted_order_details.short_description = "Order Details (Formatted)"
    
    def submitted_at_local(self, obj):
        # Format the date in local timezone
        local_datetime = localtime(obj.submitted_at)
        return local_datetime.strftime('%Y-%m-%d %H:%M:%S')
    
    submitted_at_local.short_description = "Submitted At (Local Time)" 

admin.site.register(Order, OrderAdmin)


# contact message direct to database 

from .models import ContactMessage

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'message', 'submitted_at')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('submitted_at',)

admin.site.register(ContactMessage, ContactMessageAdmin)