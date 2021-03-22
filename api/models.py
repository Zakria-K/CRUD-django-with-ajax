from django.db import models
from datetime import datetime
from django.contrib.auth.models import User



class Service(models.Model):
    by = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=10000)
    image = models.FileField(upload_to = 'api/', blank=True)
    is_active = models.BooleanField(default=True)
    update_date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']
