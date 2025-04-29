from django.db import models

class Order(models.Model):
    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=15)
    customer_location = models.CharField(max_length=255)
    order_details = models.JSONField()  # Stores item, price, and quantity
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.customer_name} - {self.submitted_at.strftime('%Y-%m-%d %H:%M:%S')}"


from django.utils.timezone import now

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()
    submitted_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"