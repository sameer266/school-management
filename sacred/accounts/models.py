from django.db import models
from students.models import Students

# Create your models here.


class Fee(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)  # Link to the student
    amount = models.FloatField()  # The fee amount
    due_date = models.DateField()  # The due date for payment
    paid = models.BooleanField(default=False)  # Whether the fee has been paid
    payment_date = models.DateField(null=True, blank=True)  # Date when payment was made
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Fee for {self.student.name} - {self.amount} due on {self.due_date}"


class Bill(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)  # The student to whom the bill is generated
    fee_id = models.ForeignKey(Fee, on_delete=models.CASCADE)  # Reference to the fee record
    amount = models.FloatField()  # The total amount of the bill
    due_date = models.DateField()  # The due date for payment
    paid = models.BooleanField(default=False)  # Whether the bill has been paid
    payment_date = models.DateField(null=True, blank=True)  # Date when the bill was paid, if applicable
    bill_generated_at = models.DateTimeField(auto_now_add=True)  # When the bill was generated
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the bill was created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp for last modification

    def __str__(self):
        return f"Bill for {self.student.name} - {self.amount} due on {self.due_date}"
